import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HeroBanner.css';

const HeroBanner = () => {
  const [banners, setBanners] = useState([]);
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        const res = await axios.get(`${apiUrl}/banners`);
        setBanners(res.data);
      } catch (err) {
        console.error('Error fetching banners:', err);
      }
    };
    fetchBanners();
  }, []);

  useEffect(() => {
    if (banners.length > 0 && !isPaused) {
      const timer = setInterval(() => {
        setCurrent((prev) => (prev + 1) % banners.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [banners, isPaused]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % banners.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + banners.length) % banners.length);

  if (banners.length === 0) return (
    <div className="hero-banner-placeholder" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.4), rgba(255,255,255,0.2)), url('/premium_besan_ladoo_hero_1773502060104.png')` }}>
      <div className="container">
        <h1 className="banner-title">Authentic Flavors, <br /><span className="accent">Modern Tradition.</span></h1>
        <p>Handcrafted Indian snacks delivered to your doorstep.</p>
      </div>
    </div>
  );

  return (
    <div className="hero-banner">
      <div
        className="banner-track"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {banners.map((banner, index) => (
          <div
            key={banner._id}
            className={`banner-slide ${index === current ? 'active' : ''}`}
            style={{ backgroundImage: `url(${banner.imageUrl})` }}
          />
        ))}
      </div>

      <div className="banner-controls-bar">
        <div className="controls-main">
          <button className="nav-arrow" onClick={prevSlide}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>

          <div className="banner-dots">
            {banners.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === current ? 'active' : ''}`}
                onClick={() => setCurrent(index)}
              ></span>
            ))}
          </div>

          <button className="nav-arrow" onClick={nextSlide}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>

        <button className="pause-toggle" onClick={() => setIsPaused(!isPaused)}>
          {isPaused ? (
            <svg viewBox="0 0 24 24" fill="currentColor"><rect x="5" y="3" width="4" height="18"></rect><rect x="15" y="3" width="4" height="18"></rect></svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default HeroBanner;
