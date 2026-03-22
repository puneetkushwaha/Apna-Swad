import React from 'react';
import './LoadingScreen.css';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loader-content">
        <div className="loader-logo">
          <img src="/mascot_logo.png" alt="Apna Swad" className="loader-mascot" />
          <div className="loader-ring"></div>
        </div>
        <div className="loader-text brand-font">Handcrafting Heritage...</div>
      </div>
    </div>
  );
};

export default LoadingScreen;
