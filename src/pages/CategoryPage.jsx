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
        const currentCat = catRes.data.find(c => c.slug.toLowerCase() === slug.toLowerCase());
        
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
      <div className="product-grid-wrapper">
        {products.length > 0 ? (
          <div className="product-grid">
            {products.map(p => <ProductCard key={p._id} product={p} />)}
          </div>
        ) : (
          <div className="coming-soon-container reveal">
            <div className="coming-soon-badge">Coming Soon to Your Doorstep</div>
            <h2 className="brand-font">Something Delicious is Simmering</h2>
            <p className="quote">"Sabar ka phal meetha hota hai, aur hamara naya swad usse bhi behter hoga."</p>
            <p className="description">
              Our heritage experts are currently handcrafting the perfect recipes for our <strong>{category?.name || slug}</strong> collection. 
              We don't believe in industrial rush—each batch is made with love, zero preservatives, and pure local ingredients.
            </p>
            <div className="notify-box">
              <p>Want to be the first to know when it's ready?</p>
              <button className="btn btn-outline">Notify Me</button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .coming-soon-container {
          text-align: center;
          padding: 80px 20px;
          background: var(--white);
          border-radius: 40px;
          border: var(--border-subtle);
          max-width: 800px;
          margin: 40px auto;
        }
        .coming-soon-badge {
          display: inline-block;
          background: rgba(255, 153, 51, 0.1);
          color: var(--secondary);
          padding: 8px 20px;
          border-radius: 40px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-size: 0.8rem;
          margin-bottom: 25px;
        }
        .coming-soon-container h2 {
          font-size: 3rem;
          margin-bottom: 20px;
          color: var(--text-main);
        }
        .quote {
          font-style: italic;
          color: var(--secondary);
          font-size: 1.2rem;
          margin-bottom: 30px;
          font-family: var(--font-serif);
        }
        .description {
          color: var(--text-muted);
          font-size: 1.1rem;
          line-height: 1.8;
          max-width: 600px;
          margin: 0 auto 40px;
        }
        .notify-box {
          padding-top: 30px;
          border-top: 1px solid rgba(74, 44, 42, 0.05);
        }
        .notify-box p {
          margin-bottom: 20px;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};

export default CategoryPage;
