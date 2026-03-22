import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({ name: '', text: '', type: 'text' });
  const [profileIcon, setProfileIcon] = useState(null);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await api.get('/reviews');
      setReviews(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('text', formData.text);
    submitData.append('type', formData.type);
    if (profileIcon) submitData.append('profileIcon', profileIcon);
    if (video) submitData.append('video', video);

    try {
      await api.post('/reviews', submitData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data' 
        }
      });
      setFormData({ name: '', text: '', type: 'text' });
      setProfileIcon(null);
      setVideo(null);
      fetchReviews();
    } catch (err) {
      alert('Error adding review');
    } finally {
      setLoading(false);
    }
  };

  const deleteReview = async (id) => {
    if (!window.confirm('Delete this feedback?')) return;
    try {
      await api.delete(`/reviews/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchReviews();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="admin-reviews-page section">
      <div className="container">
        <div className="admin-header-flex">
          <div>
            <h1 className="premium-title">Heritage Echoes</h1>
            <p className="premium-subtitle">Curate the authentic stories and voices of our patrons.</p>
          </div>
        </div>

        <div className="admin-form-container">
          <h2 className="admin-form-title">Archive New Testimony</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-grid-premium">
              <div className="admin-input-group">
                <label>Patron Name</label>
                <input className="admin-input-premium" placeholder="e.g., Mrs. Sharma" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
              </div>
              <div className="admin-input-group">
                <label>Testimony Type</label>
                <select className="admin-input-premium" value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}>
                  <option value="text">Written Reflection</option>
                  <option value="video">Cinematic Review</option>
                </select>
              </div>
              {formData.type === 'text' && (
                <div className="admin-input-group">
                  <label>Portrait Icon</label>
                  <input type="file" onChange={(e) => setProfileIcon(e.target.files[0])} className="admin-input-premium" />
                </div>
              )}
              {formData.type === 'video' && (
                <div className="admin-input-group">
                  <label>Portrait Video</label>
                  <input type="file" accept="video/*" onChange={(e) => setVideo(e.target.files[0])} required className="admin-input-premium" />
                </div>
              )}
            </div>
            {formData.type === 'text' && (
              <div className="admin-input-group" style={{marginTop: '25px'}}>
                <label>patron Reflection</label>
                <textarea className="admin-input-premium" style={{minHeight: '120px'}} placeholder="The essence of their experience..." value={formData.text} onChange={(e) => setFormData({...formData, text: e.target.value})} required />
              </div>
            )}
            <div style={{marginTop: '30px'}}>
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'Archiving...' : 'Publish Testimony'}
              </button>
            </div>
          </form>
        </div>

        <div className="admin-list-premium">
          <h2 className="admin-form-title">Patron Chronicles</h2>
          <div className="admin-items-grid-premium">
            {reviews.map(review => (
              <div key={review._id} className="admin-item-premium">
                <div className="admin-item-info">
                  <span className="item-category-tag">{review.type === 'text' ? 'Written Reflection' : 'Cinematic Review'}</span>
                  <h4>{review.name}</h4>
                  {review.type === 'text' && <p style={{marginTop: '10px', fontStyle: 'italic', color: 'var(--admin-text-light)'}}>"{review.text}"</p>}
                  {review.type === 'video' && <div style={{marginTop: '15px'}}><video src={review.videoUrl} width="100%" controls style={{borderRadius: '12px', maxHeight: '200px', objectFit: 'cover'}} /></div>}
                  <div className="admin-item-actions" style={{ marginTop: '20px' }}>
                    <button onClick={() => deleteReview(review._id)} className="btn-outline btn-small btn-delete">Redact</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReviews;
