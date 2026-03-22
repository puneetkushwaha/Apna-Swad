import React from 'react';
import './LoadingScreen.css';
import Skeleton from './Skeleton';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loader-content">
        <div className="loader-skeleton-preview">
           <Skeleton type="banner" />
           <div style={{ padding: '20px', width: '100%' }}>
             <Skeleton type="title" />
             <Skeleton type="text" />
             <Skeleton type="text" style={{ width: '80%' }} />
           </div>
        </div>
        <div className="loader-text brand-font">Handcrafting Heritage...</div>
      </div>
    </div>
  );
};

export default LoadingScreen;
