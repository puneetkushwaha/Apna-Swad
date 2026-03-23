import React, { useState } from 'react';
import api from '../api/api';
import './Admin.css';
import { Send, Mail, Type, AlignLeft, CheckCircle2, AlertCircle, Eye, Users } from 'lucide-react';
import Skeleton from '../components/Loader/Skeleton';

const AdminBulkEmail = () => {
  const [subject, setSubject] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [showPreview, setShowPreview] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!window.confirm('Are you sure you want to send this email to ALL registered users? This action cannot be undone.')) return;
    
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const { data } = await api.sendBulkEmail({
        subject,
        title,
        body,
      });

      setStatus({ 
        type: 'success', 
        message: `Success! ${data.message}` 
      });
      setSubject('');
      setTitle('');
      setBody('');
      setShowPreview(false);
    } catch (error) {
      console.error('Bulk Email Error:', error);
      setStatus({ 
        type: 'error', 
        message: error.response?.data?.message || 'Failed to send bulk email. Check console for details.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div className="header-title">
          <div className="icon-wrapper bg-maroon">
            <Mail className="title-icon text-white" />
          </div>
          <div>
            <h1 className="brand-font">Marketing Command Center</h1>
            <p className="subtitle">Craft and broadcast premium heritage-themed emails</p>
          </div>
        </div>
      </div>

      <div className="bulk-email-layout">
        {/* Editor Section */}
        <div className="admin-card email-editor">
          <div className="card-header-simple">
            <div className="header-info">
              <Users size={18} className="text-maroon" />
              <span>Broadcast to all customers</span>
            </div>
          </div>

          {status.message && (
            <div className={`status-alert ${status.type} animated-fade`}>
              {status.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
              <span>{status.message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="admin-form">
            <div className="input-group-premium">
              <label><Type size={16} /> Email Subject</label>
              <input
                type="text"
                placeholder="e.g., A special gift for our Heritage Family! 🥟"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>

            <div className="input-group-premium">
              <label><Mail size={16} /> Header Title</label>
              <input
                type="text"
                placeholder="e.g., Seasonal Celebration is Live!"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="input-group-premium">
              <label><AlignLeft size={16} /> Message Body</label>
              <textarea
                placeholder="Share the story of Bihar's authentic flavors..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
                rows={8}
              ></textarea>
              <div className="form-info">
                <small>Pro tip: Use short paragraphs for better readability on mobile.</small>
              </div>
            </div>

            <div className="form-actions-premium">
              <button 
                type="button" 
                className="btn-outline-maroon"
                onClick={() => setShowPreview(!showPreview)}
              >
                <Eye size={18} /> {showPreview ? 'Hide Preview' : 'Show Live Preview'}
              </button>
              
              <button 
                type="submit" 
                className="btn-maroon-glow" 
                disabled={loading}
              >
                {loading ? (
                  <Skeleton type="text" style={{ width: '120px', background: 'rgba(255,255,255,0.2)', margin: 0 }} />
                ) : (
                  <>
                    <Send size={18} /> Broadcast Now
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Live Preview Section */}
        {showPreview && (
          <div className="email-preview-container animated-slide-left">
            <div className="preview-label">Live Template Preview</div>
            <div className="email-mockup">
              <div className="mockup-header">
                <img src="/mascot_logo.png" alt="Logo" className="mockup-logo" />
                <h1>APNA SWAD</h1>
              </div>
              <div className="mockup-content">
                <h2 className="preview-title">{title || 'Your Header Title Here'}</h2>
                <div className="preview-body">
                  {(body || 'Write something amazing to see it here...').split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
                <button className="preview-cta">Shop Now</button>
              </div>
              <div className="mockup-footer">
                <p>© 2026 Apna Swad. Authentic Bihari Delicacies.</p>
                <p>Lucknow, Uttar Pradesh, India</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx="true">{`
        .bulk-email-layout {
          display: grid;
          grid-template-columns: ${showPreview ? '1fr 1.2fr' : '1fr'};
          gap: 30px;
          transition: all 0.5s ease;
        }

        .email-editor {
          max-width: ${showPreview ? 'none' : '800px'};
          margin: ${showPreview ? '0' : '0 auto'};
        }

        .email-preview-container {
          background: #fdf8f4;
          border-radius: 24px;
          padding: 30px;
          border: 1px solid #eee;
          box-shadow: inset 0 2px 10px rgba(0,0,0,0.02);
          position: sticky;
          top: 20px;
          height: fit-content;
        }

        .preview-label {
          font-size: 0.8rem;
          font-weight: 800;
          color: #9E7E6B;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 20px;
          text-align: center;
        }

        .email-mockup {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        .mockup-header {
          background: #4a2c2a;
          padding: 20px;
          text-align: center;
        }

        .mockup-logo {
          height: 60px;
          margin-bottom: 5px;
        }

        .mockup-header h1 {
          color: white;
          font-size: 1.2rem;
          letter-spacing: 2px;
          margin: 0;
        }

        .mockup-content {
          padding: 30px;
          text-align: center;
        }

        .preview-title {
          color: #4a2c2a;
          font-size: 1.4rem;
          margin-bottom: 15px;
        }

        .preview-body {
          color: #666;
          line-height: 1.6;
          font-size: 0.95rem;
          margin-bottom: 25px;
          text-align: left;
        }

        .preview-cta {
          background: #c48c4e;
          color: white;
          border: none;
          padding: 10px 25px;
          border-radius: 25px;
          font-weight: 700;
          cursor: default;
        }

        .mockup-footer {
          background: #f9f9f9;
          padding: 15px;
          text-align: center;
          font-size: 0.7rem;
          color: #999;
          border-top: 1px solid #eee;
        }

        .animated-slide-left {
          animation: slideLeft 0.5s ease-out;
        }

        @keyframes slideLeft {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @media (max-width: 1100px) {
          .bulk-email-layout {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminBulkEmail;
