import React from 'react';
import { Instagram, Facebook, Twitter, Linkedin, Send, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-column footer-brand">
            <img src="/logo text.png" alt="Apna Swad" className="footer-logo-text" />
            <p>Authentic Indian snacks, handcrafted with love and zero preservatives. Bringing the taste of tradition to your doorstep.</p>
            <div className="social-links">
              <a href="https://www.instagram.com/apnaswad_india/" target="_blank" rel="noopener noreferrer" className="social-icon"><Instagram size={18} /></a>
              <a href="#" className="social-icon"><Facebook size={18} /></a>
              <a href="#" className="social-icon"><Twitter size={18} /></a>
              <a href="#" className="social-icon"><Linkedin size={18} /></a>
            </div>
          </div>

          <div className="footer-column">
            <h4>Shop</h4>
            <ul>
              <li><a href="/category/thekua">Thekua Special</a></li>
              <li><a href="/category/namkeen">Handcrafted Namkeen</a></li>
              <li><a href="/category/sweets">Traditional Sweets</a></li>
              <li><a href="/category/festive-combos">Festive Combos</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Company</h4>
            <ul>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Sustainability</a></li>
              <li><a href="#">Store Locator</a></li>
            </ul>
          </div>

          <div className="footer-column newsletter-column">
            <h4>Stay Connected</h4>
            <p>Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Your email address" className="newsletter-input" />
              <button type="submit" className="newsletter-btn">
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 Apna Swad. All Rights Reserved.</p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Shipping Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
