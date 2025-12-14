import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pkg from 'pg';
import path from 'path';

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
      (category, name, brand, condition, size, description, price, photos)
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

// Start server
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

