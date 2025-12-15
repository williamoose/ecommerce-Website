import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pkg from 'pg';
import path from 'path';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

dotenv.config({ path: path.resolve('./backend/.env') });
const { Pool } = pkg;

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Create a Postgres pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
});

// GET API endpoint
app.get('/api/listings', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, price, size, description FROM listings ORDER BY id DESC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('DB query error:', err)
    res.status(500).json({ error: 'Failed to fetch listings' });
  }
})

// POST API endpoint
app.post('/api/listings', async (req, res) => {
  const { 
    category,
    name,
    brand,
    condition,
    size,
    description,
    price
  } = req.body;
  
  try {
    const result = await pool.query(
      `INSERT INTO listings 
      (category, name, brand, condition, size, description, price)
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING *`,
      [category, name, brand, condition, size, description, price]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create listing'})
  }
});

// Sign Up
app.post('/api/signup', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query(
      `INSERT INTO users (first_name, last_name, email, password) 
        VALUES ($1, $2, $3, $4) 
        RETURNING id, first_name, last_name, email`,
      [firstName, lastName, email, hashedPassword]      
    ); 

    const user = result.rows[0];
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    res.json({ token });
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

    res.json({ token });
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

