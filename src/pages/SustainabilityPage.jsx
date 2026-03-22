import React from 'react';
import SEO from '../components/SEO/SEO';

const SustainabilityPage = () => {
  return (
    <div className="sustainability-page container section">
      <SEO 
        title="Sustainability | Apna Swad"
        description="Our commitment to ethical sourcing, healthy ingredients, and zero palm oil."
        url="/sustainability"
      />
      
      <div className="section-header">
        <h1 className="brand-font">Our Commitment</h1>
        <p>At Apna Swad, tradition and health go hand in hand. We believe that true heritage must be sustainable for both our customers and our planet.</p>
      </div>

      <div className="sustainability-content">
        <div className="feature-grid">
          <div className="feature-card reveal">
            <div className="icon-wrapper">🌱</div>
            <h3>Zero Palm Oil</h3>
            <p>We've completely eliminated palm oil from all our recipes, replacing it with healthier, traditional alternatives like cold-pressed oils. This is better for your heart and local biodiversity.</p>
          </div>
          <div className="feature-card reveal">
            <div className="icon-wrapper">🚫</div>
            <h3>No Preservatives</h3>
            <p>Our snacks are made just like they were generations ago. We use natural preservation methods like slow-cooking and traditional spices, ensuring you get only the pure, shuddh swad.</p>
          </div>
          <div className="feature-card reveal">
            <div className="icon-wrapper">👩‍🍳</div>
            <h3>Handcrafted by Local Artisans</h3>
            <p>By keeping our process manual and traditional, we support local snack makers and preserve artisanal skills that are being lost to industrial automation.</p>
          </div>
          <div className="feature-card reveal">
            <div className="icon-wrapper">📦</div>
            <h3>Eco-Friendly Thinking</h3>
            <p>We are constantly evolving our packaging to be more sustainable while ensuring our products remain fresh and crunchy until they reach you.</p>
          </div>
        </div>

        <div className="story-block reveal">
          <div className="text">
            <h2>Heritage is Worth Preserving</h2>
            <p>We started Apna Swad because we saw the authentic taste of Indian snacks disappearing under a layer of refined oils and chemicals. For us, sustainability isn't just a buzzword; it's about making sure the flavors our grandparents loved are still available for our grandchildren to enjoy.</p>
          </div>
          <div className="image">
            <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" alt="Sustainable ingredients" />
          </div>
        </div>
      </div>

      <style jsx>{`
        .feature-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
          margin-bottom: 80px;
        }
        .feature-card {
          padding: 40px;
          background: var(--cream);
          border-radius: 20px;
          text-align: center;
          transition: var(--transition);
        }
        .feature-card:hover {
          transform: translateY(-10px);
          background: var(--white);
          box-shadow: var(--shadow-md);
        }
        .icon-wrapper {
          font-size: 3rem;
          margin-bottom: 25px;
        }
        .feature-card h3 {
          margin-bottom: 15px;
          font-size: 1.5rem;
          color: var(--text-main);
        }
        .feature-card p {
          color: var(--text-muted);
          line-height: 1.6;
        }

        .story-block {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
          padding: 80px;
          background: var(--text-main);
          color: var(--white);
          border-radius: 40px;
        }
        .story-block h2 {
          font-size: 3rem;
          margin-bottom: 30px;
        }
        .story-block p {
          font-size: 1.2rem;
          line-height: 1.8;
          opacity: 0.9;
        }
        .story-block .image img {
          border-radius: 20px;
          width: 100%;
        }

        @media (max-width: 1024px) {
          .story-block {
            grid-template-columns: 1fr;
            padding: 40px;
            text-align: center;
          }
          .story-block h2 {
            font-size: 2.2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default SustainabilityPage;
