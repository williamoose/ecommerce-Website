import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../db/pool.js";

const router = express.Router();

// Sign Up
router.post('/signup', async (req, res) => {
  console.log('Signup request body:', req.body);
  const { firstName, lastName, username, email, password } = req.body;

  if (!firstName || !lastName || !username || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    /* const existing = await pool.query(
      'SELECT id FROM users WHERE username = $1 OR email = $2',
      [username, email]
    );
    if (existing.rows.length > 0) {
      return res.status(400).json({ message: 'Username or email already exists' });
    } */

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (first_name, last_name, username, email, password) 
        VALUES ($1, $2, $3, $4, $5) 
        RETURNING id, first_name, last_name, username, email`,
      [firstName, lastName, username, email, hashedPassword]      
    ); 

    const user = result.rows[0];
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    res.json({
      token,
      user: {
        id: user.id,
        firstName: user.first_name,   
        lastName: user.last_name,
        username: user.username,
        email: user.email,
      }
    });  
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: 'Failed to sign up user' });
  }
});

// Sign In
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  try {
    const result = await pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    res.json({
      token,
      user: {
        id: user.id,
        firstName: user.first_name,   
        lastName: user.last_name,
        username: user.username,
        email: user.email,
        image_url: user.image_url
      }
    });    
  } catch (err: any) {
    console.error(err);
    res.status(500).json(
      { message: 'Failed to sign in user'}
    )
  }
});

export default router;