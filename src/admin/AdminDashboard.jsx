import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Admin.css';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const token = localStorage.getItem('token');
  

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [prodRes, catRes] = await Promise.all([
        api.get('/products'),
        api.get('/categories')
      ]);
      setProducts(prodRes.data);
      setCategories(catRes.data);
    } catch (err) {
      console.error('Error fetching data', err);
    }
  };

  // fetchData function ends here
  
  return (
    <div className="admin-dashboard-page section">
      <div className="container">
        <div className="admin-header-flex">
          <div>
            <h1 className="premium-title">Store Operations</h1>
            <p className="premium-subtitle">Manage your elite snack heritage from one central hub.</p>
          </div>
        </div>
        <div className="admin-grid">
          <div className="admin-card" onClick={() => navigate('/admin/products')}>
            <span className="card-icon">📦</span>
            <h3>Products</h3>
            <p>Inventory & Collections</p>
          </div>
          <div className="admin-card" onClick={() => navigate('/admin/categories')}>
            <span className="card-icon">📁</span>
            <h3>Architecture</h3>
            <p>Menu Categories</p>
          </div>
          <div className="admin-card" onClick={() => navigate('/admin/banners')}>
            <span className="card-icon">🖼️</span>
            <h3>Showcases</h3>
            <p>Hero Banners</p>
          </div>
          <div className="admin-card" onClick={() => navigate('/admin/reviews')}>
            <span className="card-icon">💬</span>
            <h3>Chronicles</h3>
            <p>Patron Stories</p>
          </div>
          <div className="admin-card" onClick={() => navigate('/admin/announcements')}>
            <span className="card-icon">📣</span>
            <h3>Bulletins</h3>
            <p>Sale Tickers</p>
          </div>
          <div className="admin-card" onClick={() => navigate('/admin/orders')}>
            <span className="card-icon">🚚</span>
            <h3>Logistics</h3>
            <p>Order Tracking</p>
          </div>
          <div className="admin-card" onClick={() => navigate('/admin/chat')}>
            <span className="card-icon">✉️</span>
            <h3>Concierge</h3>
            <p>Client Chat</p>
          </div>
          <div className="admin-card" onClick={() => navigate('/admin/bulk-email')}>
            <span className="card-icon">📧</span>
            <h3>Broadcaster</h3>
            <p>Bulk Email Tool</p>
          </div>
          <div className="admin-card" onClick={() => navigate('/admin/promos')}>
            <span className="card-icon">🏷️</span>
            <h3>Offer Lab</h3>
            <p>Promos & Coupons</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
