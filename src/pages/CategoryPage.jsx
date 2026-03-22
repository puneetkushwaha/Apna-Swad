import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';
import ProductCard from '../components/ProductCard/ProductCard';
import Skeleton from '../components/Loader/Skeleton';
import SEO from '../components/SEO/SEO';

const CategoryPage = () => {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryAndProducts = async () => {
      try {
        setLoading(true);
        const catRes = await api.get('/categories');
        const currentCat = catRes.data.find(c => c.slug === slug);
        
        if (currentCat) {
          setCategory(currentCat);
          const prodRes = await api.get(`/products?category=${currentCat._id}`);
          setProducts(prodRes.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryAndProducts();
  }, [slug]);

  if (loading) return (
    <div className="category-page container section">
      <div className="section-header">
        <Skeleton type="title" style={{ width: '200px', margin: '0 auto 10px' }} />
        <Skeleton type="text" style={{ width: '400px', margin: '0 auto' }} />
      </div>
      <div className="product-grid">
        {Array(8).fill(0).map((_, i) => <Skeleton key={i} type="card" />)}
      </div>
    </div>
  );

  return (
    <div className="category-page container section">
      <SEO 
        title={category?.name || 'Categories'}
        description={`Explore the finest collection of ${category?.name || 'traditional snacks'} at Apna Swad. Each item is crafted for a real shuddh swad (pure taste) experience.`}
        url={`/category/${slug}`}
      />
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
