import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BrandStory = () => {
  const [story, setStory] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const res = await axios.get(`${apiUrl}/brand-story`);
        setStory(res.data);
      } catch (err) {
        console.error('Error fetching story:', err);
      }
    };
    fetchStory();
  }, []);

  if (!story) return null;

  return (
    <section className="brand-story" id="about">
      <div className="container story-content">
        <div className="story-image">
          <img src={story.imageUrl} alt="Our Story" />
        </div>
        <div className="story-text">
          <span className="story-tag">{story.subtitle}</span>
          <h2 className="story-title">{story.title}</h2>
          {story.paragraphs.map((para, index) => (
            <p key={index}>{para}</p>
          ))}
          <button className="btn btn-primary">Read More</button>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
