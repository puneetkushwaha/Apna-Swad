import React from 'react';
import SEO from '../components/SEO/SEO';
import { MapPin, Search } from 'lucide-react';

const StoreLocatorPage = () => {
  return (
    <div className="store-locator-page container section">
      <SEO 
        title="Store Locator | Apna Swad"
        description="Find Apna Swad authentic snacks near you at our flagship outlets and partner stores."
        url="/store-locator"
      />
      
      <div className="section-header">
        <h1 className="brand-font">Find a Store</h1>
        <p>While we deliver worldwide through our website, you can also experience the aroma of our fresh snacks at our physical locations.</p>
      </div>

      <div className="search-bar reveal">
        <input type="text" placeholder="Enter pincode or city" />
        <button className="btn btn-primary"><Search size={18} /> Find Stores</button>
      </div>

      <div className="stores-grid reveal">
        <div className="store-card">
          <div className="status-badge">Flagship Store</div>
          <h3>Apna Swad Heritage - Delhi</h3>
          <p className="address"><MapPin size={16} /> Shop 12, Heritage Market, New Delhi, 110001</p>
          <p className="phone">📞 +91 11-XXXX-XXXX</p>
          <p className="hours">⏰ Open: 10:00 AM - 9:00 PM</p>
          <a href="#" className="btn-link">Get Directions</a>
        </div>
        
        <div className="store-card">
          <div className="status-badge">Experience Center</div>
          <h3>Dhyanti's Kitchen Outlet</h3>
          <p className="address"><MapPin size={16} /> Near Main Temple Road, Patna City, 800008</p>
          <p className="phone">📞 +91 612-XXXX-XXX</p>
          <p className="hours">⏰ Open: 9:00 AM - 8:00 PM</p>
          <a href="#" className="btn-link">Get Directions</a>
        </div>

        <div className="store-card placeholder">
          <h3>More Locations Coming Soon!</h3>
          <p>We are expanding rapidly to bring shuddh swad to every city in India.</p>
        </div>
      </div>

      <style jsx>{`
        .search-bar {
          max-width: 600px;
          margin: 0 auto 60px;
          display: flex;
          gap: 10px;
        }
        .search-bar input {
          flex: 1;
          padding: 15px 25px;
          border: 1px solid rgba(74, 44, 42, 0.1);
          border-radius: 12px;
          font-family: inherit;
        }
        
        .stores-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }
        .store-card {
          background: var(--white);
          padding: 40px;
          border-radius: 20px;
          border: var(--border-subtle);
          position: relative;
          transition: var(--transition);
        }
        .store-card:hover {
          box-shadow: var(--shadow-md);
          border-color: var(--secondary);
        }
        .status-badge {
          display: inline-block;
          background: rgba(255, 153, 51, 0.1);
          color: var(--secondary);
          padding: 5px 12px;
          border-radius: 30px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 20px;
        }
        .store-card h3 {
          margin-bottom: 15px;
          font-size: 1.4rem;
          color: var(--text-main);
        }
        .store-card p {
          margin-bottom: 10px;
          font-size: 0.95rem;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .btn-link {
          display: inline-block;
          margin-top: 20px;
          color: var(--secondary);
          font-weight: 700;
          font-size: 0.9rem;
          text-decoration: underline;
        }
        .store-card.placeholder {
          background: var(--cream);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          border: 2px dashed rgba(74, 44, 42, 0.1);
        }

        @media (max-width: 768px) {
          .search-bar {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default StoreLocatorPage;
