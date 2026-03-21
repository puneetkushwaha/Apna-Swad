import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-overlay"></div>
      <div className="container hero-content">
        <div className="hero-text fade-in">
          <h1 className="hero-title">Authentic Flavors, <br /><span>Handcrafted for You</span></h1>
          <p className="hero-subtitle">
            Experience the true essence of traditional Indian snacks. 
            No palm oil, no preservatives – just the pure swad of home.
          </p>
          <div className="hero-btns">
            <button className="btn btn-primary">Shop Now</button>
            <button className="btn btn-outline">Explore Story</button>
          </div>
        </div>
      </div>
      <div className="hero-image-container">
        <img src="/hero.png" alt="Traditional Indian Snacks" className="hero-image" />
      </div>
    </section>
  );
};

export default Hero;
