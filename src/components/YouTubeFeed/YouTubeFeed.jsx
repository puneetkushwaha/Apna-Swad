import React from 'react';
import { Youtube, Play } from 'lucide-react';
import { SOCIAL_CONFIG } from '../../config/socialConfig';
import './YouTubeFeed.css';

const YouTubeFeed = () => {
  // Load Behold script for live feed
  React.useEffect(() => {
    if (SOCIAL_CONFIG.YOUTUBE_FEED_ID) {
      const s = document.createElement("script");
      s.type = "module";
      s.src = "https://w.behold.so/widget.js";
      document.head.append(s);
    }
  }, []);

  const localVideos = [
    { id: 1, title: 'Making Thekua - Heritage Recipe', thumbnail: '/insta_1.png', link: '#' },
    { id: 2, title: 'Apna Swad Journey', thumbnail: '/insta_3.png', link: '#' },
  ];

  return (
    <section className="youtube-section">
      <div className="container">
        <div className="youtube-header">
          <div className="youtube-title-row">
            <Youtube className="youtube-icon" size={32} />
            <h2 className="heritage-title">On the Tube</h2>
          </div>
          <p className="youtube-subtitle">Watch our heritage stories and recipes {SOCIAL_CONFIG.YOUTUBE_CHANNEL}</p>
        </div>

        <div className="youtube-grid">
          {SOCIAL_CONFIG.YOUTUBE_FEED_ID ? (
            <div className="live-feed-container">
              <behold-widget feed-id={SOCIAL_CONFIG.YOUTUBE_FEED_ID}></behold-widget>
            </div>
          ) : (
            localVideos.map((video) => (
              <a key={video.id} href={video.link} className="youtube-item reveal" target="_blank" rel="noopener noreferrer">
                <div className="video-thumb-wrapper">
                  <img src={video.thumbnail} alt={video.title} />
                  <div className="video-overlay">
                    <Play size={40} fill="white" />
                  </div>
                </div>
                <div className="video-info">
                  <h3>{video.title}</h3>
                </div>
              </a>
            ))
          )}
        </div>
        
        <div className="youtube-footer">
          <a href={`https://youtube.com/${SOCIAL_CONFIG.YOUTUBE_CHANNEL}`} target="_blank" rel="noopener noreferrer" className="btn-premium secondary">
            SUBSCRIBE TO OUR CHANNEL
          </a>
        </div>
      </div>
    </section>
  );
};

export default YouTubeFeed;
