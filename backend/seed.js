require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Category = require('./models/Category');
const Product = require('./models/Product');

const categories = [
  { name: 'Electronics', description: 'Phones, laptops, headphones and gadgets' },
  { name: 'Clothing', description: 'Apparel and accessories for all seasons' },
  { name: 'Home & Kitchen', description: 'Furniture, appliances and decor' },
  { name: 'Books', description: 'Fiction, non-fiction and reference books' },
  { name: 'Sports', description: 'Sports equipment and outdoor gear' },
  { name: 'Beauty', description: 'Skincare, makeup and personal care' },
];

const productsByCat = {
  Electronics: [
    { name: 'Wireless Headphones', price: 129.99, stock: 25, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80', description: 'Over-ear bluetooth headphones with noise cancellation.' },
    { name: 'Smartphone X12', price: 799.0, stock: 15, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80', description: '6.5" OLED display, triple camera, 256GB storage.' },
    { name: '13" Laptop Pro', price: 1299.0, stock: 8, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80', description: 'Lightweight ultrabook with 16GB RAM and SSD.' },
    { name: 'Smartwatch S2', price: 199.5, stock: 40, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80', description: 'Fitness tracking and notifications on your wrist.' },
  ],
  Clothing: [
    { name: 'Classic White T-Shirt', price: 19.9, stock: 100, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80', description: '100% cotton crew-neck t-shirt.' },
    { name: 'Denim Jacket', price: 79.0, stock: 30, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80', description: 'Vintage blue denim jacket, regular fit.' },
    { name: 'Running Sneakers', price: 89.99, stock: 50, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80', description: 'Cushioned running shoes for daily training.' },
  ],
  'Home & Kitchen': [
    { name: 'Espresso Machine', price: 249.0, stock: 12, image: 'https://images.unsplash.com/photo-1572119865084-43c285814d63?w=600&q=80', description: '15-bar pressure espresso machine for home baristas.' },
    { name: 'Cast Iron Skillet', price: 39.5, stock: 60, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80', description: 'Pre-seasoned 12" cast iron pan.' },
    { name: 'Modern Floor Lamp', price: 119.0, stock: 18, image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&q=80', description: 'Minimalist black metal floor lamp.' },
  ],
  Books: [
    { name: 'The Pragmatic Programmer', price: 34.99, stock: 45, image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80', description: 'Classic book on software craftsmanship.' },
    { name: 'Atomic Habits', price: 18.5, stock: 70, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&q=80', description: 'Build good habits, break bad ones.' },
  ],
  Sports: [
    { name: 'Yoga Mat', price: 29.99, stock: 80, image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80', description: 'Non-slip 6mm yoga mat with carrying strap.' },
    { name: 'Mountain Bike', price: 549.0, stock: 6, image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&q=80', description: '21-speed mountain bike with disc brakes.' },
    { name: 'Soccer Ball', price: 24.5, stock: 90, image: 'https://images.unsplash.com/photo-1614632537190-23e4146777db?w=600&q=80', description: 'Official size 5 match-quality ball.' },
  ],
  Beauty: [
    { name: 'Moisturizing Cream', price: 22.0, stock: 55, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80', description: 'Daily face moisturizer for all skin types.' },
    { name: 'Lipstick Set', price: 35.0, stock: 40, image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&q=80', description: 'Set of 5 long-lasting matte lipsticks.' },
  ],
};

(async () => {
  await connectDB();
  await Promise.all([Product.deleteMany({}), Category.deleteMany({})]);
  console.log('Cleared existing data');

  const created = await Category.insertMany(categories);
  const byName = Object.fromEntries(created.map((c) => [c.name, c._id]));
  console.log(`Inserted ${created.length} categories`);

  const products = [];
  for (const [catName, list] of Object.entries(productsByCat)) {
    for (const p of list) products.push({ ...p, category: byName[catName] });
  }
  await Product.insertMany(products);
  console.log(`Inserted ${products.length} products`);

  await mongoose.disconnect();
  console.log('Done.');
})();
