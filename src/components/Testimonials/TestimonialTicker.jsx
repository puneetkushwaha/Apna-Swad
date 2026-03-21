import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import './TestimonialTicker.css';

const TestimonialTicker = () => {
  const [reviews, setReviews] = useState([]);

  

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await api.get('/reviews');
        setReviews(res.data.filter(r => r.type === 'text' && r.active));
      } catch (err) {
        console.error('Error fetching reviews:', err);
      }
    };
    fetchReviews();
  }, []);

  const line1 = reviews.slice(0, Math.ceil(reviews.length / 2));
  const line2 = reviews.slice(Math.ceil(reviews.length / 2));

  const TickerLine = ({ items, direction }) => (
    <div className={`testimonial-ticker-line ${direction}`}>
      <div className="testimonial-track">
        {[...items, ...items, ...items].map((item, index) => (
          <div key={`${item._id}-${index}`} className="testimonial-card">
            <img src={item.profileIcon || '/logo.png'} alt={item.name} className="user-icon" />
            <div className="testimonial-content">
              <p className="user-text">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="testimonials-section">
      <div className="section-header container">
        <h2 className="brand-font">Our customers <span>love</span> our snacks</h2>
      </div>
      <div className="tickers-wrapper">
        <TickerLine items={line1} direction="ltr" />
        <TickerLine items={line2} direction="rtl" />
      </div>
    </div>
  );
};

export default TestimonialTicker;
