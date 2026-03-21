import React, { useState } from 'react';
import { Star, X } from 'lucide-react';
import axios from 'axios';
import './ReviewModal.css';

const ReviewModal = ({ product, onClose, onSuccess }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [hover, setHover] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const token = localStorage.getItem('token');
      await axios.post(`${apiUrl}/product-reviews`, {
        productId: product._id,
        rating,
        comment
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lux-modal-overlay">
      <div className="lux-modal-content review-modal-content reveal-sm">
        <div className="modal-header">
          <h3 className="brand-font">Rate this Product</h3>
          <p className="modal-subtitle">Share your experience with {product.name}</p>
          <button className="modal-close" onClick={onClose}><X size={20}/></button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="rating-input-group">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className={`star-btn ${(hover || rating) >= star ? 'active' : ''}`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
              >
                <Star size={32} fill={(hover || rating) >= star ? '#f5a623' : 'none'} color="#f5a623" />
              </button>
            ))}
          </div>

          <div className="form-group">
            <label>Your Feedback</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="How was the taste? Was it fresh?"
              required
              rows={4}
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <div className="modal-actions">
            <button type="submit" className="btn-save" disabled={loading}>
              {loading ? 'Submitting...' : 'Post Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
