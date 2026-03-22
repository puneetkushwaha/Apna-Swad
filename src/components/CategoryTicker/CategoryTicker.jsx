import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/api';
import './CategoryTicker.css';

const CategoryTicker = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        
        const res = await api.get('/categories');
        setCategories(res.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCategories();
  }, []);

  // Predefined categories for Coming Soon anticipation
  const comingSoonCats = [
    { _id: 'cs1', name: 'Handcrafted Namkeen', slug: 'namkeen' },
    { _id: 'cs2', name: 'Traditional Sweets', slug: 'sweets' },
    { _id: 'cs3', name: 'Festive Combos', slug: 'festive-combos' }
  ];

  // Combine fetched categories with coming soon ones, ensuring no duplicates if they are added to DB later
  const uniqueCategories = [...categories];
  comingSoonCats.forEach(cs => {
    if (!categories.find(c => c.slug.toLowerCase() === cs.slug.toLowerCase())) {
      uniqueCategories.push(cs);
    }
  });

  // Double the categories for seamless loop
  const displayCategories = [...uniqueCategories, ...uniqueCategories, ...uniqueCategories];

  return (
    <div className="category-ticker-section">
      <div className="ticker-container">
        <div className="ticker-track">
          {displayCategories.map((cat, index) => (
            <Link 
              key={`${cat._id}-${index}`} 
              to={`/category/${cat.slug}`} 
              className="ticker-item brand-font"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryTicker;
