import React from 'react';
import SEO from '../components/SEO/SEO';

const ShippingPolicy = () => {
  return (
    <div className="policy-page container section">
      <SEO 
        title="Shipping Policy | Apna Swad"
        description="Details about shipping times, charges, and delivery for your Apna Swad orders."
        url="/shipping-policy"
      />
      <div className="section-header">
        <h1 className="brand-font">Shipping Policy</h1>
        <p>Last updated: March 2026</p>
      </div>
      
      <div className="policy-content">
        <section>
          <p>Thank you for choosing Apna Swad. We strive to deliver our authentic flavors to your doorstep as quickly and safely as possible.</p>
        </section>

        <section>
          <h2>Order Processing Time</h2>
          <p>Orders are usually processed within 1–3 business days after confirmation. We ensure that every package is handled with care to maintain the freshness of our products.</p>
        </section>

        <section>
          <h2>Shipping Time</h2>
          <p>Delivery times may vary depending on your location. Generally, orders are delivered within 3–7 business days across India.</p>
        </section>

        <section>
          <h2>Shipping Charges</h2>
          <p>Shipping charges will be displayed at checkout based on your delivery location and the weight of your order.</p>
        </section>

        <section>
          <h2>Order Tracking</h2>
          <p>Once your order is shipped, you will receive tracking details via email or SMS. You can track your package in real-time through our delivery partner's portal.</p>
        </section>

        <section>
          <h2>Delivery Issues</h2>
          <p>If your package is delayed, damaged, or lost during shipping, please contact our support team and we will assist you in resolving the issue immediately.</p>
        </section>

        <section>
          <h2>Contact Us</h2>
          <p>For any shipping related queries, please contact:</p>
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

export default ShippingPolicy;
