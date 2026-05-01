# MEAN Stack — E-commerce Product Catalog

A full-stack e-commerce catalog management app built as part of the MEAN Stack module
(Angular 17 / Node.js / Express / MongoDB). The admin can manage products, classify them
by category, search, filter, sort, and upload images.

## Stack

- **MongoDB** + **Mongoose** for data persistence
- **Express** for the REST API
- **Angular 17** (standalone components, lazy routes, reactive forms)
- **Bootstrap 5** + **SweetAlert2** for the UI
- **Multer** for image uploads

## Project structure

```
mean_project/
├── backend/
│   ├── config/db.js
│   ├── controllers/       # productController, categoryController
│   ├── middleware/upload.js
│   ├── models/            # Product, Category
│   ├── routes/            # /api/products, /api/categories
│   ├── uploads/           # uploaded images (gitignored contents)
│   ├── app.js
│   ├── seed.js            # demo data with Unsplash images
│   └── .env               # PORT, MONGO_URI (gitignored)
└── frontend/
    └── src/app/
        ├── components/navbar/
        ├── pages/
        │   ├── product-list/
        │   ├── product-detail/
        │   ├── product-form/
        │   └── categories/
        ├── services/
        ├── models/
        └── app.routes.ts
```

## Prerequisites

- Node.js 18+ (Angular 17 supports Node 18 / 20)
- MongoDB Server running locally on `mongodb://127.0.0.1:27017`
  - Install via `winget install MongoDB.Server` (Windows) or download from mongodb.com

## Setup

### 1. Backend

```bash
cd backend
npm install
```

Create `backend/.env`:

```
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/ecommerce
```

Seed demo data (6 categories + 17 products with real images):

```bash
npm run seed
```

Start the API:

```bash
npm start
```

API runs on `http://localhost:3000`.

### 2. Frontend

```bash
cd frontend
npm install
npx ng serve
```

App runs on `http://localhost:4200`.

## REST API

| Method | Route                      | Description                                    |
|--------|----------------------------|------------------------------------------------|
| GET    | `/api/products`            | List products (`?search=`, `?category=`, `?sort=`) |
| GET    | `/api/products/:id`        | Get one product                                |
| POST   | `/api/products`            | Create (multipart/form-data, optional `image`) |
| PUT    | `/api/products/:id`        | Update                                         |
| DELETE | `/api/products/:id`        | Delete                                         |
| GET    | `/api/categories`          | List categories                                |
| GET    | `/api/categories/:id`      | Get one category                               |
| POST   | `/api/categories`          | Create                                         |
| PUT    | `/api/categories/:id`      | Update                                         |
| DELETE | `/api/categories/:id`      | Delete (blocked if products use it)            |

Sort values: `price_asc`, `price_desc`, `newest`, `name`.

## Features

- Full CRUD for products and categories
- Search by product name (case-insensitive regex)
- Filter by category
- Sort by price / name / date
- Image upload (Multer, 5 MB limit, image MIME filter) **or** external image URL
- Form validation (Angular reactive forms + Mongoose schema validation)
- Confirmation dialogs (SweetAlert2)
- Responsive Bootstrap UI
- Error handling: 400 invalid id, 404 not found, 409 conflict on category in use

## License

ISC
