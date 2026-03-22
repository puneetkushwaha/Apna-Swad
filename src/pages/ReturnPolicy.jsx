import React from 'react';
import SEO from '../components/SEO/SEO';

const ReturnPolicy = () => {
  return (
    <div className="policy-page container section">
      <SEO 
        title="Return & Refund Policy | Apna Swad"
        description="Information about returns, cancellations, and refunds for Apna Swad products."
        url="/return-policy"
      />
      <div className="section-header">
        <h1 className="brand-font">Return & Refund Policy</h1>
        <p>Last updated: March 2026</p>
      </div>
      
      <div className="policy-content">
        <section>
          <p>At Apna Swad, we take pride in the quality of our traditional snacks. Due to the perishable nature of our products, our return policy is governed by the following guidelines.</p>
        </section>

        <section>
          <h2>Cancellations</h2>
          <p>You can cancel your order within 2 hours of placement for a full refund. Once the order has been processed for shipping, cancellations are not possible.</p>
        </section>

        <section>
          <h2>Returns</h2>
          <p>As we deal with food products, we generally do not accept returns. However, we will provide a replacement or refund in the following cases:</p>
          <ul>
            <li>Product received is damaged or tampered with.</li>
            <li>Incorrect product delivered.</li>
            <li>Product has expired upon arrival.</li>
          </ul>
        </section>

        <section>
          <h2>Refund Process</h2>
          <p>If you encounter any of the issues mentioned above, please contact us within 24 hours of delivery with photographic evidence. Once verified, we will initiate a refund or replacement within 5-7 business days.</p>
        </section>

        <section>
          <h2>Quality Guarantee</h2>
          <p>We ensure that our products are made without preservatives and palm oil. If you have concerns about the quality, please reach out to us, and we will do our best to make it right.</p>
        </section>

        <section>
          <h2>Contact Us</h2>
          <p>For any return or refund requests, please contact:</p>
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

export default ReturnPolicy;
