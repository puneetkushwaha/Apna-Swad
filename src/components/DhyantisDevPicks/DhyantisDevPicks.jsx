import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './DhyantisDevPicks.css';

const DhyantisDevPicks = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPicks = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        // Fetch top 3 best sellers
        const res = await axios.get(`${apiUrl}/products?isBestSeller=true&limit=3`);
        setProducts(res.data);
      } catch (err) {
        console.error('Error fetching dev picks:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPicks();
  }, []);

  if (loading) return null;
  if (products.length === 0) return null;

  return (
    <section className="dhyantis-dev-picks-section">
      <div className="dev-picks-container">
        <div className="section-header reveal">
          <h2 className="brand-font">Dhyanti's <span className="title-accent">Fav Picks 🍷</span></h2>
          <p className="subtitle">Handpicked Premium Favourites Just For You</p>
        </div>

        <div className="picks-grid">
          {products.map((product, index) => (
            <div key={product._id} className="dev-pick-frame reveal" style={{ transitionDelay: `${index * 0.1}s` }}>
              <div className="pick-badge">Must Have</div>
              <div className="pick-image-container">
                <img src={product.images[0]} alt={product.name} />
              </div>
              <div className="pick-info">
                <h3 className="pick-name">{product.name}</h3>
                <p className="pick-price">Rs. {product.price}.00</p>
                <Link to={`/product/${product._id}`} className="pick-action-btn">
                  View Detail
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DhyantisDevPicks;
