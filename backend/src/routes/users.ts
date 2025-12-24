import express from "express";
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

export default router;