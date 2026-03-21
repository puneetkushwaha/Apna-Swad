import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { MapPin, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './PincodeModal.css';

const PincodeModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [pincode, setPincode] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, updateUser } = useAuth();

  useEffect(() => {
    // Check if pincode exists in localStorage or user profile
    const storedPincode = localStorage.getItem('userPincode');
    if (!storedPincode && (!user || !user.pincode)) {
      setIsOpen(true);
    }

    const handleOpen = () => setIsOpen(true);
    window.addEventListener('openPincodeModal', handleOpen);
    return () => window.removeEventListener('openPincodeModal', handleOpen);
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pincode || pincode.length < 6) return;

    setLoading(true);
    try {
      localStorage.setItem('userPincode', pincode);
      
      if (user) {
        
        const token = localStorage.getItem('token');
        const res = await api.post('/user/pincode', { pincode }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        updateUser(res.data); // Update global user state
      }
      
      setIsOpen(false);
    } catch (err) {
      console.error('Error saving pincode:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="pincode-modal-overlay">
      <div className="pincode-modal shadow-premium">
        <button className="close-btn" onClick={() => setIsOpen(false)}><X size={20} /></button>
        
        <div className="modal-header">
          <div className="pin-icon-wrapper">
            <MapPin size={24} className="pin-icon" />
          </div>
          <h2 className="brand-font">Check Delivery</h2>
          <p>Please enter your pincode to check availability in your area</p>
        </div>

        <form onSubmit={handleSubmit} className="pincode-form">
          <input 
            type="text" 
            placeholder="Enter Pincode (e.g. 110001)"
            value={pincode}
            onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
            maxLength={6}
            required
          />
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Saving...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PincodeModal;
