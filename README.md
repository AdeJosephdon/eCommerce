# 🛒 Full-Stack E-Commerce Platform (MERN)

A modern, full-stack MERN E-commerce application with user authentication, AI chatbot, dynamic product management, cart, wishlist, and secure payments.
This project demonstrates end-to-end web development: from Figma design to a deployed full-stack application.


## 🌟 Features
### ✅ Authentication & Authorization 
- JWT-based login, registration, and protected routes.
### ✅ Dynamic Product Management 
- Persistent products, categories, and filtering.
### ✅ Shopping Cart & Wishlist 
- Add, update, and remove items with real-time updates.
### ✅ Secure Payments
- Stripe/PayPal integration or simulated checkout.
### ✅ AI Chatbot
- Integrated with Gemini API for customer support.
### ✅ Responsive UI
- Recreated from Figma, fully mobile-friendly
### ✅ RESTful APIs
- Built with Express.js and Node.js
### ✅ Persistent Storage
- MongoDB for products, users, and orders. Uses local storage also.
### ✅ Modern Routing
- React Router for seamless navigation
### ✅ Accessibility First
- Semantic HTML, ARIA labels, keyboard navigation
### ✅ Performance Optimized
- caching, efficient queries


## 🖼️ Demo
[🔗 Live Preview: Deployed on Vercel](https://e-commerce-six-tau-65.vercel.app/)

[📂 View Code: GitHub Repository](https://github.com/AdeJosephdon/eCommerce)


## 📊 Screenshots
[Responsive Home Page](\client\public\ResponsiveHomePage.png) 

[Cart and Search functionality](\client\public\CartandSearchfunctionalty.png)

[Product Listing with AI Chatbot](client\public\ProductListingWithAIChatbot.png)


## 🛠️ Tech Stack
- Frontend: React, CSS, HTML, React Router

- Backend: Node.js, Express.js

- Database: MongoDB (Mongoose ORM)

- Authentication: JWT (JSON Web Tokens)

- State Management: React Hooks (useState, useContext, useRef)

- APIs: Gemini API (AI chatbot), Fetch API for frontend–backend communication

- UI/UX Design: Figma (community template recreated)

- Version Control: Git, GitHub

- Deployment: Vercel (Frontend), Render/Atlas (Backend & DB)


## 📚 Concepts & Practices Applied

- Built RESTful APIs using Express.js and Node.js

- Connected frontend & backend seamlessly with Fetch API

- Implemented JWT authentication for secure login & route protection

- Integrated MongoDB for persistent data storage (products, users, orders)

- Designed & structured React Router navigation for scalability

- Implemented an AI chatbot for user support with Gemini API

- Practiced GitHub workflow: branch creation, API key protection with .env, repo reset, and version control

- Recreated a professional Figma design: [Full E-Commerce Website UI/UX (Community)](https://www.figma.com/design/noB6Ao9cDlRHCNbJiZgNWP/Full-E-Commerce-Website-UI-UX-Design-(Community)?node-id=1-3&p=f&t=10m0lgK9jcLG9kXW-0)

- Focused on accessibility, responsiveness, and performance optimization

## ⚙️ Installation & Setup
### 1️⃣ Clone Repository
git clone https://github.com/AdeJosephdon/eCommerce.git
cd eCommerce

### 2️⃣ Install Dependencies
- Install backend dependencies
cd backend
npm install

- Install frontend dependencies
cd ../frontend
npm install

### 3️⃣ Environment Variables

Create a .env file in the root of your project with the following:

REACT_APP_GEMINI_API_KEY=Y=your_api_Key

REACT_APP_STRIPE_KEY=your_stripe_key

REACT_APP_BACKEND_URL=your_backend_api

⚠️ Do not commit .env files to GitHub. Use .env.example instead.

### 4️⃣ Run Development Servers
- Backend
cd backend
npm run dev

- Frontend
cd ../frontend
npm run start

## 🧪 Testing (Optional)

- Unit & Integration Testing – Jest + React Testing Library

- API Testing – Postman

- Run tests:

npm test

## 🌍 Deployment

- Frontend: [Vercel (React app)](https://e-commerce-six-tau-65.vercel.app/) 

- Backend: Render

- Database: MongoDB Atlas

- Build for production:

npm run build


## 🎯 Learning Outcomes

- Through this project, I demonstrated:

- End-to-end full-stack MERN development

- Frontend & backend integration with APIs

- Authentication & Authorization with JWT

- Responsive UI development from Figma designs

- Integration of AI chatbot (Gemini API) into a production app

- Applying best practices: version control, environment variable handling, deployment

- Balancing accessibility, responsiveness, and performance


## 👨‍💻 Author
Built with ❤️ by [Adegboyega Joseph]
🔗 [[My Portfolio]](https://josephdonportfolio.vercel.app/) | [[My LinkedIn]](https://www.linkedin.com/in/adegboyega-joseph-444b36164?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app) | [adegboyegajosephdon@gmail.com](adegboyegajosephdon@gmail.com)