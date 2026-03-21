import React from 'react';
import './DhyantisStore.css';

const DhyantisStore = () => {
  const collections = [
    {
      id: 1,
      title: "Kitchen Essentials",
      subtitle: "Daily Staples & Masalas",
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2070&auto=format&fit=crop",
      link: "/category/essentials"
    },
    {
      id: 2,
      title: "Regional Picks",
      subtitle: "Authentic Native Flavors",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop",
      link: "/category/regional"
    },
    {
      id: 3,
      title: "Sweet Delights",
      subtitle: "Traditional Handcrafted Sweets",
      image: "https://images.unsplash.com/photo-1582716401301-b2407dc7563d?q=80&w=2075&auto=format&fit=crop",
      link: "/category/sweets"
    },
    {
      id: 4,
      title: "Gifting Specials",
      subtitle: "Curated Boxes for Love",
      image: "https://images.unsplash.com/photo-1549465220-1d8c9d9c4701?q=80&w=2070&auto=format&fit=crop",
      link: "/category/gifting"
    }
  ];

  return (
    <section className="dhyantis-store-section">
      <div className="container">
        <div className="section-header text-center reveal">
          <h2 className="brand-font">Dhyanti's <span className="title-accent">Store 🎀</span></h2>
          <p className="subtitle">From Kitchen Staples to Sweet Treats & Gifting Picks</p>
        </div>

        <div className="collections-grid">
          {collections.map(item => (
            <div key={item.id} className="collection-card reveal">
              <div className="card-header">
                <span className="card-tag">{item.title}</span>
              </div>
              <div className="card-body">
                <div className="image-container">
                  <img src={item.image} alt={item.title} />
                </div>
              </div>
              <div className="card-footer">
                <a href={item.link} className="explore-link">Explore Collection →</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DhyantisStore;
