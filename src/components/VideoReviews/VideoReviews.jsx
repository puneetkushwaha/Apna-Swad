import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import axios from 'axios';
import './VideoReviews.css';

const VideoReviews = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`${apiUrl}/reviews`);
        // Filter active video reviews. Use a reliable fallback video if none found.
        const activeVideos = res.data.filter(r => r.type === 'video' && r.active);
        if (activeVideos.length === 0) {
          setVideos([{
            _id: 'default',
            name: 'Purity Guaranteed',
            videoUrl: 'https://res.cloudinary.com/demo/video/upload/c_fill,w_300,h_400/v1/dog.mp4' 
          }]);
        } else {
          setVideos(activeVideos);
        }
      } catch (err) {
        console.error('Error fetching videos:', err);
      }
    };
    fetchVideos();
  }, [apiUrl]);

  const VideoModal = ({ video, onClose }) => (
    <div className="video-modal-overlay active" onClick={onClose}>
      <div className="video-modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose}>×</button>
        <div className="modal-video-wrapper">
          <video controls autoPlay className="modal-video">
            <source src={video.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="modal-video-info">
          <h3>{video.name}</h3>
          <p>Verified Purchase</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="video-reviews-section">
      <div className="section-header container">
        <h2 className="brand-font">Patron Stories</h2>
        <p className="section-subtitle">A glimpse into the joy we deliver</p>
      </div>
      
      <div className="video-ticker-container">
        <div className="video-track-infinite">
          {[...videos, ...videos].map((video, index) => (
            <div 
              key={`${video._id}-${index}`} 
              className="video-card-ticker"
            >
              <div className="video-thumbnail-wrapper shadow-premium">
                <video 
                  className="ticker-video-element" 
                  muted 
                  loop 
                  autoPlay 
                  playsInline
                  crossOrigin="anonymous"
                  onCanPlay={(e) => {
                    // Stagger start times for more natural feel
                    if (index % 2 === 0) e.target.currentTime = 2;
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.classList.add('video-error');
                  }}
                >
                  <source src={video.videoUrl} type="video/mp4" />
                </video>
                <div className="video-card-overlay">
                  <h4>{video.name}</h4>
                  <span>Verified Patron</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoReviews;
