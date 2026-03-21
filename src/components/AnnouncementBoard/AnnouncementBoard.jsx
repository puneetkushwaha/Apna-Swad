import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapPin } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './AnnouncementBoard.css';

const AnnouncementBoard = () => {
  const [announcement, setAnnouncement] = useState('');
  const { user } = useAuth();
  const [displayPincode, setDisplayPincode] = useState('');

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'import.meta.env.VITE_API_URL';
        const res = await axios.get(`${apiUrl}/announcements`);
        if (res.data && res.data.isActive) {
          setAnnouncement(res.data.text);
        }
      } catch (err) {
        console.error('Error fetching announcement:', err);
      }
    };
    fetchAnnouncement();
  }, []);

  useEffect(() => {
    const pincode = user?.pincode || localStorage.getItem('userPincode');
    if (pincode) {
      setDisplayPincode(pincode);
    }
  }, [user]);

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
        
        <div className="pincode-section">
          {displayPincode ? (
            <div className="pincode-display">
              <span className="pincode-text">{displayPincode}</span>
              <MapPin size={14} className="pin-icon-small" />
            </div>
          ) : (
            <div className="pincode-display unassigned" onClick={() => window.dispatchEvent(new CustomEvent('openPincodeModal'))}>
              <span>Enter Pincode</span>
              <MapPin size={14} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBoard;
