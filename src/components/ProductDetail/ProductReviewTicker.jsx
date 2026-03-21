import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { Star } from 'lucide-react';
import './ProductReviewTicker.css';

const DUMMY_REVIEWS = [
  { _id: 'd1', user: { name: 'Rahul S.' }, rating: 5, comment: "Authentic taste! Reminded me of my childhood visits to the village.", createdAt: new Date() },
  { _id: 'd2', user: { name: 'Priya M.' }, rating: 5, comment: "Fresh and crisp. The packaging is premium too.", createdAt: new Date() },
  { _id: 'd3', user: { name: 'Amit K.' }, rating: 4, comment: "Really liked the masala mix. Not too oily.", createdAt: new Date() },
  { _id: 'd4', user: { name: 'Sneha J.' }, rating: 5, comment: "Best snacks I've ordered online. Will buy again!", createdAt: new Date() },
  { _id: 'd5', user: { name: 'Vikram R.' }, rating: 5, comment: "The shelf life is good and it tastes very fresh.", createdAt: new Date() },
  { _id: 'd6', user: { name: 'Anjali D.' }, rating: 4, comment: "Great quality and heritage flavor. Highly recommend.", createdAt: new Date() }
];

const ProductReviewTicker = ({ productId }) => {
  const [realReviews, setRealReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        
        const res = await api.get(`/product-reviews/${productId}`);
        setRealReviews(res.data);
      } catch (err) {
        console.error('Error fetching product reviews:', err);
      } finally {
        setLoading(false);
      }
    };
    if (productId) fetchReviews();
  }, [productId]);

  if (loading) return <div className="ticker-loading">Loading reviews...</div>;

  // Logic to mix real and dummy reviews
  // Goal: Keep a total of 6 reviews. Slowly replace dummy with real.
  const MAX_DISPLAY = 6;
  let displayReviews = [...realReviews];
  
  if (realReviews.length < MAX_DISPLAY) {
    const dummiesNeeded = MAX_DISPLAY - realReviews.length;
    displayReviews = [...realReviews, ...DUMMY_REVIEWS.slice(0, dummiesNeeded)];
  } else {
    // If we have enough real ones, just show real ones
    displayReviews = realReviews;
  }

  // Double/Triple for seamless loop
  const scrollReviews = [...displayReviews, ...displayReviews, ...displayReviews];

  return (
    <div className="product-review-ticker-wrapper">
      <div className="ticker-line ltr">
        <div className="ticker-track">
          {scrollReviews.map((rev, idx) => (
            <div key={`${rev._id}-${idx}`} className="testimonial-card">
              <img 
                src={rev.user?.avatar || '/logo.png'} 
                alt={rev.user?.name} 
                className="user-icon" 
              />
              <div className="testimonial-content">
                <p className="user-text">
                  <span className="reviewer-name-mini">{rev.user?.name}: </span>
                  {rev.comment}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductReviewTicker;
