import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/api';
import { User, Mail, LogOut, ArrowLeft, Phone, MapPin, Camera, Edit2, Save, X, Briefcase, Truck, Star } from 'lucide-react';
import ReviewModal from '../components/Modals/ReviewModal';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user, logout, updateUser, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('personal'); // personal, orders, settings
  const [orders, setOrders] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null); // The order currently being edited
  const [editOrderAddress, setEditOrderAddress] = useState({
    street: '', city: '', state: '', zipCode: '', phone: ''
  });

  // Review State
  const [reviewProduct, setReviewProduct] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);

  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash === 'orders' || hash === 'settings') {
      setActiveTab(hash);
    } else if (hash === 'chat') {
      // Logic for chat can be added here if needed
    }
  }, [location.hash]);

  useEffect(() => {
    if (activeTab === 'orders' && user) {
      fetchUserOrders();
    }
  }, [activeTab, user]);

  const fetchUserOrders = async () => {
    setLoading(true);
    try {
      
      const token = localStorage.getItem('token');
      const res = await api.get('/orders/myorders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(res.data);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;
    
    setLoading(true);
    try {
      
      const token = localStorage.getItem('token');
      await api.put('/orders/${orderId}/cancel', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchUserOrders();
      alert('Order cancelled successfully');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to cancel order');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateOrderAddress = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      
      const token = localStorage.getItem('token');
      await api.put('/orders/${editingOrder._id}/update-shipping', {
        shippingAddress: editOrderAddress
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditingOrder(null);
      fetchUserOrders();
      alert('Shipping address updated successfully');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update address');
    } finally {
      setLoading(false);
    }
  };

  const initEditOrder = (order) => {
    setEditingOrder(order);
    setEditOrderAddress({
      street: order.shippingAddress.street || '',
      city: order.shippingAddress.city || '',
      state: order.shippingAddress.state || '',
      zipCode: order.shippingAddress.zipCode || '',
      phone: order.shippingAddress.phone || ''
    });
  };

  const openReviewModal = (product) => {
    setReviewProduct(product);
    setShowReviewModal(true);
  };

  const isWithin24Hours = (createdAt) => {
    const orderDate = new Date(createdAt);
    const now = new Date();
    const hoursDiff = Math.abs(now - orderDate) / 36e5;
    return hoursDiff <= 24;
  };
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    altPhone: '',
    address: {
      street: '',
      landmark: '',
      city: '',
      state: '',
      pincode: ''
    }
  });

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      navigate('/login');
    } else {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        altPhone: user.altPhone || '',
        address: {
          street: user.address?.street || '',
          landmark: user.address?.landmark || '',
          city: user.address?.city || '',
          state: user.address?.state || '',
          pincode: user.address?.pincode || user.pincode || ''
        }
      });
    }
  }, [user, authLoading, navigate]);

  if (authLoading) {
    return (
      <div className="profile-container" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div className="premium-loader"></div>
      </div>
    );
  }

  if (!user) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: { ...prev.address, [field]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append('avatar', file);

    setLoading(true);
    try {
      
      const token = localStorage.getItem('token');
      const res = await api.post('/user/avatar', uploadData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      updateUser(res.data);
    } catch (err) {
      console.error('Error uploading avatar:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      
      const token = localStorage.getItem('token');
      const res = await api.put('/user/profile', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      updateUser(res.data);
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="profile-container section">
      <div className="profile-card reveal">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} /> Back
        </button>
        
        <div className="profile-layout">
          {/* Sidebar */}
          <aside className="profile-sidebar">
            <div className="avatar-upload-wrapper">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="profile-avatar-large" />
              ) : (
                <div className="avatar-placeholder-large">
                  <User size={80} strokeWidth={1} />
                </div>
              )}
              <label htmlFor="avatar-input" className="avatar-edit-label">
                <Camera size={20} />
                <input 
                  id="avatar-input" 
                  type="file" 
                  hidden 
                  onChange={handleAvatarChange} 
                  accept="image/*"
                />
              </label>
            </div>

            <div className="user-main-info">
              <h2 className="brand-font">{user.name}</h2>
              <span className="user-badge">{user.role}</span>
              {user.createdAt ? (
                <p className="member-since">Member Since: {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
              ) : (
                <p className="member-since">Elite Premium Member</p>
              )}
            </div>

            <div className="profile-stats">
              <div className="stat-item">
                <span className="stat-value">{orders.length}</span>
                <span className="stat-label">Orders</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-value">0</span>
                <span className="stat-label">Reviews</span>
              </div>
            </div>

            <nav className="sidebar-nav">
              <button 
                className={`sidebar-btn ${activeTab === 'personal' ? 'active' : ''}`}
                onClick={() => setActiveTab('personal')}
              >
                <User size={18} /> 
                <span className="btn-text">Profile Details</span>
                <Edit2 size={14} className="hover-icon" />
              </button>
              <button 
                className={`sidebar-btn ${activeTab === 'orders' ? 'active' : ''}`}
                onClick={() => setActiveTab('orders')}
              >
                <Briefcase size={18} /> 
                <span className="btn-text">My Orders</span>
                <ArrowLeft size={14} className="hover-icon" style={{transform: 'rotate(180deg)'}} />
              </button>
              <div className="sidebar-spacer"></div>
              <button className="sidebar-btn logout" onClick={handleLogout}>
                <LogOut size={18} /> 
                <span className="btn-text">Sign Out</span>
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="profile-content-area">
            {activeTab === 'personal' && (
              <div className="tab-content">
                <div className="section-header">
                  <h3>Personal Information</h3>
                  {!isEditing && (
                    <button className="edit-toggle-btn" onClick={() => setIsEditing(true)}>
                      <Edit2 size={16} /> Edit Info
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <form onSubmit={handleSubmit} className="profile-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label>Full Name</label>
                        <input name="name" value={formData.name} onChange={handleInputChange} required />
                      </div>
                      <div className="form-group">
                        <label>Email Address</label>
                        <input value={user.email} disabled />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Phone Number</label>
                        <input name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Primary Phone" />
                      </div>
                      <div className="form-group">
                        <label>Alt Phone</label>
                        <input name="altPhone" value={formData.altPhone} onChange={handleInputChange} placeholder="Secondary Phone" />
                      </div>
                    </div>

                    <div className="section-header" style={{marginTop: '20px'}}>
                      <h3>Delivery Address</h3>
                    </div>

                    <div className="form-group">
                      <label>Street / Area</label>
                      <input name="address.street" value={formData.address.street} onChange={handleInputChange} placeholder="House No, Street Name" />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>City</label>
                        <input name="address.city" value={formData.address.city} onChange={handleInputChange} />
                      </div>
                      <div className="form-group">
                        <label>State</label>
                        <input name="address.state" value={formData.address.state} onChange={handleInputChange} />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Landmark</label>
                        <input name="address.landmark" value={formData.address.landmark} onChange={handleInputChange} />
                      </div>
                      <div className="form-group">
                        <label>Pincode</label>
                        <input name="address.pincode" value={formData.address.pincode} onChange={handleInputChange} maxLength={6} />
                      </div>
                    </div>

                    <div className="form-actions">
                      <button type="submit" className="btn-save" disabled={loading}>
                        {loading ? 'Saving...' : <><Save size={18} /> Save Changes</>}
                      </button>
                      <button type="button" className="btn-cancel" onClick={() => setIsEditing(false)}>
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="profile-info-grid">
                    <div className="info-block">
                      <label>Name</label>
                      <p>{user.name}</p>
                    </div>
                    <div className="info-block">
                      <label>Email</label>
                      <p>{user.email}</p>
                    </div>
                    <div className="info-block">
                      <label>Phone</label>
                      <p>{user.phone || 'Not provided'}</p>
                    </div>
                    <div className="info-block">
                      <label>Alt Phone</label>
                      <p>{user.altPhone || 'Not provided'}</p>
                    </div>
                    <div className="info-block full-width">
                      <label>Delivery Address</label>
                      <div className="address-preview">
                        {user.address?.street ? (
                          <>
                            <p>{user.address.street}</p>
                            <p>{user.address.city}, {user.address.state} - {user.address.pincode}</p>
                            {user.address.landmark && <p className="landmark">Landmark: {user.address.landmark}</p>}
                          </>
                        ) : (
                          <p className="not-provided">No address details saved yet.</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="tab-content">
                <div className="section-header">
                  <h3>Order History</h3>
                </div>
                
                {orders.length > 0 ? (
                  <div className="orders-timeline">
                    {orders.map(order => (
                      <div key={order._id} className="order-premium-card reveal">
                        <div className="order-card-header">
                          <div className="id-date">
                            <span className="order-id">#{order._id.slice(-8).toUpperCase()}</span>
                            <span className="order-date">{new Date(order.createdAt).toLocaleDateString()}</span>
                          </div>
                          <span className={`status-badge-mini ${order.orderStatus}`}>{order.orderStatus}</span>
                        </div>
                        
                        <div className="order-items-preview">
                          {order.items.slice(0, 3).map((item, idx) => (
                            <div key={idx} className="mini-item-wrapper">
                              <img src={item.image} alt={item.name} className="mini-item-thumb" title={item.name} />
                              {order.orderStatus === 'delivered' && (
                                <button 
                                  className="review-trigger-btn" 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openReviewModal({ _id: item.product, name: item.name });
                                  }}
                                  title="Write a Review"
                                >
                                  <Star size={12} fill="#f5a623" />
                                </button>
                              )}
                            </div>
                          ))}
                          {order.items.length > 3 && <span className="more-items">+{order.items.length - 3} more</span>}
                        </div>

                         <div className="order-card-footer">
                          <div className="total-info">
                            <label>Total Amount</label>
                            <p>₹{order.totalAmount}</p>
                          </div>
                          
                          <div className="order-actions-wrapper">
                            {/* Action Buttons for 24h limit */}
                            {order.orderStatus !== 'cancelled' && 
                             order.orderStatus !== 'delivered' && 
                             order.orderStatus !== 'shipped' && 
                             isWithin24Hours(order.createdAt) && (
                              <div className="user-actions">
                                <button className="btn-mini-outline" onClick={() => initEditOrder(order)}>Edit Address</button>
                                <button className="btn-mini-danger" onClick={() => handleCancelOrder(order._id)}>Cancel</button>
                              </div>
                            )}

                            {order.trackingId ? (
                              <div className="tracking-badge">
                                <Truck size={14} />
                                <span>{order.carrierName}: {order.trackingId}</span>
                              </div>
                            ) : (
                              <div className="tracking-status">
                                <p>{order.orderStatus === 'processing' ? 'Preparing your snacks...' : 
                                    order.orderStatus === 'cancelled' ? 'Order Cancelled' : 'Awaiting tracking details'}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <Briefcase size={48} strokeWidth={1} style={{marginBottom: '20px', opacity: 0.3}} />
                    <h3>No Orders Yet</h3>
                    <p>When you buy our heritage snacks, they will appear here!</p>
                    <button className="btn btn-primary" style={{marginTop: '20px'}} onClick={() => navigate('/')}>
                      Start Shopping
                    </button>
                  </div>
                )}
                
                {/* Edit Order Address Modal/Overlay */}
                {editingOrder && (
                  <div className="lux-modal-overlay">
                    <div className="lux-modal-content reveal-sm">
                      <div className="modal-header">
                        <h3 className="brand-font">Update Shipping Address</h3>
                        <p className="modal-subtitle">Update your delivery details for order #{editingOrder._id.slice(-8).toUpperCase()}</p>
                        <button className="modal-close" onClick={() => setEditingOrder(null)}><X size={20}/></button>
                      </div>
                      
                      <form onSubmit={handleUpdateOrderAddress} className="modal-form">
                        <div className="form-group">
                          <label>Street Address</label>
                          <input 
                            value={editOrderAddress.street} 
                            onChange={(e) => setEditOrderAddress({...editOrderAddress, street: e.target.value})} 
                            required
                          />
                        </div>
                        <div className="form-row">
                          <div className="form-group">
                            <label>City</label>
                            <input 
                              value={editOrderAddress.city} 
                              onChange={(e) => setEditOrderAddress({...editOrderAddress, city: e.target.value})} 
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label>State</label>
                            <input 
                              value={editOrderAddress.state} 
                              onChange={(e) => setEditOrderAddress({...editOrderAddress, state: e.target.value})} 
                              required
                            />
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group">
                            <label>Pincode</label>
                            <input 
                              value={editOrderAddress.zipCode} 
                              onChange={(e) => setEditOrderAddress({...editOrderAddress, zipCode: e.target.value})} 
                              required
                              maxLength={6}
                            />
                          </div>
                          <div className="form-group">
                            <label>Phone Number</label>
                            <input 
                              value={editOrderAddress.phone} 
                              onChange={(e) => setEditOrderAddress({...editOrderAddress, phone: e.target.value})} 
                              required
                              maxLength={10}
                            />
                          </div>
                        </div>
                        <div className="modal-actions">
                          <button type="submit" className="btn-save" disabled={loading}>
                            {loading ? 'Updating...' : 'Save New Address'}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
        
        {showReviewModal && reviewProduct && (
          <ReviewModal 
            product={reviewProduct} 
            onClose={() => setShowReviewModal(false)}
            onSuccess={() => {
              alert('Review submitted successfully!');
              // Optionally fetch stats again
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
