import React, { useEffect, useState } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);

  // Fetch products from the backend when the component loads
  useEffect(() => {
    fetch('http://localhost:3001/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => {
        console.error("Error fetching products:", err);
        setError("Backend server is not running. Please start 'node index.js' in a separate terminal.");
      });
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>My E-Commerce Store</h1>
        <div>Cart: {cart.length} items</div>
      </header>

      {error && <div style={{ color: 'red', textAlign: 'center', padding: '20px', border: '1px solid red', borderRadius: '8px', marginBottom: '20px' }}>{error}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {products.map(product => (
          <div key={product.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', textAlign: 'center' }}>
            <img 
              src={product.image} 
              alt={product.name} 
              style={{ width: '100%', height: '150px', objectFit: 'cover', marginBottom: '10px', backgroundColor: '#eee' }} 
            />
            <h3 style={{ fontSize: '1.1rem', margin: '10px 0' }}>{product.name}</h3>
            <p style={{ fontWeight: 'bold', color: '#333' }}>${product.price}</p>
            <button onClick={() => addToCart(product)} style={{ padding: '8px 16px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;