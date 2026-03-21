import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';
import ProductCard from '../components/ProductCard/ProductCard';

const CategoryPage = () => {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const fetchCategoryAndProducts = async () => {
      try {
        
        const catRes = await api.get('/categories');
        const currentCat = catRes.data.find(c => c.slug === slug);
        
        if (currentCat) {
          setCategory(currentCat);
          const prodRes = await api.get(`/products?category=${currentCat._id}`);
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
