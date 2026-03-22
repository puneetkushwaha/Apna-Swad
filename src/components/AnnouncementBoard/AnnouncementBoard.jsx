import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { useAuth } from '../../context/AuthContext';
import './AnnouncementBoard.css';

const AnnouncementBoard = () => {
  const [announcement, setAnnouncement] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        
        const res = await api.get('/announcements');
        if (res.data && res.data.isActive) {
          setAnnouncement(res.data.text);
        }
      } catch (err) {
        console.error('Error fetching announcement:', err);
      }
    };
    fetchAnnouncement();
  }, []);


  // Always show the board if not on admin path (handled in App.jsx)
  // We remove the conditional null return to ensure the layout remains consistent
  // and users can always see the pincode entry point.

  return (
    <div className="announcement-board">
      <div className="container announcement-flex">
        <div className="ticker-section">
          <div className="ticker-wrapper">
            <div className="ticker-text">
              {announcement ? (
                <>
                  <span>{announcement}</span>
                  <span>{announcement}</span>
                  <span>{announcement}</span>
                </>
              ) : (
                <>
                  <span>SALE SALE SALE - EXCLUSIVE OFFERS INSIDE! • Heritage of Taste • Premium Quality Ingredients • </span>
                  <span>SALE SALE SALE - EXCLUSIVE OFFERS INSIDE! • Heritage of Taste • Premium Quality Ingredients • </span>
                  <span>SALE SALE SALE - EXCLUSIVE OFFERS INSIDE! • Heritage of Taste • Premium Quality Ingredients • </span>
                </>
              )}
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default AnnouncementBoard;
