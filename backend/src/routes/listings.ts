import express from "express";
import { pool } from "../db/pool.js";
import { authenticate } from "../middleware/authenticate.js";
import type { AuthenticatedRequest } from "../middleware/authenticate.js";
import { upload } from "../upload/multer.js";

const router = express.Router();

// GET user listings
router.get('/mylistings', authenticate, async (req: AuthenticatedRequest, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const id = req.user.id;

  try {
    const result = await pool.query(
      'SELECT id, name, price, size, brand, description, image_url FROM listings WHERE user_id = $1 ORDER BY id DESC',
      [id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error('DB query error:', err)
    res.status(500).json({ error: 'Failed to fetch listings' });
  }
})

// GET listings by category
router.get('/category/:category', async (req, res) => {
  const { category } = req.params;

  try {
    const result = await pool.query(
      `SELECT 
          l.id,
          l.name,
          l.price,
          l.size,
          l.brand,
          l.condition,
          l.image_url,
          l.created_at,
          u.username,
          u.image_url AS profilephoto_url
       FROM listings l
       INNER JOIN users u ON l.user_id = u.id
       WHERE LOWER(l.category) = LOWER($1)
       ORDER BY l.created_at DESC`,
      [category]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch category listings' });
  }
});

// GET listings by name (search)
router.get('/search', async (req, res) => {
  const { q } = req.query; 

  if (!q || typeof q !== 'string') return res.status(400).json({ error: 'Missing query' });

  try {
    const result = await pool.query(
      `SELECT 
          l.id, l.name, l.brand, l.price, l.size, l.condition, l.image_url, l.created_at, 
          u.username, u.image_url AS profilephoto_url
       FROM listings l
       JOIN users u ON l.user_id = u.id
       WHERE LOWER(l.name) LIKE LOWER($1)
       ORDER BY l.created_at DESC`,
      [`%${q}%`] // partial match
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch listings' });
  }
});


// GET Discover listings
router.get('/discover', async (req, res) => {
  try {
    const result = await pool.query(
        `SELECT 
            l.id,
            l.name,
            l.brand,
            l.price,
            l.size,
            l.condition,
            l.image_url,
            l.created_at,
            u.username,
            u.image_url AS profilephoto_url
        FROM listings l
        INNER JOIN users u ON l.user_id = u.id
        ORDER BY RANDOM()`    
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch listings' });
  }
});

// GET NewArrivals listings
router.get('/new-arrivals', async (req, res) => {
  try {
    const result = await pool.query(
        `SELECT 
            l.id,
            l.name,
            l.brand,
            l.price,
            l.size,
            l.condition,
            l.image_url,
            l.created_at,
            u.username,
            u.image_url AS profilephoto_url
        FROM listings l
        INNER JOIN users u ON l.user_id = u.id
        ORDER BY l.created_at DESC`   
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch listings' });
  }
});

// POST user listing
router.post('/mylistings', authenticate, upload.array('images', 5), async (req: AuthenticatedRequest, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { 
    category,
    name,
    brand,
    condition,
    size,
    description,
    price
  } = req.body;
  
  const image_urls = (req.files as Express.Multer.File[]).map(file => `/uploads/${file.filename}`);

  try {
    const result = await pool.query(
      `INSERT INTO listings 
       (user_id, category, name, brand, condition, size, description, price, image_url)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
      [req.user.id, category, name, brand, condition, size, description, price, image_urls[0] || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create listing' });
  }
});

// GET liked listings for logged-in user
router.get('/liked', authenticate, async (req: AuthenticatedRequest, res) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });

  const id = req.user.id;

  try {
    const result = await pool.query(
      `SELECT 
         l.id,
         l.name,
         l.brand,
         l.price,
         l.size,
         l.condition,
         l.image_url,
         l.created_at,
         u.username,
         u.image_url AS profilephoto_url
       FROM listings l
       JOIN likes lk ON lk.listing_id = l.id
       JOIN users u ON l.user_id = u.id
       WHERE lk.user_id = $1
       ORDER BY lk.created_at DESC`,
      [id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch liked listings' });
  }
});

// POST like a listing
router.post('/:id/like', authenticate, async (req: AuthenticatedRequest, res) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });

  const id = req.user.id;
  const listingId = req.params.id;

  try {
    await pool.query(
      `INSERT INTO likes (user_id, listing_id) VALUES ($1, $2)
       ON CONFLICT DO NOTHING`,
      [id, listingId]
    );

    res.json({ message: 'Liked listing' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to like listing' });
  }
});

// DELETE unlike a listing
router.delete('/:id/like', authenticate, async (req: AuthenticatedRequest, res) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });

  const id = req.user.id;
  const listingId = req.params.id;

  try {
    await pool.query(
      `DELETE FROM likes WHERE user_id = $1 AND listing_id = $2`,
      [id, listingId]
    );

    res.json({ message: 'Unliked listing' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to unlike listing' });
  }
});

export default router;
