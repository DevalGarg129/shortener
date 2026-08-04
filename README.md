# 🔗 URL Shortener

A full-stack URL Shortener built using the **MERN Stack** that converts long URLs into short, shareable links. The application supports custom aliases, URL expiration, analytics, and basic URL management while following a clean layered architecture.

---

## 🚀 Features

- Generate Short URLs
- Custom Alias Support
- URL Expiration
- 302 Redirect to Original URL
- Click Analytics
- Update Expiration
- Delete URL
- Search URLs
- Dashboard for URL Management

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

---

## 📂 Project Structure

```text
shortener
│
├── client
│   ├── components
│   ├── hooks
│   ├── pages
│   ├── services
│   └── utils
│
└── server
    ├── config
    ├── controllers
    ├── middleware
    ├── models
    ├── routes
    ├── services
    └── utils
```

---

## 🏗️ Architecture

```text
React Frontend
       │
       ▼
Express API
       │
Routes
       │
Controllers
       │
Services
       │
MongoDB
```

---

## 🔄 Working Flow

```text
Long URL

↓

Generate SHA-1 Hash

↓

Create Short Code

↓

Store in MongoDB

↓

Return Short URL
```

---

## 📌 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/v1/url` | Create Short URL |
| GET | `/:shortCode` | Redirect to Original URL |
| GET | `/api/v1/url` | Get All URLs |
| GET | `/api/v1/url/details/:shortCode` | Get URL Details |
| PATCH | `/api/v1/url/:shortCode` | Update Expiry |
| DELETE | `/api/v1/url/:shortCode` | Delete URL |
| GET | `/api/v1/url/:shortCode/analytics` | URL Analytics |

---

## ⚙️ Environment Variables

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

BASE_URL=http://localhost:5000

HASH_LENGTH=6
```

---

## ▶️ Run Locally

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

---

## 📈 Future Improvements

- Redis Caching
- Docker
- AWS Deployment
- Kubernetes
- Rate Limiting
- Swagger Documentation
- CI/CD Pipeline

---

## 👨‍💻 Author

**Deval Garg**