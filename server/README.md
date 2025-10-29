# Safe & Cool Routes – Backend (EN)

Express + SQLite backend providing:

- REST API to add/list/delete user spots (risk / cool)
- OSRM routing (walking/bike/driving) drawn along real roads
- Dockerfile for containerized run

## Run locally
```bash
cd server
cp .env.example .env # optional
npm install
node seed.js # optional sample data
npm start
```
Server listens on `http://localhost:8080`.

## .env
```.env
PORT=8080
DB_PATH=data.db
OSRM_URL=https://router.project-osrm.org/route/v1/foot
```

## API
- `GET /api/health` → `{ status: 'ok' }`
- `GET /api/spots?type=risk|cool` → list
- `POST /api/spots` body `{ name, type: 'risk'|'cool', description?, lat, lon }`
- `DELETE /api/spots/:id`
- `GET /api/route?start=lon,lat&end=lon,lat&profile=foot|bike|driving`

Returns OSRM GeoJSON line usable directly by Leaflet/MapLibre.
