import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard/ProductCard';
import './SearchResultsPage.css';

const SearchResultsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      setLoading(true);
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        const res = await axios.get(`${apiUrl}/products`);
        // Basic frontend filter for now, or backend search if implemented
        const filtered = res.data.filter(p => 
          p.name.toLowerCase().includes(query.toLowerCase()) || 
          p.description?.toLowerCase().includes(query.toLowerCase())
        );
        setProducts(filtered);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [query]);

  return (
    <div className="search-results-page container section">
      <div className="search-header">
        <h1 className="brand-font">Search Results for: <span>"{query}"</span></h1>
        <p>Found {products.length} {products.length === 1 ? 'snack' : 'snacks'} matching your craving</p>
      </div>

      {loading ? (
        <div className="loading">Searching...</div>
      ) : (
        <div className="product-grid">
          {products.length > 0 ? (
            products.map(p => <ProductCard key={p._id} product={p} />)
          ) : (
            <div className="no-results text-center">
              <p>No snacks found. Try searching for something else like "Ladoo" or "Chakli".</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
