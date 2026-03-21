import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { Linkedin } from 'lucide-react';
import './BrandJourney.css';

const BrandJourney = () => {
  const navigate = useNavigate();
  const [story, setStory] = useState(null);
  

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const res = await api.get('/brand-story');
        setStory(res.data);
      } catch (err) {
        console.error("Error fetching story:", err);
      }
    };
    fetchStory();
  }, []);

  const founders = story?.founders || [
    {
      name: 'Jayanta',
      title: 'Founder & Visionary',
      image: '/images/vision_founder.png',
      linkedin: '#'
    },
    {
      name: 'Kailash',
      title: 'Co-Founder & Operations',
      image: '/images/vision_festival.png',
      linkedin: '#'
    }
  ];

  const paragraphs = story?.paragraphs || [
    "The journey of Apna Swad began with a simple curiosity that transformed into a mission. Driven by Jayanta's vision for hygiene and Kailash's passion for tradition, we're bringing back authentic flavors safely."
  ];

  const timeline = [
    {
      id: '01',
      title: 'The Beginning',
      desc: 'At just 18, Jayanta recognized the critical need for hygienic traditional snacks.'
    },
    {
      id: '02',
      title: 'The First Step',
      desc: 'Partnering with Kailash to bring pure, handcrafted thekua to families everywhere.'
    },
    {
      id: '03',
      title: 'Today & Beyond',
      desc: 'A growing community movement restoring trust in India\'s favorite snacks.'
    }
  ];

  return (
    <section className="brand-journey-section">
      <div className="container">
        <div className="story-header">
          <p className="section-subtitle">OUR STORY</p>
          <h2 className="brand-font main-title">From Craving to Purpose</h2>
          <p className="story-intro">
            {paragraphs.map((p, i) => (
              <React.Fragment key={i}>
                {p} <br /><br />
              </React.Fragment>
            ))}
          </p>
        </div>

        <div className="founders-grid">
          {founders.map((founder, index) => (
            <div key={index} className={`founder-card shadow-premium ${index === 1 ? 'float-slow' : 'float-slow'}`} style={{ animationDelay: `${index * 0.5}s` }}>
              <div className="founder-image-wrapper">
                <img src={founder.image} alt={founder.name} className="founder-image" crossOrigin="anonymous" />
              </div>
              <div className="founder-info">
                <h3>{founder.name}</h3>
                <p>{founder.title}</p>
                <a href={founder.linkedin} className="linkedin-link"><Linkedin size={18} /></a>
              </div>
            </div>
          ))}
        </div>

        <div className="timeline-grid">
          {timeline.map((item, index) => (
            <div key={index} className="timeline-card glass-premium">
              <span className="timeline-number">{item.id}</span>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="story-actions">
          <button className="btn btn-primary-elite" onClick={() => navigate('/vision')}>Our Vision</button>
          <button className="btn btn-outline-elite" onClick={() => navigate('/#shop')}>Experience the Taste</button>
        </div>
      </div>
    </section>
  );
};

export default BrandJourney;
