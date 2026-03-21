import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import ProductCard from '../ProductCard/ProductCard';
import './NewArrivals.css';

const NewArrivals = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isDemo, setIsDemo] = useState(false);
  const limit = 6;

  const fetchNewArrivals = async (isLoadMore = false) => {
    try {
      setLoading(true);
      const skip = isLoadMore ? newArrivals.length : 0;
      
      // Fetch limit + 1 to check if there are more
      const res = await api.get(`/products?sortBy=newest&limit=${limit + 1}&skip=${skip}`);
      
      if (res.data && res.data.length > 0) {
        setIsDemo(false);
        const hasMoreItems = res.data.length > limit;
        const displayData = hasMoreItems ? res.data.slice(0, limit) : res.data;
        
        setHasMore(hasMoreItems);
        
        if (isLoadMore) {
          setNewArrivals(prev => [...prev, ...displayData]);
        } else {
          setNewArrivals(displayData);
        }
      } else if (!isLoadMore) {
        // Fallback demo data if DB is empty
        setIsDemo(true);
        setHasMore(false);
        setNewArrivals(Array(6).fill({
          _id: 'demo-new',
          name: 'Latest Handcrafted Joy',
          price: 199,
          image: 'https://images.unsplash.com/photo-1547032175-7fc8c7bd15b3?q=80&w=2070&auto=format&fit=crop',
          category: { name: 'New Arrival' },
          weight: '100g'
        }));
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error('Error fetching new arrivals:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewArrivals();
  }, []);

  return (
    <section className="new-arrivals-section">
      <div className="container">
        <div className="section-header text-center">
          <p className="subtitle">Fresh From the Hive</p>
          <h2 className="brand-font">New <span className="title-accent">Arrivals</span></h2>
        </div>
        
        <div className="product-grid">
          {newArrivals.map((product, index) => (
            <ProductCard key={product._id === 'demo-new' ? `demo-new-${index}` : product._id} product={product} />
          ))}
        </div>

        {hasMore && newArrivals.length >= limit && !isDemo && (
          <div className="view-all-container">
            <button 
              className="btn btn-outline view-all-btn" 
              onClick={() => fetchNewArrivals(true)}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'View All New Arrivals'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewArrivals;
