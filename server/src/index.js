import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Database from 'better-sqlite3';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const DB_PATH = process.env.DB_PATH || 'data.db';
const DEFAULT_PROFILE = 'foot';
const OSRM_URL = process.env.OSRM_URL || `https://router.project-osrm.org/route/v1/${DEFAULT_PROFILE}`;

// Init DB
const db = new Database(DB_PATH);
db.exec(`
CREATE TABLE IF NOT EXISTS spots (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  type TEXT CHECK(type IN ('risk','cool')) NOT NULL,
  description TEXT,
  lat REAL NOT NULL,
  lon REAL NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
`);

app.get('/api/health', (req, res) => { res.json({ status: 'ok' }); });

app.get('/api/spots', (req, res) => {
  const { type } = req.query;
  if (type === 'risk' || type === 'cool') {
    const stmt = db.prepare('SELECT * FROM spots WHERE type = ? ORDER BY id DESC');
    return res.json({ spots: stmt.all(type) });
  }
  const stmt = db.prepare('SELECT * FROM spots ORDER BY id DESC');
  res.json({ spots: stmt.all() });
});

app.post('/api/spots', (req, res) => {
  const { name, type, description, lat, lon } = req.body;
  if (!name || !type || lat == null || lon == null) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  if (!['risk','cool'].includes(type)) {
    return res.status(400).json({ error: 'Invalid type' });
  }
  const stmt = db.prepare('INSERT INTO spots (name, type, description, lat, lon) VALUES (?, ?, ?, ?, ?)');
  const info = stmt.run(name, type, description || '', lat, lon);
  res.status(201).json({ id: info.lastInsertRowid });
});

app.delete('/api/spots/:id', (req, res) => {
  const id = Number(req.params.id);
  const stmt = db.prepare('DELETE FROM spots WHERE id = ?');
  const info = stmt.run(id);
  if (info.changes === 0) return res.status(404).json({ error: 'Not found' });
  res.json({ ok: true });
});

// OSRM route (walking by default). Expects start & end as \"lon,lat\"
app.get('/api/route', async (req, res) => {
  try {
    const { start, end, profile } = req.query;
    if (!start || !end) return res.status(400).json({ error: 'start and end are required as \"lon,lat\"' });
    const pr = ['foot','bike','driving'].includes(profile) ? profile : DEFAULT_PROFILE;
    const base = OSRM_URL.includes('/route/v1/') ? OSRM_URL.replace(/\/route\/v1\/[a-z]+/, `/route/v1/${pr}`) : `https://router.project-osrm.org/route/v1/${pr}`;
    const url = `${base}/${start};${end}?overview=full&geometries=geojson&steps=true&annotations=true`;
    const r = await axios.get(url);
    res.json(r.data);
  } catch (e) {
    res.status(500).json({ error: 'routing_failed', details: e.message });
  }
});

// Static hosting for the frontend (local dev): serve SafeCoolRoutes_Brno/app as root
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appDir = path.resolve(__dirname, '../../SafeCoolRoutes_Brno/app');
app.use(express.static(appDir));
app.get('/', (_req, res) => { res.sendFile(path.join(appDir, 'index_en.html')); });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => { console.log(`API & static serving on :${PORT}`); });
