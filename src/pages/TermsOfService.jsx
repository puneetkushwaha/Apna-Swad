import React from 'react';
import SEO from '../components/SEO/SEO';

const TermsOfService = () => {
  return (
    <div className="policy-page container section">
      <SEO 
        title="Terms of Service | Apna Swad"
        description="Read the terms and conditions for using the Apna Swad website and purchasing our products."
        url="/terms-of-service"
      />
      <div className="section-header">
        <h1 className="brand-font">Terms of Service</h1>
        <p>Last updated: March 2026</p>
      </div>
      
      <div className="policy-content">
        <section>
          <p>Welcome to Apna Swad. By using our website and purchasing our products, you agree to the following terms.</p>
        </section>

        <section>
          <h2>Use of Website</h2>
          <p>You agree to use this website only for lawful purposes and not to misuse or attempt unauthorized access.</p>
        </section>

        <section>
          <h2>Product Information</h2>
          <p>We strive to ensure that all product descriptions, images, and prices are accurate. However, minor variations may occur as our products are traditional and often handcrafted.</p>
        </section>

        <section>
          <h2>Orders and Payments</h2>
          <p>All orders placed on our website are subject to acceptance and availability. Payments are processed securely through trusted payment gateways like Razorpay.</p>
        </section>

        <section>
          <h2>Pricing</h2>
          <p>Prices of products may change without prior notice. The price at the time of order placement will be honored.</p>
        </section>

        <section>
          <h2>Intellectual Property</h2>
          <p>All content on this website including logos, images, and text belongs to Apna Swad and cannot be used, reproduced, or distributed without explicit permission.</p>
        </section>

        <section>
          <h2>Limitation of Liability</h2>
          <p>Apna Swad is not responsible for any indirect or incidental damages resulting from the use of our products or website. Our liability is limited to the value of the products purchased.</p>
        </section>

        <section>
          <h2>Changes to Terms</h2>
          <p>We reserve the right to update these terms at any time. Changes will be posted on this page and will be effective immediately.</p>
        </section>

        <section>
          <h2>Contact Us</h2>
          <p>For any clarifications regarding these terms, please contact us at:</p>
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
        .policy-content p {
          color: var(--text-muted);
          line-height: 1.8;
          font-size: 1.1rem;
        }
        .policy-content a {
          color: var(--secondary);
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default TermsOfService;
