import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../ProductCard/ProductCard';
import './BestSellers.css';

const BestSellers = () => {
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const limit = 6;

  const fetchBestSellers = async (isLoadMore = false) => {
    try {
      setLoading(true);
      const skip = isLoadMore ? bestSellers.length : 0;
      const apiUrl = import.meta.env.VITE_API_URL || 'import.meta.env.VITE_API_URL';
      // Fetch limit + 1 to check if there are more
      const res = await axios.get(`${apiUrl}/products?isBestSeller=true&limit=${limit + 1}&skip=${skip}`);
      
      const hasMoreItems = res.data.length > limit;
      const displayData = hasMoreItems ? res.data.slice(0, limit) : res.data;

      setHasMore(hasMoreItems);

      if (isLoadMore) {
        setBestSellers(prev => [...prev, ...displayData]);
      } else {
        setBestSellers(displayData);
      }
    } catch (err) {
      console.error('Error fetching best sellers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBestSellers();
  }, []);

  return (
    <section className="best-sellers-section">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="brand-font">Our <span className="title-accent">Best Sellers</span></h2>
          <p>The snacks that our customers love the most</p>
        </div>
        
        <div className="product-grid">
          {bestSellers.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {hasMore && bestSellers.length >= limit && (
          <div className="view-all-container">
            <button 
              className="btn btn-outline view-all-btn" 
              onClick={() => fetchBestSellers(true)}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'View All Products'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BestSellers;
