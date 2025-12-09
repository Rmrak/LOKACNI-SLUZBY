import Database from 'better-sqlite3';
import fs from 'fs';

const db = new Database(process.env.DB_PATH || 'data.db');

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

const sample = [
  { name: 'Busy crossing', type: 'risk', description: 'Heavy traffic, poor visibility', lat: 49.2005, lon: 16.607 },
  { name: 'Shaded bench', type: 'cool', description: 'Nice shade under trees', lat: 49.203, lon: 16.6085 }
];
const insert = db.prepare('INSERT INTO spots (name,type,description,lat,lon) VALUES (?,?,?,?,?)');
for (const s of sample) insert.run(s.name, s.type, s.description, s.lat, s.lon);

console.log('Seeded', sample.length, 'rows');
