import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Instagram, Linkedin, MessageCircle, Utensils, Heart, ShieldCheck } from 'lucide-react';
import SEO from '../components/SEO/SEO';
import api from '../api/api';
import './ContactPage.css';

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
    </div>
  );
};

export default ContactPage;
