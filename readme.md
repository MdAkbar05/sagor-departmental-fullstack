## Backend Technologies

- **Node.js**
- **Express.js**
- **MongoDB**

---

## Features

### User Features
- Registration with OTP verification
- Login with email & password
- Password reset for forgotten passwords
- Login with Google accounts
- Browse products from the database
- Review products
- Add products to cart
- Place orders
- View order status
- Submit feedback
- Contact or track the shop

### Admin/Manager Features
- Access dashboard, analytics, and sales data
- Add, edit, or delete products
- Ban or delete users
- View and update order statuses (Pending, Delivered, Cancelled)
- View all customers and their orders
- Manage product reviews (view/delete)

---

## Database Schemas

- **Users**
- **Products**
- **Reviews**
- **Categories**

---

## API Endpoints

**Base URL:** `http://localhost:5000/api`

### Users
- `[GET] /users` — Get all users
- `[GET] /users/:id` — Get user by ID
- `[POST] /process-register` — Register user
- `[POST] /user/verify` — Verify user by OTP
- `[PUT] /user/:id` — Update user
- `[DELETE] /user/:id` — Delete user
- `[PUT] /ban-user` — Ban user
- `[PUT] /unban-user` — Unban user
- `[PUT] /update-password` — Update password
- `[POST] /forget-password` — Request password reset
- `[PUT] /reset-password` — Reset password

### Products
- `[GET] /products` — Get all products
- `[POST] /products` — Create product (with image)
- `[GET] /products/search?query=value` — Search products
- `[GET] /products/:slug` — Get product by slug
- `[PUT] /products/:slug` — Update product by slug
- `[DELETE] /products/:slug` — Delete product by slug
- `[POST] /products/:id/reviews` — Add review to product
- `[GET] /products/by-category/:category` — Get products by category

### Reviews
- `[GET] /reviews` — Get all reviews
- `[DELETE] /reviews/:id` — Delete review by ID

### Categories
- `[GET] /categories` — Get all categories
- `[GET] /categories/:slug` — Get category by slug
- `[PUT] /categories/:slug` — Update category by slug
- `[DELETE] /categories/:slug` — Delete category by slug

### Orders
- `[GET] /orders` — Get all orders
- `[POST] /orders` — Create order
- `[DELETE] /orders/:orderId` — Delete order
- `[PATCH] /orders/update-status` — Update order status

### Auth
- `[POST] /login` — Login
- `[POST] /logout` — Logout
- `[POST] /refresh-token` — Generate refresh token
- `[POST] /protected` — Backup token (refresh within 7 days)

---

## Middleware

- `isLoggedIn` — Check if user is logged in
- `isLoggedOut` — Check if user is logged out
- `isAdmin` — Check if user is admin
- `isBanned` — Check if user is banned

---

## Helpers

- `deleteImage` — Delete product image from database
- `emailSender` — Send OTP email on registration

---

## Backend Dependencies

```
axios, bcrypt, bcryptjs, body-parser, cookie-parser, cors, dotenv, express, express-rate-limit, express-validator, fs.extra, google-auth-library, http-errors, jsonwebtoken, mongoose, morgan, multer, nodemailer, nodemon, react-reveal, slugify, winston, xss-clean
```

*(See `package.json` for exact versions.)*