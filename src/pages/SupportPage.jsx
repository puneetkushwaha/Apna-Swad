import React from 'react';
import SEO from '../components/SEO/SEO';
import { MessageCircle, Phone, Mail, Clock } from 'lucide-react';

const SupportPage = () => {
  return (
    <div className="support-page container section">
      <SEO 
        title="24/7 Heritage Support | Apna Swad"
        description="Experience our round-the-clock support for all your Apna Swad queries and heritage experiences."
        url="/support"
      />
      
      <div className="section-header">
        <h1 className="brand-font">Heritage Support</h1>
        <p>Expert assistance, 24 hours a day, 7 days a week. We are here to ensure your journey into authentic flavors is seamless.</p>
      </div>

      <div className="support-hero reveal">
        <div className="hero-content">
          <h2>Always Here for You</h2>
          <p>Just as tradition never sleeps, our support team is available around the clock to assist you with order tracking, bulk inquiries, or any feedback you want to share.</p>
        </div>
      </div>

      <div className="support-channels grid reveal">
        <div className="support-card box-shadow">
          <MessageCircle className="icon" size={40} />
          <h3>Live WhatsApp Support</h3>
          <p>Get instant answers from our heritage experts on WhatsApp.</p>
          <a href="https://wa.me/918810905170" className="btn btn-outline" target="_blank" rel="noopener noreferrer">Chat Now</a>
        </div>
        
        <div className="support-card box-shadow">
          <Phone className="icon" size={40} />
          <h3>24/7 Helpline</h3>
          <p>Call our dedicated support line anytime for urgent assistance.</p>
          <a href="tel:+918810905170" className="btn btn-outline">+91 8810905170</a>
        </div>

        <div className="support-card box-shadow">
          <Mail className="icon" size={40} />
          <h3>Email Support</h3>
          <p>Detailed query or feedback? Send us an email and we'll reply within 4 hours.</p>
          <a href="mailto:support@apnaswad.store" className="btn btn-outline">Send Email</a>
        </div>
      </div>

      <div className="faq-section reveal">
        <h2 className="brand-font text-center">Frequently Asked Questions</h2>
        <div className="faq-grid">
          <div className="faq-item">
            <h4>How long does delivery take?</h4>
            <p>Typically 3-7 business days across India. We process heritage batches fresh every morning!</p>
          </div>
          <div className="faq-item">
            <h4>Are your products really palm-oil free?</h4>
            <p>100%. We use only high-quality traditional oils because we care about your health as much as you do.</p>
          </div>
          <div className="faq-item">
            <h4>Do you take custom bulk orders?</h4>
            <p>Yes! We specialize in customized gifting for weddings, corporate events, and festivals.</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .support-hero {
          background: var(--text-main);
          color: var(--white);
          padding: 80px 40px;
          border-radius: 30px;
          text-align: center;
          margin-bottom: 60px;
        }
        .support-hero h2 {
          font-size: 2.5rem;
          margin-bottom: 20px;
        }
        .support-hero p {
          max-width: 700px;
          margin: 0 auto;
          font-size: 1.1rem;
          opacity: 0.9;
        }

        .support-channels {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
          margin-bottom: 80px;
        }
        .support-card {
          background: var(--white);
          padding: 40px;
          border-radius: 20px;
          text-align: center;
          border: var(--border-subtle);
          transition: var(--transition);
        }
        .support-card:hover {
          transform: translateY(-5px);
          border-color: var(--secondary);
        }
        .support-card .icon {
          color: var(--secondary);
          margin-bottom: 25px;
        }
        .support-card h3 {
          margin-bottom: 15px;
          color: var(--text-main);
        }
        .support-card p {
          color: var(--text-muted);
          margin-bottom: 25px;
        }

        .faq-section {
          padding: 80px 0;
        }
        .faq-section h2 {
          margin-bottom: 50px;
        }
        .faq-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 40px;
        }
        .faq-item h4 {
          font-size: 1.2rem;
          margin-bottom: 15px;
          color: var(--text-main);
        }
        .faq-item p {
          color: var(--text-muted);
          line-height: 1.6;
        }
      `}</style>
    </div>
  );
};

export default SupportPage;
