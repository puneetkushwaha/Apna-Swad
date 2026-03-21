import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './CategoryGrid.css';

const CategoryGrid = () => {
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

  return (
    <section className="categories" id="categories">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Shop by Category</h2>
          <p className="section-subtitle">Discover our wide range of handcrafted delicacies</p>
        </div>
        
        <div className="category-grid">
          {categories.map(category => (
            <Link key={category._id} to={`/category/${category.slug}`} className="category-card">
              <div className="category-image">
                <img src={category.image} alt={category.name} />
                <div className="category-overlay">
                  {category.description && <span className="category-tag">{category.description}</span>}
                  <h3 className="category-name">{category.name}</h3>
                  <span className="btn-text">View All →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
