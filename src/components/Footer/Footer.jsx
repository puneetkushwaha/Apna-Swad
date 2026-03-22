import React from 'react';
import { Instagram, Linkedin, Send, MessageCircle, Youtube } from 'lucide-react';
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
              <a href="https://www.linkedin.com/company/apnaswad-the-heritage-of-taste/" target="_blank" rel="noopener noreferrer" className="social-icon"><Linkedin size={18} /></a>
              <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noopener noreferrer" className="social-icon"><MessageCircle size={18} /></a>
              <a href="https://www.youtube.com/@ApnaSwad" target="_blank" rel="noopener noreferrer" className="social-icon"><Youtube size={18} /></a>
            </div>
          </div>

          <div className="footer-column">
            <h4>Shop</h4>
            <ul>
              <li><Link to="/category/thekua">Thekua Special</Link></li>
              <li><Link to="/category/namkeen">Handcrafted Namkeen</Link></li>
              <li><Link to="/category/sweets">Traditional Sweets</Link></li>
              <li><Link to="/category/festive-combos">Festive Combos</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Company</h4>
            <ul>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/sustainability">Sustainability</Link></li>
              <li><Link to="/store-locator">Store Locator</Link></li>
              <li><Link to="/support">24/7 Heritage Support</Link></li>
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
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-of-service">Terms of Service</Link>
            <Link to="/shipping-policy">Shipping Policy</Link>
            <Link to="/return-policy">Return Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
