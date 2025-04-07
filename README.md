# 🌍 Vistopia — AI Travel Planner

**Vistopia** is an intelligent, all-in-one travel planner that helps users discover, organize, and book their next trip — effortlessly. Whether you're budgeting for a backpacking adventure or planning a luxury vacation, Vistopia combines the power of AI and real-time data to make travel planning smarter, faster, and more fun.

---

## ✨ Features

### 🗺️ Smart Transport Search
- Multi-modal route planning using Google Maps Directions API.
- Supports **Driving**, **Public Transit**, **Walking**, and **Cycling**.
- Each route displays:
  - Estimated distance
  - Duration
  - Price (based on mode and distance)
- Automatically filters out impractical modes (e.g., walking 1500+ km won't be shown).

### 🏨 Accommodation Discovery
- Fetches nearby stays using **Google Places API** based on your destination.
- Filters listings by your budget and ranks them by proximity, rating, and price level.
- Displays:
  - Name
  - Address
  - Google rating
  - Estimated cost (based on Google’s `price_level` and custom mapping)

### 💬 AI Chatbot Assistant
- Powered by **Function.Network’s API**, seamlessly integrated into the frontend.
- Understands user questions, suggests destinations, and offers guidance.
- Examples of queries it handles:
  - “What’s the cheapest way to reach Manali?”
  - “Suggest a 5-day itinerary for Kerala.”
  - “Show places under ₹5000 in Goa.”

### 📢 Community Feed
- Simple forum-like platform where users can:
  - Ask questions
  - Share local travel tips
  - Discover user-recommended locations
- Built using FastAPI routers and database-backed post creation.
- Extensible to include:
  - Likes/comments
  - Upvotes
  - User profiles

### 🧮 Budget Estimator
- Every selected route or stay returns an estimated cost.
- Total budget calculation (coming soon!) will combine:
  - Transport + Accommodation + Buffer

### 🔐 User Authentication
- Sign up & log in functionality.
- Passwords hashed securely using `bcrypt`.
- Enables personalized planning and community participation.

---

## 🛠️ Tech Stack

| Layer         | Tech                                                                 |
|---------------|----------------------------------------------------------------------|
| **Frontend**  | React.js, Vite, Axios, Tailwind CSS                                  |
| **Backend**   | FastAPI, SQLAlchemy, Pydantic, Passlib (bcrypt), CORS Middleware     |
| **AI API**    | [Function.Network](https://function.network)                         |
| **Maps & Data**| Google Maps API, Google Places API                                  |
| **Database**  | SQLite (easy local setup), adaptable to PostgreSQL or MySQL          |
| **Dev Tools** | Postman (API testing), Vite Dev Server, Uvicorn (for FastAPI)        |

---

## 🚀 Getting Started

### 🧱 Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
