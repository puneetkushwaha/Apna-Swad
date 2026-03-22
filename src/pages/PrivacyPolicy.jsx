import React from 'react';
import SEO from '../components/SEO/SEO';

const PrivacyPolicy = () => {
  return (
    <div className="policy-page container section">
      <SEO 
        title="Privacy Policy | Apna Swad"
        description="Learn about how Apna Swad collects, uses, and protects your personal information."
        url="/privacy-policy"
      />
      <div className="section-header">
        <h1 className="brand-font">Privacy Policy</h1>
        <p>Last updated: March 2026</p>
      </div>
      
      <div className="policy-content">
        <section>
          <p>At Apna Swad, we respect your privacy and are committed to protecting your personal information.</p>
        </section>

        <section>
          <h2>Information We Collect</h2>
          <p>When you visit our website or place an order, we may collect the following information:</p>
          <ul>
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Shipping address</li>
            <li>Payment details (processed securely by payment providers)</li>
          </ul>
        </section>

        <section>
          <h2>How We Use Your Information</h2>
          <p>We use the collected information to:</p>
          <ul>
            <li>Process and deliver your orders</li>
            <li>Communicate order updates</li>
            <li>Improve our website and services</li>
            <li>Provide customer support</li>
          </ul>
        </section>

        <section>
          <h2>Data Protection</h2>
          <p>Your information is stored securely and is not sold or shared with third parties except when required to process your order (such as shipping partners or payment gateways).</p>
        </section>

        <section>
          <h2>Cookies</h2>
          <p>Our website may use cookies to improve your browsing experience and analyze website traffic.</p>
        </section>

        <section>
          <h2>Your Rights</h2>
          <p>You have the right to request access, correction, or deletion of your personal data by contacting us.</p>
        </section>

        <section>
          <h2>Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, you can contact us at:</p>
          <p>Email: <a href="mailto:support@apnaswad.store">support@apnaswad.store</a></p>
        </section>
      </div>

      <style jsx>{`
        .policy-page {
          max-width: 800px;
          margin: 0 auto;
        }
        .policy-content h2 {
          font-size: 1.8rem;
          margin: 40px 0 20px;
          color: var(--text-main);
        }
        .policy-content section {
          margin-bottom: 30px;
        }
        .policy-content p, .policy-content li {
          color: var(--text-muted);
          line-height: 1.8;
          font-size: 1.1rem;
        }
        .policy-content ul {
          padding-left: 20px;
          margin-top: 15px;
        }
        .policy-content li {
          margin-bottom: 10px;
          list-style: disc;
        }
        .policy-content a {
          color: var(--secondary);
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default PrivacyPolicy;
