import React from 'react';
import api from '../../api/api';
import './JanakiStory.css';

const DhyantisStory = () => {
  const [story, setStory] = React.useState({
    videoUrl: '/video.mp4',
    videoTag: 'ZERO PRESERVATIVES',
    caption: `The term 'Apna Swad' is now being searched 1000 times on Google every month, which is testimony to the increasing awareness of sustainable snacking without palm oil and Preservatives 🌿`
  });

  React.useEffect(() => {
    const fetchStory = async () => {
      try {
        
        const res = await api.get('/brand-story');
        if (res.data) {
          setStory({
            videoUrl: res.data.videoUrl || '/video.mp4',
            videoTag: res.data.videoTag || 'ZERO PRESERVATIVES',
            caption: res.data.caption || story.caption
          });
        }
      } catch (err) {
        console.error('Error fetching Dhyanti story:', err);
      }
    };
    fetchStory();
  }, [story.caption]);

  return (
    <section className="janaki-story-section">
      <div className="container">
        <div className="section-header text-center">
          <div className="title-divider">
            <span className="line"></span>
            <h2 className="brand-font">Made with Love by Dhyanti's</h2>
            <span className="line"></span>
          </div>
        </div>

        <div className="video-feature-container">
          <div className="video-frame shadow-premium">
            <div className="corner corner-tl"></div>
            <div className="corner corner-tr"></div>
            <div className="corner corner-bl"></div>
            <div className="corner corner-br"></div>

            <div className="video-thumbnail">
              <video
                src={story.videoUrl}
                className="feature-video"
                controls
                muted
                playsInline
              />
              <div className="preservative-badge">
                {story.videoTag}
              </div>
            </div>
          </div>

          <div className="story-caption text-center">
            <p dangerouslySetInnerHTML={{ __html: story.caption }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DhyantisStory;
