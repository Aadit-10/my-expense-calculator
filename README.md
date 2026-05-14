# Expense Calculator

A modern, full-stack expense tracking application built with the MERN stack (MongoDB, Express, React, Node.js). This application helps users manage their finances by tracking expenses, categorizing them, and providing visual insights into spending habits.

## 🚀 Features

### Frontend
- **Interactive Dashboard**: Visual representation of spending trends using Recharts.
- **Expense Management**: Add, edit, and delete expenses with ease.
- **Categorization**: Group expenses into categories like Food, Transport, Rent, etc.
- **Real-time Feedback**: Toast notifications for user actions (success/error).
- **Responsive Design**: Premium UI with smooth animations and a clean layout.
- **Currency Formatting**: Localized currency display (INR).

### Backend
- **RESTful API**: Clean API endpoints for CRUD operations on expenses.
- **Data Validation**: Server-side validation using `express-validator`.
- **Database Integration**: Scalable data storage with MongoDB and Mongoose.
- **Summary Analytics**: Aggregated data endpoints for dashboard visualizations.
- **Error Handling**: Centralized middleware for consistent error responses.

## 🛠️ Tech Stack

- **Frontend**: React, Vite, TypeScript, Axios, Lucide React, Recharts, React Hot Toast.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Mongoose ODM).
- **Styling**: Vanilla CSS with modern design patterns.

## 📁 Folder Structure

```text
my-expense-calculator/
├── frontend/                # React client
│   ├── src/
│   │   ├── components/      # UI Components (Navbar, Dashboard, etc.)
│   │   ├── services/        # API service layer
│   │   ├── assets/          # Static assets
│   │   ├── App.tsx          # Main application logic
│   │   └── style.css        # Global styles & design system
│   ├── index.html
│   └── package.json
├── backend/                 # Node.js server
│   ├── src/
│   │   ├── config/          # Database configuration
│   │   ├── controllers/     # Route controllers
│   │   ├── models/          # Mongoose schemas
│   │   ├── routes/          # API route definitions
│   │   ├── middleware/      # Custom middleware (Error handling)
│   │   └── server.js        # Entry point
│   ├── .env                 # Environment variables
│   └── package.json
└── README.md                # Project documentation
```

## ⚙️ Environment Variables

Create a `.env` file in the `backend/` directory with the following variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js installed
- MongoDB account (Atlas or local)

### Steps to Run Locally

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd my-expense-calculator
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   # Create .env file and add MONGODB_URI
   npm start
   ```

3. **Setup Frontend**
   ```bash
   # Open a new terminal
   cd frontend
   npm install
   npm run dev
   ```

4. **Access the App**
   The frontend will be running at `http://localhost:5173/` and the backend at `http://localhost:5000/`.
