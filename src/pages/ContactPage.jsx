import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Instagram, Linkedin, MessageCircle } from 'lucide-react';
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
      setStatus({ type: 'success', message: 'Thank you! Your message has been sent. Our team will get back to you soon.' });
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
        description="Get in touch with the Apna Swad team for queries, bulk orders, or feedback."
        url="/contact"
      />
      
      <div className="section-header">
        <h1 className="brand-font">Get in Touch</h1>
        <p>We'd love to hear from you. Whether you have a question about our traditional snacks, bulk orders, or just want to share your shuddh swad experience.</p>
      </div>

      <div className="contact-grid">
        <div className="contact-info reveal">
          <div className="info-card">
            <h3>Contact Information</h3>
            <div className="info-item">
              <Mail className="icon" size={24} />
              <div>
                <p className="label">Email Us</p>
                <a href="mailto:support@apnaswad.store">support@apnaswad.store</a>
              </div>
            </div>
            <div className="info-item">
              <Phone className="icon" size={24} />
              <div>
                <p className="label">Call Us</p>
                <a href="tel:+91XXXXXXXXXX">+91 XXX XXX XXXX</a>
              </div>
            </div>
            <div className="info-item">
              <MapPin className="icon" size={24} />
              <div>
                <p className="label">Location</p>
                <p>New Delhi, India - Delivering Heritage Worldwide</p>
              </div>
            </div>

            <div className="social-connect">
              <p>Connect with us:</p>
              <div className="social-icons">
                <a href="https://www.instagram.com/apnaswad_india/" target="_blank" rel="noopener noreferrer"><Instagram size={20} /></a>
                <a href="https://www.linkedin.com/company/apnaswad-the-heritage-of-taste/" target="_blank" rel="noopener noreferrer"><Linkedin size={20} /></a>
                <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noopener noreferrer"><MessageCircle size={20} /></a>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form-container reveal">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="Enter your name" 
                required 
              />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="Enter your email" 
                required 
              />
            </div>
            <div className="form-group">
              <label>Subject</label>
              <input 
                type="text" 
                name="subject" 
                value={formData.subject} 
                onChange={handleChange} 
                placeholder="What is this regarding?" 
                required 
              />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea 
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                placeholder="How can we help you?" 
                rows="5" 
                required 
              ></textarea>
            </div>
            
            {status.message && (
              <div className={`status-message ${status.type}`}>
                {status.message}
              </div>
            )}

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Sending...' : (
                <>
                  Send Message <Send size={18} style={{ marginLeft: '10px' }} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      <style jsx>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 60px;
          margin-top: 40px;
        }
        .info-card {
          background: var(--text-main);
          color: var(--white);
          padding: 60px;
          border-radius: 24px;
          height: 100%;
        }
        .info-card h3 {
          font-size: 2.2rem;
          margin-bottom: 40px;
        }
        .info-item {
          display: flex;
          gap: 20px;
          margin-bottom: 35px;
        }
        .info-item .icon {
          color: var(--secondary);
          flex-shrink: 0;
        }
        .info-item .label {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          opacity: 0.7;
          margin-bottom: 5px;
        }
        .info-item a, .info-item p:not(.label) {
          font-size: 1.1rem;
          font-weight: 500;
        }
        .social-connect {
          margin-top: 60px;
          padding-top: 40px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        .social-icons {
          display: flex;
          gap: 20px;
          margin-top: 15px;
        }
        .social-icons a {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition);
        }
        .social-icons a:hover {
          background: var(--secondary);
          border-color: var(--secondary);
          transform: translateY(-3px);
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .form-group label {
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--text-main);
        }
        .form-group input, .form-group textarea {
          padding: 18px;
          border: 1px solid rgba(74, 44, 42, 0.1);
          border-radius: 12px;
          background: var(--cream);
          color: var(--text-main);
          font-family: inherit;
          transition: var(--transition);
        }
        .form-group input:focus, .form-group textarea:focus {
          outline: none;
          border-color: var(--secondary);
          box-shadow: 0 0 0 4px rgba(255, 153, 51, 0.1);
        }
        .status-message {
          padding: 15px;
          border-radius: 8px;
          font-size: 0.95rem;
          margin-bottom: 20px;
        }
        .status-message.success {
          background: #e6f4ea;
          color: #1e7e34;
        }
        .status-message.error {
          background: #fce8e6;
          color: #d93025;
        }

        @media (max-width: 1024px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .info-card {
            padding: 40px;
          }
        }
      `}</style>
    </div>
  );
};

export default ContactPage;
