import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import ProductCard from '../ProductCard/ProductCard';
import Skeleton from '../Loader/Skeleton';
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
      
      // Fetch limit + 1 to check if there are more
      const res = await api.get(`/products?isBestSeller=true&limit=${limit + 1}&skip=${skip}`);
      
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
          {bestSellers.length > 0 ? (
            bestSellers.map(product => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            loading && Array(6).fill(0).map((_, i) => (
              <Skeleton key={i} type="card" />
            ))
          )}
        </div>

        {hasMore && (bestSellers.length >= limit || loading) && (
          <div className="view-all-container">
            <button 
              className="btn btn-outline view-all-btn" 
              onClick={() => fetchBestSellers(true)}
              disabled={loading}
            >
              {loading ? <Skeleton type="text" style={{ width: '80px', margin: 0 }} /> : 'View All Products'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BestSellers;
