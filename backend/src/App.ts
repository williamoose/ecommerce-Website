import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import listingsRoutes from "./routes/listings.js";
import usersRoutes from "./routes/users.js";
import { fileURLToPath } from "url";
import { dirname } from 'path';

dotenv.config({ path: path.resolve('./backend/.env') });

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads'))); // serve uploaded images

app.use("/api/auth", authRoutes);
app.use("/api/listings", listingsRoutes);
app.use("/api/users", usersRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

