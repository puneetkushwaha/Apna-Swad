import React from 'react';
import './Availability.css';

const Availability = () => {
  const platforms = [
    { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
    { name: 'Flipkart', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Flipkart_logo.png' },
    { name: 'BigBasket', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Bigbasket_logo.png' },
    { name: 'Swiggy', logo: 'https://upload.wikimedia.org/wikipedia/en/1/12/Swiggy_logo.svg' }
  ];

  return (
    <div className="availability-section">
      <div className="container">
        <h2 className="brand-font text-center">Available <span className="accent">Everywhere</span></h2>
        <div className="platforms-grid">
          {platforms.map((p, i) => (
            <div key={i} className="platform-card glass">
              <img src={p.logo} alt={p.name} />
              <span>{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Availability;
