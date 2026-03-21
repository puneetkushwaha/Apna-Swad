import React from 'react';
import { ShieldCheck, Heart, Leaf, Users } from 'lucide-react';
import './CoreValues.css';

const CoreValues = () => {
  const values = [
    { title: 'Sustainability', desc: 'Responsibly sourced ingredients and eco-friendly packaging.', icon: <Leaf size={24} /> },
    { title: 'Uncompromised Quality', desc: 'Premium ingredients with strict quality checks.', icon: <ShieldCheck size={24} /> },
    { title: 'Health First', desc: 'No artificial colors, flavors, or preservatives.', icon: <Heart size={24} /> },
    { title: 'Community Driven', desc: 'Supporting farmers and growing together.', icon: <Users size={24} /> }
  ];

  return (
    <div className="core-values-section">
      <div className="container">
        <h2 className="brand-font text-center">Our Core Values</h2>
        <p className="section-intro text-center">The principles that guide everything we create at Apna Swad.</p>
        <div className="values-grid">
          {values.map((v, i) => (
            <div key={i} className="value-card-premium shadow-hover">
              <div className="value-icon-wrapper">
                {v.icon}
              </div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoreValues;
