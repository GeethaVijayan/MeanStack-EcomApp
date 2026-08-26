# Quick Start Guide - E-Commerce App

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Angular CLI v19
- Backend API running on `http://localhost:3000`

### Installation

```bash
# Install dependencies
npm install

# Start the dev server
npm start

# Navigate to
http://localhost:4200
```

---

## 📝 First-Time Setup

### 1. Configure Backend API
Edit `src/environments/environment.development.ts`:
```typescript
export const environment = {
  apiUrl: 'http://localhost:3000'  // Change if needed
};
```

### 2. Required Backend Endpoints

Your backend must have these endpoints:

```
Authentication
  POST   /auth/login
  POST   /auth/register

Categories
  GET    /category
  GET    /category/:id
  POST   /category
  PUT    /category/:id
  DELETE /category/:id

Brands
  GET    /brand
  GET    /brand/:id
  POST   /brand
  PUT    /brand/:id
  DELETE /brand/:id

Products
  GET    /product
  GET    /product/:id
  POST   /product
  PUT    /product/:id
  DELETE /product/:id
```

---

## 🧪 Testing the Application

### Customer Flow
1. Visit `http://localhost:4200`
2. See product shop with filters
3. Click on a product to view details
4. Add to cart
5. Go to cart page (next to build)
6. Checkout (next to build)

### Admin Flow
1. Click "Login" button
2. Login with admin credentials
3. Navigate to `/admin/categories`, `/admin/brands`, `/admin/product`
4. Perform CRUD operations

### Creating Test Account
1. Click "Register"
2. Fill in email, password, name
3. Confirm password
4. Register (requires backend auth endpoint)

---

## 🛠️ Key Features to Try

### Shop Features
- ✅ Search by product name
- ✅ Filter by category
- ✅ Filter by brand
- ✅ Filter by price range
- ✅ Sort by newest, price, featured
- ✅ Pagination (6, 12, 24 items)
- ✅ View product details
- ✅ Add to cart

### Admin Features
- ✅ Add/Edit/Delete categories
- ✅ Add/Edit/Delete brands
- ✅ Add/Edit/Delete products
- ✅ View lists with pagination
- ✅ Search & filter lists
- ✅ Form validation

### Auth Features
- ✅ Register new account
- ✅ Login with email/password
- ✅ Persistent sessions
- ✅ Logout
- ✅ Protected routes
- ✅ Role-based access

---

## 📦 Building for Production

```bash
# Build optimized bundle
npm run build

# Output in dist/ folder
```

---

## 🐛 Troubleshooting

### App won't load
- Ensure backend is running
- Check `http://localhost:3000` in browser
- Verify firewall/CORS settings

### API calls failing
- Check browser Network tab
- Verify API response format
- Check backend console for errors
- Ensure auth tokens are sent in headers

### Login not working
- Verify backend auth endpoints exist
- Check credentials
- Look for error messages in snackbar

### Products not showing
- Verify `/product` endpoint returns data
- Check product images have valid URLs
- Ensure categoryId/brandId match existing categories/brands

---

## 📚 Project Structure Quick Reference

```
src/app/
├── services/
│   ├── auth.service.ts          # Login/logout/JWT
│   ├── products.service.ts      # CRUD operations
│   ├── categories.service.ts
│   ├── brands.service.ts
│   └── cart.service.ts          # Shopping cart
├── components/
│   ├── auth/                    # Login/Register pages
│   ├── shop/                    # Product listing page
│   ├── product-detail/          # Single product page
│   ├── header/                  # Navigation
│   └── manage/                  # Admin CRUD pages
└── guards/
    └── auth.guard.ts            # Route protection
```

---

## 🎯 What to Build Next

1. **Shopping Cart Page** - View/edit items in cart
2. **Checkout** - Shipping & payment form
3. **Order History** - View past orders
4. **User Profile** - Edit account info
5. **Reviews** - Add product reviews

See `COMPLETION_GUIDE.md` for detailed implementation steps.

---

## 💡 Tips

- Use browser DevTools Network tab to debug API issues
- Check localStorage for stored cart & auth token
- Material components have built-in error handling
- All services use RxJS with error handling
- Snackbar notifications show success/error messages

---

**Happy coding! 🚀**
