const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Mock Database of Products
const products = [
  { id: 1, name: 'Wireless Headphones', price: 199, image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Smart Watch', price: 299, image: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Gaming Laptop', price: 1299, image: 'https://via.placeholder.com/150' },
  { id: 4, name: 'Mechanical Keyboard', price: 89, image: 'https://via.placeholder.com/150' },
];

// Check if server is running
app.get('/', (req, res) => {
  res.send('Backend server is running successfully! Go to /api/products to see data.');
});

// API Endpoint to get products
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});