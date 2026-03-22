import React from 'react';
import { Instagram, Heart, MessageCircle } from 'lucide-react';
import { SOCIAL_CONFIG } from '../../config/socialConfig';
import './InstagramFeed.css';

const InstagramFeed = () => {
  const feedItems = [
    { id: 1, image: 'https://res.cloudinary.com/dnzlgjs94/image/upload/v1710672000/insta_1.png', likes: '1.2k', comments: '45' },
    { id: 2, image: 'https://res.cloudinary.com/dnzlgjs94/image/upload/v1710672000/insta_2.png', likes: '850', comments: '32' },
    { id: 3, image: 'https://res.cloudinary.com/dnzlgjs94/image/upload/v1710672000/insta_3.png', likes: '2.1k', comments: '89' },
    { id: 4, image: 'https://res.cloudinary.com/dnzlgjs94/image/upload/v1710672000/insta_4.png', likes: '1.5k', comments: '67' },
  ];

  // Load Behold script for live feed
  React.useEffect(() => {
    if (SOCIAL_CONFIG.INSTAGRAM_FEED_ID) {
      const s = document.createElement("script");
      s.type = "module";
      s.src = "https://w.behold.so/widget.js";
      document.head.append(s);
    }
  }, []);

  // Note: Using the AI generated local paths for demonstration in this environment
  // In a real app, these would be Cloudinary or Instagram API URLs.
  const localFeed = [
    { id: 1, image: '/insta_1.png', likes: '1.2k', comments: '45' },
    { id: 2, image: '/insta_2.png', likes: '850', comments: '32' },
    { id: 3, image: '/insta_3.png', likes: '2.1k', comments: '89' },
    { id: 4, image: '/insta_4.png', likes: '1.5k', comments: '67' },
  ];

  return (
    <section className="instagram-section reveal">
      <div className="container">
        <div className="insta-header">
          <div className="insta-title-row">
            <Instagram size={32} className="insta-icon" />
            <h2 className="brand-font">On the Gram</h2>
          </div>
          <p className="insta-subtitle">Join our community of heritage snack lovers <span className="highlight">@apnaswad_india</span></p>
        </div>

        <div className="insta-grid">
          {SOCIAL_CONFIG.INSTAGRAM_FEED_ID ? (
            <div className="live-feed-container">
              <behold-widget feed-id={SOCIAL_CONFIG.INSTAGRAM_FEED_ID}></behold-widget>
            </div>
          ) : (
            localFeed.map((item) => (
              <div key={item.id} className="insta-item">
                <div className="insta-img-wrapper">
                  <img src={item.image} alt={`Instagram post ${item.id}`} />
                  <div className="insta-overlay">
                    <div className="insta-stats">
                      <span><Heart size={20} fill="white" /> {item.likes}</span>
                      <span><MessageCircle size={20} fill="white" /> {item.comments}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="insta-footer">
          <a href="https://www.instagram.com/apnaswad_india/" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            Follow our Journey
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
