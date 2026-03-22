import React from 'react';
import './Skeleton.css';

const Skeleton = ({ type, className = '', style = {} }) => {
  return (
    <div 
      className={`skeleton ${type} ${className}`} 
      style={style}
    ></div>
  );
};

export default Skeleton;
