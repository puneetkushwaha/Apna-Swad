import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './CategoryTicker.css';

const CategoryTicker = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'import.meta.env.VITE_API_URL';
        const res = await axios.get(`${apiUrl}/categories`);
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
