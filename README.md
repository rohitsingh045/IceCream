# 🍦 Namaste Bharat - Premium Ice Cream E-Commerce Platform

![Namaste Bharat Homepage](https://raw.githubusercontent.com/rohitsingh045/IceCream/refs/heads/main/public/image.png)

A full-stack e-commerce web application for **Namaste Bharat Ice Cream**, featuring authentic Indian flavors and premium ice cream products. Built with modern web technologies and deployed on Vercel.

**Live Demo:** [https://namastebharat.vercel.app](https://namastebharat.vercel.app)

---

## 📸 Screenshots

### Homepage
![Homepage Hero](https://raw.githubusercontent.com/rohitsingh045/IceCream/refs/heads/main/public/image.png)
*Premium ice cream crafted with the finest ingredients and love*

### Our Special Flavors
![Product Gallery](https://raw.githubusercontent.com/rohitsingh045/IceCream/refs/heads/main/public/image%20copy.png)
*Hand-picked favorites that bring the taste of India to your palate*

### Product Details
![Product Modal](https://raw.githubusercontent.com/rohitsingh045/IceCream/refs/heads/main/public/image%20copy%202.png)
*Detailed product view with ratings, pricing, and cart functionality*

---

## ✨ Features

### 🛒 **Customer Features**
- **Browse Products**: Explore authentic Indian ice cream flavors
- **Product Categories**: Filter by Cones, Cups, Sundaes, and Family Packs
- **Product Details**: View detailed information, ratings, and descriptions
- **Shopping Cart**: Add/remove items with real-time total calculation
- **Wishlist**: Save favorite products for later
- **User Authentication**: Secure login and registration
- **Order Placement**: Complete checkout with shipping details
- **Responsive Design**: Seamless experience across all devices

### 👨‍💼 **Admin Features**
- **Dashboard**: Overview of orders, products, and statistics
- **Order Management**: View and update order status
- **Product Management**: Add, edit, and delete products
- **Image Upload**: Cloudinary integration for product images
- **User Management**: View and manage registered users

### 🎨 **UI/UX Highlights**
- Beautiful gradient backgrounds
- Smooth animations and transitions
- Interactive product cards with hover effects
- Toast notifications for user feedback
- Modal-based product quick view
- Star ratings and reviews

---

## 🛠️ Tech Stack

### **Frontend**
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Sonner** - Toast notifications
- **Embla Carousel** - Product carousels

### **Backend**
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Cloudinary** - Image hosting
- **Nodemailer** - Email notifications
- **Multer** - File upload handling

### **Deployment**
- **Vercel** - Frontend hosting
- **Vercel Serverless** - Backend API
- **MongoDB Atlas** - Cloud database

---

## 📂 Project Structure

```
IceCream/
├── backend/                    # Backend API
│   ├── config/                # Database & Cloudinary config
│   ├── Controller/            # Route controllers
│   ├── Middleware/            # Auth middleware
│   ├── models/                # Mongoose schemas
│   ├── Routes/                # API routes
│   ├── services/              # Email service
│   ├── server.js              # Express server
│   └── vercel.json            # Vercel serverless config
│
├── src/                       # Frontend source
│   ├── components/            # React components
│   │   ├── ui/               # shadcn/ui components
│   │   ├── Navbar.tsx        # Navigation bar
│   │   ├── Footer.tsx        # Footer component
│   │   └── ...
│   ├── contexts/              # React contexts
│   │   ├── AuthContext.tsx   # Authentication state
│   │   ├── CartContext.tsx   # Shopping cart state
│   │   └── FavoritesContext.tsx
│   ├── pages/                 # Page components
│   │   ├── Home.tsx          # Landing page
│   │   ├── Menu.tsx          # Products page
│   │   ├── Login.tsx         # Login page
│   │   ├── Signup.tsx        # Registration page
│   │   ├── Cart.tsx          # Shopping cart
│   │   ├── Checkout.tsx      # Checkout page
│   │   ├── AdminDashboard.tsx # Admin panel
│   │   └── ...
│   ├── lib/                   # Utilities
│   │   ├── api.ts            # API configuration
│   │   └── utils.ts          # Helper functions
│   └── assets/                # Static assets
│
├── public/                    # Public files
├── vercel.json                # Frontend Vercel config
├── tailwind.config.ts         # Tailwind configuration
├── vite.config.ts             # Vite configuration
└── package.json               # Dependencies
```

---

## 🚀 Getting Started

### **Prerequisites**
- Node.js (v18 or higher)
- MongoDB Atlas account
- Cloudinary account
- Gmail account (for email service)

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/namaste-bharat-ice-cream.git
   cd namaste-bharat-ice-cream
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Configure environment variables**

   **Frontend** - Create `.env` in root:
   ```env
   VITE_API_URL=http://localhost:5001
   ```

   **Backend** - Create `backend/.env`:
   ```env
   PORT=5001
   NODE_ENV=development
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   
   # Email Configuration
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   ADMIN_EMAIL=admin@example.com
   
   # Cloudinary
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

5. **Run the development servers**

   **Backend** (in `backend` folder):
   ```bash
   npm run dev
   ```

   **Frontend** (in root folder):
   ```bash
   npm run dev
   ```

6. **Access the application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5001`

---

## 📦 Deployment

### **Frontend (Vercel)**

1. Push your code to GitHub
2. Import project to Vercel
3. Add environment variable:
   ```
   VITE_API_URL=https://your-backend-url.vercel.app
   ```
4. Deploy

### **Backend (Vercel)**

1. Navigate to `backend` folder
2. Deploy to Vercel:
   ```bash
   vercel --prod
   ```
3. Add environment variables in Vercel dashboard (all from backend/.env)

**Important:** Update CORS in `backend/server.js` to include your frontend domain.

---

## 🔑 API Endpoints

### **Authentication**
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user

### **Products**
- `GET /api/products` - Get all products
- `POST /api/products/admin/create` - Create product (admin)
- `PUT /api/products/admin/:id` - Update product (admin)
- `DELETE /api/products/admin/:id` - Delete product (admin)

### **Orders**
- `POST /api/orders` - Create order
- `GET /api/orders/admin/all` - Get all orders (admin)
- `PATCH /api/orders/:id/status` - Update order status (admin)

### **Upload**
- `POST /api/upload/product-image` - Upload product image

### **Contact**
- `POST /api/contact` - Send contact form email

---

## 🎨 Product Categories

- **Cones** - Classic ice cream cones
- **Cups** - Ice cream in cups
- **Sundaes** - Premium sundae offerings
- **Family Packs** - Large packs for families

### **Featured Flavors**
- Kesar Pista Kulfi - ₹120
- Mango Kulfi - ₹100
- Rose Kulfi - ₹140
- Chocolate Cone - ₹90
- Vanilla Cone - ₹70
- Butterscotch Cone - ₹110
- And many more!

---

## 👥 User Roles

### **Customer**
- Browse and purchase products
- Manage cart and wishlist
- Place orders
- View order history

### **Admin**
- Full access to dashboard
- Manage products, orders, and users
- Upload product images
- Update order status

---

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Protected admin routes
- CORS configuration
- Environment variable protection
- Secure cookie handling

---

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- 📱 Mobile devices
- 📱 Tablets
- 💻 Desktops
- 🖥️ Large screens

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📧 Contact

**Namaste Bharat Ice Cream**
- Website: [https://namastebharat.vercel.app](https://namastebharat.vercel.app)
- Email: rohitkumar40805@gmail.com
- GitHub: [https://github.com/rohitsingh045]

---

## 🙏 Acknowledgments

- **shadcn/ui** for beautiful React components
- **Vercel** for seamless deployment
- **MongoDB Atlas** for cloud database hosting
- **Cloudinary** for image management
- All the open-source libraries that made this project possible

---

<div align="center">

### मज़ा है Bharat with Namaste Bharat! 🍦

**Premium ice cream crafted with the finest ingredients and love**

*"भारत का असली स्वाद, खास आपके लिए चुना हुआ!"*

Made with ❤️ in India

</div>
