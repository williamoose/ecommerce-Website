import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import listingsRoutes from "./routes/listings.js";
import usersRoutes from "./routes/users.js";
import cartRoutes from "./routes/cart.js";
import { fileURLToPath } from "url";
import { dirname } from 'path';

dotenv.config({ path: path.resolve('./backend/.env') });

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Frontend URL
const FRONTEND_URL = 'http://localhost:5173';

// ✅ CORS middleware
app.use(cors({
  origin: FRONTEND_URL, // exact frontend origin
  credentials: true,    // allow cookies/auth headers
}));

app.use(express.json());

// Serve uploads — also make sure CORS is applied
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/listings", listingsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/cart", cartRoutes);

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

export default app;