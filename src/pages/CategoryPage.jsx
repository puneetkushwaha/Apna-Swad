import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard/ProductCard';

const CategoryPage = () => {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const fetchCategoryAndProducts = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        const catRes = await axios.get(`${apiUrl}/categories`);
        const currentCat = catRes.data.find(c => c.slug === slug);
        
        if (currentCat) {
          setCategory(currentCat);
          const prodRes = await axios.get(`${apiUrl}/products?category=${currentCat._id}`);
          setProducts(prodRes.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategoryAndProducts();
  }, [slug]);

  return (
    <div className="category-page container section">
      {category && (
        <div className="section-header">
          <h2 className="brand-font">{category.name}</h2>
          <p>{category.description}</p>
        </div>
      )}
      <div className="product-grid">
        {products.length > 0 ? (
          products.map(p => <ProductCard key={p._id} product={p} />)
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
