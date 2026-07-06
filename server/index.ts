import express from "express";
import cors from "cors";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// SQLite DB for storing prescription metadata
const db = new Database(path.join(__dirname, "prescriptions.db"));
db.exec(`
  CREATE TABLE IF NOT EXISTS prescriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    notes TEXT,
    file_url TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
  fileFilter: (_req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error("Only JPG, PNG, WEBP, or PDF files are allowed"));
  },
});

const app = express();

app.use(
  cors({
    origin: ["https://site.hbordent.infy.click", "http://localhost:5173", "http://localhost:3000"],
  })
);
app.use(express.json());

// Health check
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

// Upload prescription
app.post("/api/prescriptions", upload.single("file"), async (req, res) => {
  try {
    const { customer_name, phone, notes } = req.body;

    if (!customer_name || !phone) {
      return res.status(400).json({ error: "Name and phone are required" });
    }
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Upload to Cloudinary
    const uploadResult = await new Promise<any>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "prescriptions", resource_type: "auto" },
        (error, result) => (error ? reject(error) : resolve(result))
      );
      stream.end(req.file!.buffer);
    });

    const stmt = db.prepare(
      `INSERT INTO prescriptions (customer_name, phone, notes, file_url) VALUES (?, ?, ?, ?)`
    );
    const info = stmt.run(customer_name, phone, notes || "", uploadResult.secure_url);

    res.json({
      success: true,
      id: info.lastInsertRowid,
      file_url: uploadResult.secure_url,
    });
  } catch (err: any) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Upload failed", details: err.message });
  }
});

// Admin: list all prescriptions (simple key-based protection)
app.get("/api/admin/prescriptions", (req, res) => {
  const key = req.headers["x-admin-key"];
  if (key !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const rows = db.prepare(`SELECT * FROM prescriptions ORDER BY created_at DESC`).all();
  res.json(rows);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
