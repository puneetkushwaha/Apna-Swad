import React from 'react';
import SEO from '../components/SEO/SEO';

const ReturnPolicy = () => {
  return (
    <div className="policy-page container section">
      <SEO 
        title="Return & Refund Policy | Apna Swad"
        description="Transparent return and refund policy for Apna Swad traditional snacks."
        url="/return-policy"
      />
      <div className="section-header">
        <h1 className="brand-font">Return & Refund Policy</h1>
        <p>At Apna Swad, we are committed to delivering the highest quality snacks. Since our products are perishable food items, we follow a specific policy to ensure fairness and hygiene.</p>
      </div>
      
      <div className="policy-content">
        <section>
          <h2>General Guidelines</h2>
          <p>As we deal with handcrafted, perishable food products made without preservatives, we typically do not offer a "general change of mind" return. However, your satisfaction is our priority.</p>
        </section>

        <section>
          <h2>Eligibility for Refund or Replacement</h2>
          <p>We will gladly provide a full refund or a fresh replacement if:</p>
          <ul>
            <li><strong>Damage:</strong> The outer packaging is severely tampered with or the inner seal is broken upon arrival.</li>
            <li><strong>Wrong Item:</strong> You received a product different from what you ordered.</li>
            <li><strong>Quality Issues:</strong> The product exhibits unexpected quality issues (e.g., rancidity or foreign particles).</li>
          </ul>
        </section>

        <section>
          <h2>Reporting a Problem</h2>
          <p>To initiate a claim, please follow these steps within <strong>24 hours</strong> of receiving the delivery:</p>
          <ul>
            <li>Contact us via WhatsApp at <a href="https://wa.me/918810905170">8810905170</a> or email <a href="mailto:support@apnaswad.store">support@apnaswad.store</a>.</li>
            <li>Provide your Order ID and clear photographs/videos of the concern.</li>
            <li>Keep the product and original packaging until the claim is processed.</li>
          </ul>
        </section>

        <section>
          <h2>Cancellations</h2>
          <p>Orders can be cancelled within <strong>2 hours</strong> of placement. Once an order is prepared for dispatch or handed over to our shipping partner, cancellations are not possible as these are fresh batches made to order.</p>
        </section>

        <section>
          <h2>Refund Processing</h2>
          <p>Once your claim is approved, the refund will be processed to your original payment method within 5-7 business days. For COD orders, we will request your bank details for a direct transfer.</p>
        </section>

        <section>
          <h2>Non-Refundable Scenarios</h2>
          <p>Refunds will not be issued for:</p>
          <ul>
            <li>Incomplete or incorrect shipping address provided by the customer.</li>
            <li>Multiple failed delivery attempts by our partner.</li>
            <li>Refusal of the package by the customer at the time of delivery.</li>
          </ul>
        </section>

        <div className="policy-footer" style={{ marginTop: '40px', padding: '30px', background: '#fcfaf8', borderRadius: '16px', border: '1px solid rgba(74, 44, 42, 0.05)' }}>
          <p>For any help with your order, reach out to our Heritage Support:</p>
          <p style={{ fontWeight: 'bold' }}>WhatsApp: <a href="https://wa.me/918810905170" style={{ color: '#FF9933' }}>8810905170</a></p>
          <p style={{ fontWeight: 'bold' }}>Email: <a href="mailto:support@apnaswad.store" style={{ color: '#FF9933' }}>support@apnaswad.store</a></p>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;
