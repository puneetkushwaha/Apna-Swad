import React, { useState } from 'react';
import api from '../api/api';
import './Admin.css';
import { Send, Mail, Type, AlignLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import Skeleton from '../components/Loader/Skeleton';

const AdminBulkEmail = () => {
  const [subject, setSubject] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const token = localStorage.getItem('adminToken');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post('import.meta.env.VITE_API_URL/admin/bulk-email', {
        subject,
        title,
        body,
      }, config);

      setStatus({ 
        type: 'success', 
        message: `Success! ${data.message}` 
      });
      setSubject('');
      setTitle('');
      setBody('');
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: error.response?.data?.message || 'Failed to send bulk email' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div className="header-title">
          <Mail className="title-icon" />
          <div>
            <h1>Bulk Email Tool</h1>
            <p>Send premium marketing emails to all your customers</p>
          </div>
        </div>
      </div>

      <div className="admin-card email-tool-card">
        {status.message && (
          <div className={`status-alert ${status.type}`}>
            {status.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
            <span>{status.message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-group">
            <label>
              <Type size={16} /> Email Subject (Appears in Inbox)
            </label>
            <input
              type="text"
              placeholder="e.g., Special Holiday Offer! 🎁"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>
              <Type size={16} /> Email Title (Header inside Email)
            </label>
            <input
              type="text"
              placeholder="e.g., Seasonal Sale is Live"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>
              <AlignLeft size={16} /> Email Body
            </label>
            <textarea
              placeholder="Write your professional message here..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
              rows={10}
            ></textarea>
            <small className="form-hint">Note: New lines will be automatically converted to line breaks in the HTML email.</small>
          </div>

          <button 
            type="submit" 
            className="admin-btn primary-btn btn-large" 
            disabled={loading}
          >
            {loading ? (
              <Skeleton type="text" style={{ width: '180px', background: 'rgba(255,255,255,0.2)', margin: 0 }} />
            ) : (
              <>
                <Send size={20} /> Send Professional Email
              </>
            )}
          </button>
        </form>
      </div>

      <div className="admin-card preview-card">
        <h3>Design Preview Hint</h3>
        <p>Your email will use the <strong>Apna Swad Premium Template</strong>:</p>
        <ul className="preview-list">
          <li>✨ Maroon Header with Mascot Logo</li>
          <li>✨ Professional Typography</li>
          <li>✨ Mobile Responsive Design</li>
          <li>✨ Call-to-Action "Shop Now" Button</li>
          <li>✨ Social Media & Address Footer</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminBulkEmail;
