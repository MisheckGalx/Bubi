# 🌍 Bubi.com — Zimbabwe Tourism Platform

**Frontend Shell — React + React Router**

---

## ⚡ Quick Start (3 commands)

```bash
cd bubi-frontend
npm install
npm start
```

Opens at **http://localhost:3000**

---

## 📁 Project Structure

```
bubi-frontend/
├── public/
│   └── index.html
└── src/
    ├── App.jsx                  # Router + layout wrapper
    ├── index.js                 # React entry point
    ├── styles/
    │   └── global.css           # Design tokens, utilities, animations
    ├── data/
    │   └── mockData.js          # All destinations, activities, prices (swap for API later)
    ├── hooks/
    │   └── useReveal.js         # Scroll-triggered reveal animation hook
    ├── components/
    │   └── layout/
    │       ├── Navbar.jsx       # Fixed nav, scroll effect, active links
    │       └── Footer.jsx       # 4-col footer, social links
    └── pages/
        ├── HomePage.jsx         # Hero + search, destinations, costs, alerts, CTA
        ├── ExplorePage.jsx      # All destinations grid with tag filters
        ├── DestinationPage.jsx  # Full detail: overview, activities, stays, costs
        ├── ActivitiesPage.jsx   # Activities grid with category + destination filters
        └── PlannerPage.jsx      # Interactive itinerary builder + cost estimator
```

---

## 🗺️ Pages & Routes

| Route | Page | Status |
|---|---|---|
| `/` | Home — hero, search, highlights | ✅ Done |
| `/explore` | All destinations with filters | ✅ Done |
| `/destination/:slug` | Full destination detail + tabs | ✅ Done |
| `/activities` | All activities with filters | ✅ Done |
| `/planner` | Trip planner + cost calculator | ✅ Done |
| `/accommodations` | (Phase 2) | 🔜 |
| `/dashboard` | (Phase 2 — user accounts) | 🔜 |

---

## 🔌 Connecting to FastAPI Backend

All data is currently in `src/data/mockData.js`.  
When your FastAPI backend is ready, replace with API calls:

```js
// Example: replace mockData import with fetch
const [destinations, setDestinations] = useState([]);

useEffect(() => {
  fetch('http://localhost:8000/api/v1/destinations')
    .then(r => r.json())
    .then(data => setDestinations(data));
}, []);
```

Or use a custom hook:

```js
// hooks/useApi.js
export function useDestinations() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/v1/destinations`)
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); });
  }, []);
  return { data, loading };
}
```

Add to `.env`:
```
REACT_APP_API_URL=http://localhost:8000
```

---

## 🎨 Design System

| Token | Value | Usage |
|---|---|---|
| `--terra` | `#C9622F` | Primary buttons, accents |
| `--gold` | `#D4A843` | Prices, highlights, active states |
| `--savanna` | `#1E2E1A` | Section backgrounds |
| `--charcoal` | `#1A1612` | Main background |
| `--cream` | `#F5EFE0` | Body text |
| `--fog` | `#C4B89A` | Secondary text |
| `--stone` | `#8C7B6B` | Muted / labels |

**Fonts:** Playfair Display (headings) + Outfit (body)

---

## 📦 Dependencies

| Package | Purpose |
|---|---|
| `react-router-dom` | Client-side routing |
| `leaflet` + `react-leaflet` | Map (Phase 2) |

---

## 🚀 Next Steps

1. **Connect FastAPI backend** — swap mockData for real API calls
2. **Add interactive map** — Leaflet with destination pins
3. **User auth** — register/login with JWT
4. **Saved itineraries** — user dashboard
5. **Real booking integration** — WhatsApp deep links + affiliate URLs
6. **SEO** — React Helmet for meta tags per page
7. **Deploy** — Netlify (frontend) + Railway/Render (FastAPI)

---

## 🌍 Destination Slugs

| Destination | Slug |
|---|---|
| Victoria Falls | `victoria-falls` |
| Hwange National Park | `hwange` |
| Lake Kariba | `lake-kariba` |
| Great Zimbabwe | `great-zimbabwe` |
| Eastern Highlands | `eastern-highlands` |
