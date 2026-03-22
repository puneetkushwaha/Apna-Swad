import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import ProductCard from '../ProductCard/ProductCard';
import Skeleton from '../Loader/Skeleton';
import './FeaturedProducts.css';

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        
        const res = await api.get('/products?sortBy=salesCount&limit=6');
        if (res.data && res.data.length > 0) {
          setFeaturedProducts(res.data);
        } else {
          // Fallback demo data if DB is empty
          setFeaturedProducts(Array(6).fill({
            _id: 'demo',
            name: 'Artisanal Snack',
            price: 250,
            image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bb087?q=80&w=2070&auto=format&fit=crop',
            category: { name: 'Handcrafted' },
            weight: '250g'
          }));
        }
      } catch (err) {
        console.error('Error fetching featured products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <section className="featured-products-section">
      <div className="container">
        <div className="section-header text-center">
          <p className="subtitle">Trending Now</p>
          <h2 className="brand-font">Featured <span className="title-accent">This Week</span></h2>
        </div>
        
        <div className="product-grid">
          {loading ? (
            Array(6).fill(0).map((_, i) => (
              <Skeleton key={i} type="card" />
            ))
          ) : (
            featuredProducts.map((product, index) => (
              <ProductCard key={product._id === 'demo' ? `demo-${index}` : product._id} product={product} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
