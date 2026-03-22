import React from 'react';
import { Package, ShieldAlert, Clock, RefreshCw, MessageCircle, Mail, HelpCircle } from 'lucide-react';
import SEO from '../components/SEO/SEO';
import './ReturnPolicy.css';

const ReturnPolicy = () => {
  return (
    <div className="policy-page container section">
      <SEO 
        title="Return & Refund Policy | Apna Swad"
        description="Our commitment to quality: Transparent return and refund policy for Apna Swad traditional handcrafted snacks."
        url="/return-policy"
      />

      <div className="policy-hero reveal">
        <h1 className="brand-font">Heritage of <span>Quality</span></h1>
        <p>Since our products are freshly handcrafted and perishable, we maintain a strict yet fair policy to ensure the highest standards of hygiene and satisfaction.</p>
      </div>
      
      <div className="policy-grid">
        <div className="policy-card reveal">
          <div className="icon-circle">
            <ShieldAlert size={28} />
          </div>
          <h2>Eligibility for Claims</h2>
          <p>We provide full refunds or replacements for the following scenarios:</p>
          <ul>
            <li><strong>Severe Damage:</strong> Inner seal is broken OR outer box is heavily tampered.</li>
            <li><strong>Incorrect Order:</strong> Received a product different from your order.</li>
            <li><strong>Quality Defect:</strong> Unexpected flavor profile or foreign particles.</li>
          </ul>
        </div>

        <div className="policy-card reveal">
          <div className="icon-circle">
            <Clock size={28} />
          </div>
          <h2>Reporting Window</h2>
          <p>Time is of the essence for fresh food items. Claims must be reported within <strong>24 hours</strong> of delivery with clear evidence.</p>
          <ul>
            <li>Photo of the outer package.</li>
            <li>Photo of the inner product concerned.</li>
            <li>Copy of the digital invoice/Order ID.</li>
          </ul>
        </div>

        <div className="policy-card reveal">
          <div className="icon-circle">
            <RefreshCw size={28} />
          </div>
          <h2>Refund Processing</h2>
          <p>Once approved, refunds reach your original payment method in 5-7 business days. For cash orders, we initiate bank transfers directly to your account.</p>
        </div>

        <div className="policy-card reveal">
          <div className="icon-circle">
            <Package size={28} />
          </div>
          <h2>Cancellations</h2>
          <p>Orders can only be cancelled within <strong>2 hours</strong> of placement. Beyond this, our kitchen starts preparing your fresh batch, and cancellation is not possible.</p>
        </div>

        <div className="policy-card policy-footer-card reveal">
          <div className="icon-circle" style={{ margin: '0 auto' }}>
            <HelpCircle size={28} />
          </div>
          <h2>Need Immediate Help?</h2>
          <p>Our Heritage Support team is ready to resolve your concerns instantly.</p>
          <div className="contact-links">
            <a href="https://wa.me/918810905170" target="_blank" rel="noopener noreferrer">
              <MessageCircle size={20} color="#25D366" /> 8810905170
            </a>
            <a href="mailto:support@apnaswad.store">
              <Mail size={20} color="#FF9933" /> support@apnaswad.store
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;
