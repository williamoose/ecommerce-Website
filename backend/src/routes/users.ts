import express from "express";
import bcrypt from "bcrypt";
import { pool } from "../db/pool.js";
import { authenticate } from "../middleware/authenticate.js";
import type { AuthenticatedRequest } from "../middleware/authenticate.js";
import { upload } from "../upload/multer.js";

const router = express.Router();

// UPDATE user profile picture
router.patch('/profile-photo', authenticate, upload.single('profilePhoto'), async (req: AuthenticatedRequest, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const id = req.user!.id;

  const profilePhoto_url = `/uploads/${req.file.filename}`; 

  try {
    const result = await pool.query(
      `UPDATE users SET image_url = $1 WHERE id = $2 RETURNING id, image_url`,
      [profilePhoto_url, id]
    );

    res.json({ message: 'Profile photo updated', user: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update profile photo' });
  }
});

// UPDATE user profile (username and email)
router.patch('/profile', authenticate, async (req: AuthenticatedRequest, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { username, email } = req.body;
  const id = req.user.id;

  if (!username || !email) {
    return res.status(400).json({ message: 'Username and email are required' });
  }

  try {
    const result = await pool.query(
      `UPDATE users SET username = $1, email = $2 WHERE id = $3 RETURNING id, username, email, first_name, last_name, image_url`,
      [username, email, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Profile updated successfully', user: result.rows[0] });
  } catch (err: any) {
    console.error('Error updating profile:', err);
    
    // Check for UNIQUE constraint violation on email
    if (err.code === '23505' && err.constraint === 'users_email_key') {
      return res.status(400).json({ message: 'Email already in use' });
    }
    
    // Check for UNIQUE constraint violation on username
    if (err.code === '23505' && err.constraint === 'users_username_key') {
      return res.status(400).json({ message: 'Username already in use' });
    }
    
    res.status(500).json({ message: 'Failed to update profile' });
  }
});

// CHANGE password
router.patch('/change-password', authenticate, async (req: AuthenticatedRequest, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { currentPassword, newPassword } = req.body;
  const id = req.user.id;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: 'Current and new passwords are required' });
  }

  try {
    // Get current password hash from database
    const userResult = await pool.query(
      `SELECT password FROM users WHERE id = $1`,
      [id]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
const storedPassword = userResult.rows[0].password;

    // Use bcrypt to compare passwords
    const match = await bcrypt.compare(currentPassword, storedPassword);

    if (!match) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update with new password
    const result = await pool.query(
      `UPDATE users SET password = $1 WHERE id = $2 RETURNING id`,
      [hashedNewPassword, id]
    );

    res.json({ message: 'Password changed successfully' });
  } catch (err: any) {
    console.error('Error changing password:', err);
    res.status(500).json({ message: 'Failed to change password' });
  }
});

export default router;