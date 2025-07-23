# 🌙 DreamShare – Full Stack Dream Sharing Platform

A modern, privacy-first dream sharing platform where users can anonymously or personally share their dreams, interact with others, and enjoy a beautiful, responsive experience.

---

## 📌 1. Project Overview

DreamShare is a full-stack web application that allows users to:

- Register and log in securely (JWT-based authentication)
- Create, edit, and delete dream posts (only for authenticated users)
- Like posts (only once per user per post)
- Browse a global feed (public, no login required)
- Enjoy a calming, mobile-friendly, animated UI
- Experience role-based navigation and feedback toasts

---

## 🛠 2. Technology Stack

**Frontend**:
- React (Vite)
- React Router
- Axios
- Raw CSS (no frameworks)
- Deployed on Vercel

**Backend**:
- FastAPI (Python)
- SQLAlchemy ORM
- JWT Authentication (`python-jose`)
- Passlib (bcrypt password hashing)
- CORS Middleware
- Deployed on Render

**Database**:
- Supabase (PostgreSQL as a Service)

---

## 🗃 3. Database Schema

**Table: usershare**
- `id` (PK, int)
- `username` (str, unique, not null)
- `email` (str, unique, not null)
- `password_hash` (str, not null)
- `created_at` (datetime)

**Table: posts**
- `id` (PK, int)
- `user_id` (FK to usershare.id, not null)
- `content` (text, not null)
- `created_at` (datetime)

**Table: likes**
- `id` (PK, int)
- `user_id` (FK to usershare.id, not null)
- `post_id` (FK to posts.id, not null)
- `created_at` (datetime)
- UniqueConstraint: (`user_id`, `post_id`)

---

## 🔗 4. Backend API Endpoints

- `POST   /register`          – Register a new user
- `POST   /login`             – Login and get JWT token
- `GET    /me`                – Get current user profile (auth required)
- `POST   /posts`             – Create a new post (auth required)
- `GET    /posts/me`          – Get all posts by current user (auth required)
- `GET    /posts`             – Get all posts (public feed)
- `GET    /posts/{id}`        – Get a single post
- `PUT    /posts/{id}`        – Edit a post (auth, owner only)
- `DELETE /posts/{id}`        – Delete a post (auth, owner only)
- `POST   /posts/{id}/like`   – Like a post (auth, once per user per post)

---

## 💻 5. Frontend Features

- Responsive, mobile-first design
- Calming color palette (light blue, lavender, white)
- Animated cards, transitions, and toasts
- Role-based navigation (dashboard, create post, logout for logged-in users; login/register for guests)
- Toast notifications for all actions (success, error, info)
- LocalStorage-based JWT token management
- Protected routes (dashboard, create/edit post)
- Feed page (public, shows all posts, like button for logged-in users)
- Dashboard (user info, create post form, user’s posts with edit/delete)
- Login/Register forms with validation

---

## 🚀 6. Deployment

- **Backend**: [Render.com](https://render.com)
- **Frontend**: [Vercel.com](https://vercel.com)
- **Database**: [Supabase](https://supabase.io)

---

## 🧪 7. How to Run Locally

### Backend

```bash
git clone https://github.com/yourusername/dreamshare.git
cd dreamshare/backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
```

Create a `.env` file with:
```env
PG_USER=...
PG_PASSWORD=...
PG_HOST=...
PG_PORT=6543
PG_DB=postgres
SECRET_KEY=your_secret_key
```

Start server:
```bash
uvicorn app.main:app --reload
```

### Frontend

```bash
cd ../frontend
npm install
```

Create a `.env` file with:
```env
VITE_API_URL=http://localhost:8000
```

Run app:
```bash
npm run dev
```

Visit: [http://localhost:5173](http://localhost:5173)

---

## 🧭 8. Usage

- Register or log in to access dashboard and create posts.
- Anyone can view the feed and like posts (if logged in).
- Edit/delete your own posts from the dashboard.
- Like any post once (per user).
- Logout to return to public browsing.

---

## 🔮 9. Future Enhancements

- User avatars and profile editing
- Comments on posts
- Password reset via email
- Admin/moderator roles
- Post search and filtering
- Dark mode toggle
- Real-time updates (WebSockets)
- Analytics dashboard for users
- Multi-language support
- Accessibility improvements

---

## 🙌 10. Credits

- Built with FastAPI, React, Supabase, and love by Rahul Kumar Parida
- Inspired by the need for a safe, expressive, and beautiful dream-sharing space

**Test My WebApp DreamShare** : https://dream-share-full-stack-project.vercel.app/
---

## 📄 11 🚀 Future Enhancements for DreamShare

## 👤 User Avatars & Profile Editing
- Allow users to upload a profile picture.
- Enable editing of username, email, and bio.

## 💬 Comments on Posts
- Add a comment system so users can discuss and react to dreams.

## 🔐 Password Reset via Email
- Implement a secure “Forgot Password” flow with email verification.

## 🛡️ Admin/Moderator Roles
- Add admin/moderator dashboards for managing users and posts.
- Enable reporting and moderation of inappropriate content.

## 🔍 Post Search and Filtering
- Allow users to search posts by keyword, date, or user.
- Add filters for most liked, most recent, etc.

## 🌙 Dark Mode Toggle
- Provide a dark/light mode switch for better accessibility and comfort.

## 🔴 Real-Time Updates
- Use WebSockets or Server-Sent Events for live feed updates and notifications.

## 📊 Analytics Dashboard
- Give users insights into their posts (views, likes, comments).
- Admin analytics for platform usage.

## 🌐 Multi-Language Support
- Add i18n for global accessibility.

## ♿ Accessibility Improvements
- Ensure full keyboard navigation, screen reader support, and color contrast compliance.

## 📱 Mobile App
- Build a React Native or Flutter app for iOS/Android.

## 🕵️ Anonymous Posting with Optional Reveal
- Let users post anonymously, but optionally “reveal” their identity later.

## 🏷️ Tagging and Categories
- Allow users to tag dreams (e.g., “nightmare”, “lucid”, “funny”) and browse by category.

## 🔔 Push Notifications
- Notify users of likes, comments, or replies.

## 🤖 Integration with AI
- Offer dream interpretation or sentiment analysis using AI.