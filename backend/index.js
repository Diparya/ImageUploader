import express from "express";
import cors from "cors";
import multer from "multer";
import pkg from 'pg';
const { Pool } = pkg;
const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ImageUploader',
    password: '3927',
    port: 5432,
  });

app.use('/uploads', express.static('uploads'));

// Configure multer for file uploads (storing locally)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + '-' + file.originalname);
    },
  });
  const upload = multer({ storage: storage });
  
  // Endpoint to handle image uploads
  app.post('/upload', upload.single('image'), async (req, res) => {
    const { filename, path } = req.file;
    const timestamp = new Date();
  
    try {
      // Insert metadata into PostgreSQL
      const query = 'INSERT INTO images (filename, filepath, upload_time) VALUES ($1, $2, $3)';
      await pool.query(query, [filename, path, timestamp]);
  
      res.status(200).send({ message: 'Image uploaded successfully!' });
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: 'Failed to upload image' });
    }
  });
  
  app.get('/images', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM images ORDER BY upload_time DESC');
      const normalizedImages = result.rows.map(image => ({
        ...image,
        filepath: image.filepath.replace(/\\/g, '/')  // Replace backslashes with forward slashes
      }));
  
      res.status(200).json(normalizedImages);
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: 'Failed to fetch images' });
    }
  });
  
  // Start the server
const PORT = 3000

app.listen(PORT,()=>{
    console.log(`Started on http://localhost:${PORT}`)
})