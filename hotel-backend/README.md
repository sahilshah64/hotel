# Hotel Booking – Backend API

Express + MongoDB (Mongoose) backend for the Hotel Booking React frontend.

---

## Tech Stack

| Layer       | Library              |
|-------------|----------------------|
| Runtime     | Node.js 18+          |
| Framework   | Express 4            |
| Database    | MongoDB + Mongoose 8 |
| Auth        | JWT + bcryptjs       |
| Validation  | express-validator    |
| Rate limit  | express-rate-limit   |
| Logging     | morgan               |

---

## Quick Start

### 1. Install dependencies
```bash
cd hotel-backend
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
# Edit .env — set MONGO_URI and JWT_SECRET
```

### 3. Seed the database
```bash
npm run seed
# Creates 6 rooms + an admin account (admin@hotel.com / admin123)
```

### 4. Start the server
```bash
# Development (auto-reload)
npm run dev

# Production
npm start
```

Server runs on **http://localhost:5000** by default.

---

## Connect to the Frontend

In the frontend project, create / update `.env`:
```
VITE_API_URL=http://localhost:5000/api
```

---

## API Reference

All routes are prefixed with `/api`.

### Health
| Method | Path          | Auth | Description      |
|--------|---------------|------|------------------|
| GET    | /health       | –    | Server heartbeat |

### Auth  `/api/auth`
| Method | Path      | Auth | Body                          | Returns           |
|--------|-----------|------|-------------------------------|-------------------|
| POST   | /register | –    | `{name, email, password}`     | `{token, user}`   |
| POST   | /login    | –    | `{email, password}`           | `{token, user}`   |
| GET    | /me       | JWT  | –                             | `{user}`          |

### Rooms  `/api/rooms`
| Method | Path                        | Auth       | Description                       |
|--------|-----------------------------|------------|-----------------------------------|
| GET    | /                           | –          | List rooms (filterable)           |
| GET    | /:id                        | –          | Get single room                   |
| GET    | /:id/availability           | –          | Check date availability           |
| POST   | /                           | Admin JWT  | Create room                       |
| PUT    | /:id                        | Admin JWT  | Update room                       |
| DELETE | /:id                        | Admin JWT  | Delete room                       |

**Room filter query params:** `category`, `minPrice`, `maxPrice`, `beds`, `guests`, `page`, `limit`

**Availability query params:** `checkIn` (YYYY-MM-DD), `checkOut` (YYYY-MM-DD)

### Bookings  `/api/bookings`
| Method | Path          | Auth             | Description               |
|--------|---------------|------------------|---------------------------|
| POST   | /             | Optional JWT     | Create booking            |
| GET    | /my           | JWT              | My bookings               |
| PATCH  | /:id/cancel   | JWT (own/admin)  | Cancel booking            |
| GET    | /             | Admin JWT        | All bookings (paginated)  |

**Booking body:**
```json
{
  "roomId":         "mongo_id",
  "guestName":      "Jane Doe",
  "guestEmail":     "jane@example.com",
  "guestPhone":     "+1 555 0000",
  "guests":         2,
  "checkIn":        "2025-08-01",
  "checkOut":       "2025-08-05",
  "specialRequest": "High floor preferred"
}
```

### Contact  `/api/contact`
| Method | Path      | Auth       | Description             |
|--------|-----------|------------|-------------------------|
| POST   | /         | –          | Submit contact form     |
| GET    | /         | Admin JWT  | List all messages       |
| PATCH  | /:id/read | Admin JWT  | Mark message as read    |

---

## Project Structure

```
hotel-backend/
├── src/
│   ├── server.js            # Express app + middleware + routes
│   ├── config/
│   │   └── db.js            # Mongoose connection
│   ├── models/
│   │   ├── User.js
│   │   ├── Room.js
│   │   ├── Booking.js
│   │   └── Contact.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── rooms.js
│   │   ├── bookings.js
│   │   └── contact.js
│   └── middleware/
│       └── auth.js          # protect / optionalAuth / adminOnly
├── scripts/
│   └── seed.js              # DB seeder
├── .env.example
└── package.json
```

---

## Environment Variables

| Variable        | Default                               | Description                 |
|-----------------|---------------------------------------|-----------------------------|
| PORT            | 5000                                  | HTTP port                   |
| NODE_ENV        | development                           | Environment                 |
| MONGO_URI       | mongodb://localhost:27017/hotel_db    | MongoDB connection string   |
| JWT_SECRET      | –                                     | **Required** – sign tokens  |
| JWT_EXPIRES_IN  | 7d                                    | Token lifetime              |
| CLIENT_ORIGIN   | http://localhost:5173                 | Allowed CORS origin(s)      |

---

## Deployment Notes

- Use **MongoDB Atlas** for cloud DB — update `MONGO_URI` in your hosting env vars.
- Set `NODE_ENV=production` to suppress stack traces in error responses.
- Use a strong random `JWT_SECRET` (32+ chars).
- For multiple frontend origins, set `CLIENT_ORIGIN` as comma-separated values.
