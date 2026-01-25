import express from "express";
import { pool } from "../db/pool.js";
import { authenticate } from "../middleware/authenticate.js";
import type { AuthenticatedRequest } from "../middleware/authenticate.js";

const router = express.Router();

// GET cart items for logged-in user
router.get("/", authenticate, async (req: AuthenticatedRequest, res) => {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });

    try {
        const result = await pool.query(
            `SELECT 
                ci.id AS cart_item_id,
                ci.quantity,
                l.id AS listing_id,
                l.name,
                l.brand,
                l.price,
                l.size,
                l.condition,
                l.image_url,
                l.created_at,
                u.username,
                u.image_url AS profilephoto_url
             FROM cart_items ci
             JOIN listings l ON ci.listing_id = l.id
             JOIN users u ON l.user_id = u.id
             WHERE ci.user_id = $1`,
            [req.user.id]
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch cart items" });
    }
});

// POST add to cart
router.post("/:listingId", authenticate, async (req: AuthenticatedRequest, res) => {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });
    const { listingId } = req.params;

    try {
        // upsert: add new or increment quantity if exists
        await pool.query(
            `INSERT INTO cart_items(user_id, listing_id, quantity)
             VALUES($1, $2, 1)
             ON CONFLICT(user_id, listing_id) 
             DO UPDATE SET quantity = cart_items.quantity + 1`,
            [req.user.id, listingId]
        );

        res.status(200).json({ message: "Added to cart" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to add to cart" });
    }
});

// DELETE remove from cart
router.delete("/:listingId", authenticate, async (req: AuthenticatedRequest, res) => {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });
    const { listingId } = req.params;

    try {
        await pool.query(
            `DELETE FROM cart_items WHERE user_id = $1 AND listing_id = $2`,
            [req.user.id, listingId]
        );
        res.status(200).json({ message: "Removed from cart" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to remove from cart" });
    }
});

export default router;
