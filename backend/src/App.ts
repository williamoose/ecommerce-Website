import express from 'express';
import type { Request, Response, NextFunction } from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import pkg from 'pg';
import path from 'path';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import multer from 'multer';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve('./backend/.env') });
const { Pool } = pkg;

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads'))); // serve uploaded images

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

interface AuthenticatedRequest extends Request {
  user?: { id: number };
}

export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const parts = authHeader.split(' ');
  
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ message: "Invalid token format" });
  }

  const token = parts[1];

  if (!token) {
    return res.status(401).json({ message: "Missing token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };
    (req as AuthenticatedRequest).user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Create a Postgres pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
});

// GET API endpoint
app.get('/api/listings', authenticate, async (req: AuthenticatedRequest, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const id = req.user.id;

  try {
    const result = await pool.query(
      'SELECT id, name, price, size, description, image_url FROM listings WHERE user_id = $1 ORDER BY id DESC',
      [id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error('DB query error:', err)
    res.status(500).json({ error: 'Failed to fetch listings' });
  }
})

app.get('/api/discover', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, price, size, condition, image_url FROM listings ORDER BY RANDOM()`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch listings' });
  }
});

// POST API endpoint
app.post('/api/listings', authenticate, upload.array('images', 5), async (req: AuthenticatedRequest, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const id = req.user!.id;

  const { 
    category,
    name,
    brand,
    condition,
    size,
    description,
    price
  } = req.body;
  
  const imageUrls = (req.files as Express.Multer.File[]).map(file => `/uploads/${file.filename}`);

  try {
    const result = await pool.query(
      `INSERT INTO listings 
       (user_id, category, name, brand, condition, size, description, price, image_url)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
      [req.user.id, category, name, brand, condition, size, description, price, imageUrls[0] || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create listing' });
  }
});

app.patch('/api/user/profile-photo', authenticate, upload.single('profilePhoto'), async (req: AuthenticatedRequest, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const id = req.user!.id;

  const profilePhotoUrl = `/uploads/${req.file.filename}`; 

  try {
    const result = await pool.query(
      `UPDATE users SET image_url = $1 WHERE id = $2 RETURNING id, image_url`,
      [profilePhotoUrl, id]
    );

    res.json({ message: 'Profile photo updated', user: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update profile photo' });
  }
});


// Sign Up
app.post('/api/signup', async (req, res) => {
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
app.post('/api/signin', async (req, res) => {
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

// Start server
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

