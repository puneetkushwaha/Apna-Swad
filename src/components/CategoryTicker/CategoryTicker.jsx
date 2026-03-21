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

  // Double the categories for seamless loop
  const displayCategories = [...categories, ...categories, ...categories];

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
