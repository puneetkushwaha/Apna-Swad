import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Instagram, Linkedin, MessageCircle, Utensils, Heart, ShieldCheck } from 'lucide-react';
import SEO from '../components/SEO/SEO';
import api from '../api/api';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });
    try {
      await api.post('/contact', formData);
      setStatus({ type: 'success', message: 'Namaste! Your message has reached our kitchen. We will get back to you soon.' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus({ type: 'error', message: 'Something went wrong. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page container section">
      <SEO 
        title="Contact Us | Apna Swad"
        description="Experience the tagda heritage of Apna Swad. Get in touch with our Lucknow team for queries, bulk orders, or just a friendly chat."
        url="/contact"
      />
      
      <div className="hero-compact reveal">
        <h1 className="brand-font">Let's Talk <span>Swad</span></h1>
        <p>From the heart of Lucknow to your doorstep, we're here to preserve the authentic flavors of India.</p>
      </div>

      <div className="contact-main-grid">
        <div className="contact-sidebar reveal">
          <div className="contact-card primary-card">
            <h3>Direct Contact</h3>
            <div className="contact-item">
              <div className="icon-box"><Phone size={20} /></div>
              <div className="text-box">
                <span className="label">Call Our Kitchen</span>
                <a href="tel:+918810905170">+91 8810905170</a>
              </div>
            </div>
            <div className="contact-item">
              <div className="icon-box"><MessageCircle size={20} /></div>
              <div className="text-box">
                <span className="label">WhatsApp Support</span>
                <a href="https://wa.me/918810905170" target="_blank" rel="noopener noreferrer">Chat with us</a>
              </div>
            </div>
            <div className="contact-item">
              <div className="icon-box"><Mail size={20} /></div>
              <div className="text-box">
                <span className="label">Email Inquiry</span>
                <a href="mailto:support@apnaswad.store">support@apnaswad.store</a>
              </div>
            </div>
            <div className="contact-item">
              <div className="icon-box"><MapPin size={20} /></div>
              <div className="text-box">
                <span className="label">Our Presence</span>
                <p>Lucknow, Uttar Pradesh, India</p>
              </div>
            </div>
          </div>

          <div className="feature-badges">
            <div className="badge-item">
              <Utensils size={18} />
              <span>Handcrafted</span>
            </div>
            <div className="badge-item">
              <ShieldCheck size={18} />
              <span>Zero Palm Oil</span>
            </div>
            <div className="badge-item">
              <Heart size={18} />
              <span>Zero Preservatives</span>
            </div>
          </div>
        </div>

        <div className="contact-content reveal">
          <div className="form-wrapper">
            <div className="form-header">
              <h2>Send us a Message</h2>
              <p>Have a custom order request or want to collaborate? Fill the form below.</p>
            </div>

            <form className="tagda-form" onSubmit={handleSubmit}>
              <div className="input-grid">
                <div className="field-group">
                  <label>Your Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    placeholder="e.g. Rahul Sharma" 
                    required 
                  />
                </div>
                <div className="field-group">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="e.g. rahul@example.com" 
                    required 
                  />
                </div>
              </div>
              
              <div className="field-group">
                <label>Subject</label>
                <input 
                  type="text" 
                  name="subject" 
                  value={formData.subject} 
                  onChange={handleChange} 
                  placeholder="Bulk order, partnership, or feedback?" 
                  required 
                />
              </div>

              <div className="field-group">
                <label>Message</label>
                <textarea 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  placeholder="Tell us what's on your mind..." 
                  rows="4" 
                  required 
                ></textarea>
              </div>

              {status.message && (
                <div className={`status-box ${status.type}`}>
                  {status.message}
                </div>
              )}

              <button type="submit" className="tagda-btn" disabled={loading}>
                {loading ? 'Sending Request...' : (
                  <>
                    Submit Message <Send size={20} style={{ marginLeft: '12px' }} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        .contact-page {
          max-width: 1200px;
          margin-top: 20px;
        }
        .hero-compact {
          text-align: center;
          margin-bottom: 60px;
        }
        .hero-compact h1 {
          font-size: clamp(3rem, 8vw, 5rem);
          margin-bottom: 15px;
          color: var(--text-main);
        }
        .hero-compact h1 span {
          color: var(--secondary);
          position: relative;
        }
        .hero-compact h1 span::after {
          content: '';
          position: absolute;
          bottom: 10px;
          left: 0;
          width: 100%;
          height: 12px;
          background: rgba(255, 153, 51, 0.2);
          z-index: -1;
        }
        .hero-compact p {
          font-size: 1.25rem;
          color: var(--text-muted);
          max-width: 600px;
          margin: 0 auto;
        }

        .contact-main-grid {
          display: grid;
          grid-template-columns: 380px 1fr;
          gap: 50px;
        }

        .contact-card.primary-card {
          background: var(--text-main);
          color: var(--white);
          padding: 40px;
          border-radius: 32px;
          box-shadow: 0 30px 60px rgba(74, 44, 42, 0.15);
        }
        .primary-card h3 {
          font-size: 1.8rem;
          margin-bottom: 35px;
          color: var(--white);
        }
        .contact-item {
          display: flex;
          gap: 20px;
          margin-bottom: 30px;
        }
        .icon-box {
          width: 48px;
          height: 48px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--secondary);
          flex-shrink: 0;
        }
        .text-box .label {
          display: block;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          opacity: 0.6;
          margin-bottom: 4px;
        }
        .text-box a, .text-box p {
          font-size: 1.1rem;
          font-weight: 600;
          color: inherit;
        }

        .feature-badges {
          margin-top: 40px;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .badge-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 15px 20px;
          background: var(--cream);
          border-radius: 16px;
          color: var(--text-main);
          font-weight: 600;
          font-size: 0.95rem;
          border: 1px solid rgba(74, 44, 42, 0.05);
        }
        .badge-item svg {
          color: var(--secondary);
        }

        .form-wrapper {
          background: var(--white);
          padding: 60px;
          border-radius: 32px;
          border: var(--border-subtle);
          box-shadow: var(--shadow-sm);
        }
        .form-header {
          margin-bottom: 40px;
        }
        .form-header h2 {
          font-size: 2.2rem;
          margin-bottom: 10px;
          color: var(--text-main);
        }
        .form-header p {
          color: var(--text-muted);
        }

        .tagda-form {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }
        .input-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .field-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .field-group label {
          font-weight: 700;
          font-size: 0.9rem;
          color: var(--text-main);
        }
        .field-group input, .field-group textarea {
          padding: 18px 25px;
          border: 1.5px solid rgba(74, 44, 42, 0.08);
          border-radius: 16px;
          background: #fdfdfd;
          font-family: inherit;
          font-size: 1rem;
          transition: var(--transition);
        }
        .field-group input:focus, .field-group textarea:focus {
          outline: none;
          border-color: var(--secondary);
          box-shadow: 0 0 0 4px rgba(255, 153, 51, 0.1);
          background: var(--white);
        }

        .tagda-btn {
          margin-top: 15px;
          padding: 20px 40px;
          background: var(--text-main);
          color: var(--white);
          border: none;
          border-radius: 16px;
          font-weight: 700;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition);
        }
        .tagda-btn:hover:not(:disabled) {
          background: var(--secondary);
          transform: translateY(-3px);
          box-shadow: 0 15px 30px rgba(255, 153, 51, 0.3);
        }
        .tagda-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .status-box {
          padding: 18px;
          border-radius: 12px;
          font-weight: 600;
        }
        .status-box.success {
          background: #ecfdf5;
          color: #065f46;
          border: 1px solid #a7f3d0;
        }
        .status-box.error {
          background: #fef2f2;
          color: #991b1b;
          border: 1px solid #fecaca;
        }

        @media (max-width: 1024px) {
          .contact-main-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .form-wrapper {
            padding: 40px;
          }
        }
        @media (max-width: 640px) {
          .input-grid {
            grid-template-columns: 1fr;
          }
          .form-wrapper {
            padding: 30px 20px;
          }
          .hero-compact h1 {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ContactPage;
