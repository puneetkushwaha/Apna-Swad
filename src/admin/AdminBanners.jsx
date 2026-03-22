import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import Skeleton from '../components/Loader/Skeleton';

const AdminBanners = () => {
  const [banners, setBanners] = useState([]);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const res = await api.get('/banners');
      setBanners(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddBanner = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('image', image);
    formData.append('title', title);

    try {
      await api.post('/banners', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setTitle('');
      setImage(null);
      fetchBanners();
    } catch (err) {
      alert('Error adding banner');
    } finally {
      setLoading(false);
    }
  };

  const deleteBanner = async (id) => {
    if (!window.confirm('Remove this banner?')) return;
    try {
      await api.delete(`/banners/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchBanners();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="admin-banners-page section">
      <div className="container">
        <div className="admin-header-flex">
          <div>
            <h1 className="premium-title">Visual Curation</h1>
            <p className="premium-subtitle">Manage the elite brand presence of your heritage snacks.</p>
          </div>
        </div>

        <div className="admin-form-container">
          <h2 className="admin-form-title">Launch New Banner</h2>
          <form onSubmit={handleAddBanner}>
            <div className="form-grid-premium">
              <div className="admin-input-group">
                <label>Banner context</label>
                <input className="admin-input-premium" placeholder="e.g., Diwali Heritage Collection" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>
              <div className="admin-input-group">
                <label>Hero Image</label>
                <input type="file" onChange={(e) => setImage(e.target.files[0])} required className="admin-input-premium" />
              </div>
            </div>
            <div style={{ marginTop: '30px' }}>
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? <Skeleton type="text" style={{ width: '100px', background: 'rgba(255,255,255,0.2)', margin: 0 }} /> : 'Deploy Banner'}
              </button>
            </div>
          </form>
        </div>

        <div className="admin-list-premium">
          <h2 className="admin-form-title">Active Showcases</h2>
          <div className="banner-grid-admin">
            {loading && banners.length === 0 ? (
              Array(2).fill(0).map((_, i) => (
                <div key={i} className="banner-card-premium">
                  <Skeleton type="rect" style={{ width: '100%', height: '150px', borderRadius: '12px' }} />
                  <div className="banner-meta">
                    <Skeleton type="text" style={{ width: '150px' }} />
                    <Skeleton type="text" style={{ width: '100px', height: '30px' }} />
                  </div>
                </div>
              ))
            ) : (
              banners.map(banner => (
                <div key={banner._id} className="banner-card-premium">
                  <img src={banner.imageUrl} alt={banner.title} className="banner-img-preview" />
                  <div className="banner-meta">
                    <h4 style={{ margin: '0' }}>{banner.title}</h4>
                    <button className="btn-outline btn-small btn-delete" onClick={() => deleteBanner(banner._id)}>Decommission</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBanners;
