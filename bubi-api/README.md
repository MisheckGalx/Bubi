# Bubi API 🌍

FastAPI backend for the Bubi Zimbabwe Tourism platform.

---

## Stack

- **FastAPI** — async Python web framework
- **PostgreSQL** — primary database
- **SQLAlchemy** — ORM
- **Alembic** — database migrations
- **JWT** — authentication
- **Pydantic v2** — request/response validation

---

## Quick Start

### 1. Clone & install

```bash
git clone https://github.com/MisheckGalx/Bubi.git
cd Bubi/bubi-api

python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

pip install -r requirements.txt
```

### 2. Configure environment

```bash
cp .env.example .env
# Edit .env with your PostgreSQL credentials and a strong SECRET_KEY
```

### 3. Create the database

```bash
# In PostgreSQL:
CREATE DATABASE bubi_db;
```

### 4. Run migrations

```bash
alembic upgrade head
```

### 5. Seed the database

```bash
python -m scripts.seed
```

### 6. Start the server

```bash
uvicorn app.main:app --reload --port 8000
```

API docs available at: **http://localhost:8000/docs**

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/destinations` | List all destinations |
| GET | `/api/v1/destinations/{slug}` | Get destination + activities + accommodations |
| GET | `/api/v1/activities` | List activities (filter by dest, category, difficulty, max_price) |
| GET | `/api/v1/accommodations` | List accommodations (filter by dest, tier, type) |
| GET | `/api/v1/alerts` | Active travel alerts |
| POST | `/api/v1/auth/register` | Register new user |
| POST | `/api/v1/auth/login` | Login → returns JWT |
| GET | `/api/v1/auth/me` | Get current user (auth required) |
| GET | `/api/v1/itineraries` | Get user's itineraries (auth required) |
| POST | `/api/v1/itineraries` | Save itinerary (auth required) |
| PATCH | `/api/v1/itineraries/{id}` | Update itinerary (auth required) |
| DELETE | `/api/v1/itineraries/{id}` | Delete itinerary (auth required) |

---

## Query Parameters

**Destinations**
- `?featured=true` — featured destinations only
- `?tag=UNESCO+Heritage` — filter by tag

**Activities**
- `?destination_id=1`
- `?category=wildlife`
- `?difficulty=easy`
- `?max_price=100`

**Accommodations**
- `?destination_id=1`
- `?tier=mid_range`
- `?accommodation_type=lodge`

---

## Run Tests

```bash
pytest tests/ -v
```

---

## Connect Frontend

Update your frontend `mockData.js` imports to fetch from the API:

```js
// Instead of importing from mockData.js:
const res = await fetch('http://localhost:8000/api/v1/destinations');
const destinations = await res.json();
```
