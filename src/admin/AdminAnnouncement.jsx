import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { Megaphone, Save, CheckCircle } from 'lucide-react';
import './AdminAnnouncement.css';

const AdminAnnouncement = () => {
  const [text, setText] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        
        const res = await api.get('/announcements');
        if (res.data) {
          setText(res.data.text);
          setIsActive(res.data.isActive);
        }
      } catch (err) {
        console.error('Error fetching announcement:', err);
      }
    };
    fetchAnnouncement();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      
      const token = localStorage.getItem('token');
      await api.post('/announcements', { text, isActive }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Announcement updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error('Error updating announcement:', err);
      setMessage('Failed to update announcement.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-announcement-page">
      <div className="admin-card">
        <div className="card-header">
          <Megaphone size={24} className="title-icon" />
          <h2>Sale Ticker Management</h2>
          <p>Update the scrolling announcement bar below the navbar</p>
        </div>

        <form onSubmit={handleSubmit} className="announcement-form">
          <div className="form-group">
            <label>Ticker Text</label>
            <textarea 
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="e.g. FLASH SALE: 50% OFF ON ALL SWEETS! USE CODE: SWEET50"
              required
            />
          </div>

          <div className="form-group checkbox-group">
            <input 
              type="checkbox" 
              id="isActive"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
            <label htmlFor="isActive">Show Ticker on Website</label>
          </div>

          <button type="submit" className="save-btn" disabled={loading}>
            {loading ? 'Saving...' : <><Save size={18} /> Update Ticker</>}
          </button>

          {message && (
            <div className={`status-message ${message.includes('success') ? 'success' : 'error'}`}>
              {message.includes('success') && <CheckCircle size={16} />}
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AdminAnnouncement;
