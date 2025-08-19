🛒 MERN E-Commerce App

A full-stack e-commerce web application built with the MERN stack and Tailwind CSS, featuring a secure authentication system, admin panel, and modern UI.

✨ Features

🔑 Authentication & Security

JWT-based authentication

Password hashing with bcrypt

🛠 Admin Panel

Manage products

Manage orders

Manage users

🏠 User Experience

Unique homepage carousel animation

Dedicated Men & Women sections

Category pages (Topwear, Bottomwear, Collections)

Side filter bar with category & price filters

⚡ State Management & UI

Redux Toolkit for global state

Tailwind CSS for responsive styling

Sonner for toast notifications

React Icons & Lucide Icons for modern UI

🛠 Tech Stack

Frontend: React, Redux Toolkit, Tailwind CSS, Sonner, React Icons, Lucide Icons
Backend: Node.js, Express.js, MongoDB, JWT, Bcrypt

📸 Screenshots

(Add some screenshots of your homepage, admin panel, and product filters here for better presentation)

🚀 Installation

Clone the repository

git clone https://github.com/your-username/mern-ecommerce.git
cd mern-ecommerce


Install dependencies

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install


Create a .env file in the backend directory and add:

MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret


Start the application

# Backend
cd backend
npm run dev

# Frontend
cd ../frontend
npm start

📌 Roadmap / Future Improvements

Add payment gateway integration (Stripe/PayPal)

Wishlist & Cart persistence

Product reviews & ratings

Admin dashboard analytics
