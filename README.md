# 💰 FinTrack – Personal Finance Tracker

FinTrack is a Full-Stack Personal Finance Tracker to manage expenses, track income, set monthly budgets, and provide analytics with multi-currency support and dark/light themes.

---

## 🚀 Features

### 🔐 Authentication
- User registration & login (JWT)
- Protected routes for authenticated users
- Secure logout flow

### 💸 Transactions
- Add, delete, and view income & expense transactions
- Categorization (Food, Bills, Travel, Shopping, etc.)
- Real-time dashboard updates

### 📊 Dashboard & Analytics
- Summary cards (Income, Expense, Balance, Overspent)
- Category-wise expense pie chart
- Monthly analytics & insights

### 💰 Budget Management
- Set monthly spending limits
- Alerts when budget is exceeded
- Currency-aware budgeting (INR / USD / EUR)

### 🌍 Multi-Currency Support
- Switch between INR, USD, EUR
- Backend stores values in INR (base currency)
- UI converts values dynamically

### 🎨 UI & UX
- Dark & Light theme toggle
- Responsive design
- Modern fintech-style UI using Tailwind CSS

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router
- Context API (Auth, Theme, Currency)
- Chart libraries (Pie & Bar charts)

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication

---

## 📁 Project Structure

```
personal-finance-tracker/
├── client/    # React + Vite frontend
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── context/
│   │   ├── services/
│   │   └── routes.jsx
│
├── server/    # Node + Express backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── middleware/
│
└── README.md
```

---

## ⚙️ Environment Setup

### Frontend (`client/.env`)

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### Backend (`server/.env`)

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

> `.env` files are intentionally ignored via `.gitignore` — keep secrets out of source control.

### ▶️ Running the Project Locally

1. Clone the repository

```bash
git clone https://github.com/KotaNagaSeetha/FinTrack-Personal-Finance-Tracker.git
cd personal-finance-tracker
```

2. Start Backend

```bash
cd server
npm install
npm run dev
```

3. Start Frontend

```bash
cd client
npm install
npm run dev
```

Frontend: http://localhost:5173

Backend: http://localhost:5000

---

## 🔒 Security & Best Practices

- Store sensitive data in environment variables
- Use JWT-based authentication
- Normalize currency centrally (store in INR)
- Protect frontend routes with authentication

---

## 🛠 Troubleshooting

- **Dashboard opens without login**: Ensure protected routes are wrapped with `ProtectedRoute`.
- **Budget values incorrect in USD/EUR**: Values are stored in INR and converted in UI.
- **Frontend cannot connect to backend**: Verify `VITE_API_BASE_URL` and that the backend is running.

---

## 📌 Future Enhancements

- Recurring transactions
- Export reports to CSV
- Notifications & reminders

---

## 👤 Author
NAGA SEETHA KOTA

GitHub: https://github.com/KotaNagaSeetha

---
Built for hands-on learning to strengthen Full-Stack Development and system design skills. Feedback welcome.

---

Thank you for taking the time to review this project.

