# 🛍️ Shopwise — Angular E-Commerce App

A fully responsive e-commerce web application built with **Angular 21**, consuming a real REST API and featuring authentication, dynamic routing, cart management, and more.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Angular CLI (`npm install -g @angular/cli`)

### Installation & Run

```bash
# 1. Clone the repository
git clone https://github.com/your-username/shopwise.git

# 2. Navigate to project folder
cd shopwise

# 3. Install dependencies
npm install

# 4. Start the development server
ng serve
```

Then open your browser at **http://localhost:4200**

---

## ✨ Features

### 🛒 Cart — Open to Everyone
Any visitor can browse products and add them to the cart — no login required. The cart also allows adding the same product multiple times to increase quantity. However, **proceeding to checkout requires a registered and logged-in account**. This ensures a smooth browsing experience while keeping the purchase flow secure.

---

### 🔒 Protected Pages & Access Control

Certain pages in Shopwise are only accessible to logged-in users. If a visitor tries to access any of the following pages without being authenticated, they will be automatically redirected to the Login page:

- **Wishlist** — Users must be logged in to view or remove their saved products
- **Sale** — Exclusive deals are only visible to registered members
- **Checkout** — Placing an order requires a verified account

This is enforced using an **Angular Route Guard (`authGuard`)** that checks the user's session before granting access to any protected route.

---

### 🔐 Authentication
- Register a new account with form validation
- Login with email & password
- Logout from any page
- Duplicate email detection on registration

### 📄 Pages
| Page | Route | Protected |
|------|-------|-----------|
| Home / Products | `/products` | ❌ |
| Product Details | `/product/:id` | ❌ |
| Cart | `/cart` | ❌ |
| Wishlist | `/wishlist` | ✅ Login required |
| Sale | `/sale` | ✅ Login required |
| Checkout | `/checkout` | ✅ Login required |
| Login | `/login` | ❌ |
| Register | `/register` | ❌ |

---

## 🌐 API

This project uses **[DummyJSON](https://dummyjson.com)** as the external REST API.

| Endpoint | Description |
|----------|-------------|
| `GET /products?limit=100` | Fetch all products |
| `GET /products/:id` | Fetch single product by ID |

---

## 🗂️ Project Structure

```
src/
├── app/
│   ├── guards/
│   │   └── auth-guard.ts        # Protects authenticated routes
│   ├── pages/
│   │   ├── home/                # Product listing + search + filter
│   │   ├── product-details/     # Dynamic route /product/:id
│   │   ├── cart/                # Cart management
│   │   ├── wishlist/            # Saved products
│   │   ├── checkout/            # Order summary (protected)
│   │   ├── sale/                # Sale products (protected)
│   │   ├── login/               # Login form
│   │   └── register/            # Register form
│   ├── services/
│   │   ├── auth.service.ts      # Register / Login / Logout
│   │   ├── product.service.ts   # API calls via HttpClient
│   │   ├── cart.service.ts      # Cart & Wishlist state
│   │   └── search.service.ts    # Shared search state
│   ├── app.routes.ts            # All application routes
│   └── app.html / app.css       # Root layout & navbar
```

---

## 🛠️ Built With

- [Angular 21](https://angular.dev)
- [Bootstrap 5.3](https://getbootstrap.com)
- [Font Awesome 6](https://fontawesome.com)
- [DummyJSON API](https://dummyjson.com)

---

## 📱 Responsive Design

The application is fully responsive and tested on:
- Desktop (1200px+)
- Tablet (768px)
- Mobile (480px and below)
