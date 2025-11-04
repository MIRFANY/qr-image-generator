import express from 'express';
import qr from 'qr-image';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Basic request logger (helps debug requests from browser)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

// Serve static UI
app.use(express.static(path.join(__dirname, 'public')));

// Health check endpoint for quick verification
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// API endpoint that returns PNG QR image for a given URL query param
app.get('/api/generate', (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).json({ error: 'Missing `url` query parameter' });
  }

  try {
    res.setHeader('Content-Type', 'image/png');
    const img = qr.image(url, { type: 'png' });
    img.pipe(res);
  } catch (err) {
    console.error('QR generation error:', err);
    res.status(500).json({ error: 'Failed to generate QR image' });
  }
});

app.listen(PORT, () => {
  console.log(`QR UI server running at http://localhost:${PORT}`);
});
