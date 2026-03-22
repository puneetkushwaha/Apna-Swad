import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { Package, Truck, CheckCircle, XCircle, Search, Eye, Edit, Printer, FileText } from 'lucide-react';
import Skeleton from '../components/Loader/Skeleton';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editingTracking, setEditingTracking] = useState(false);
  const [trackingData, setTrackingData] = useState({
    orderStatus: '',
    trackingId: '',
    carrierName: ''
  });
  const [selectedOrderIds, setSelectedOrderIds] = useState([]);
  const [isBulkLoading, setIsBulkLoading] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get('/orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(res.data);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePrintLabel = async (orderId) => {
    try {
      const res = await api.get(`/orders/${orderId}/label`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data && res.data.label_url) {
        window.open(res.data.label_url, '_blank');
      } else {
        alert('Label URL not found. Ensure order is synced and processed in Shiprocket.');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Error generating label');
    }
  };

  const handlePrintInvoice = async (orderId) => {
    try {
      const res = await api.get(`/orders/${orderId}/invoice`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data && res.data.invoice_url) {
        window.open(res.data.invoice_url, '_blank');
      } else {
        alert('Invoice URL not found.');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Error generating invoice');
    }
  };

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/orders/${selectedOrder._id}/status`, trackingData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchOrders();
      setEditingTracking(false);
      setSelectedOrder(null);
      alert('Order updated successfully');
    } catch (err) {
      alert('Error updating order');
    }
  };

  const handleManualSync = async (orderId) => {
    try {
      const res = await api.post(`/orders/${orderId}/sync`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Sync successful!');
      fetchOrders();
    } catch (err) {
      alert(err.response?.data?.message || 'Sync failed');
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = filteredOrders.map(o => o._id);
      setSelectedOrderIds(allIds);
    } else {
      setSelectedOrderIds([]);
    }
  };

  const handleSelectOrder = (orderId) => {
    setSelectedOrderIds(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId) 
        : [...prev, orderId]
    );
  };

  const handleBulkLabels = async () => {
    if (selectedOrderIds.length === 0) return;
    try {
      setIsBulkLoading(true);
      const res = await api.post('/orders/bulk-label', { orderIds: selectedOrderIds }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data && res.data.label_url) {
        window.open(res.data.label_url, '_blank');
      } else {
        alert('Bulk Label URL not found. Ensure selected orders are synced and processed.');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Error generating bulk labels');
    } finally {
      setIsBulkLoading(false);
    }
  };

  const handleBulkInvoices = async () => {
    if (selectedOrderIds.length === 0) return;
    try {
      setIsBulkLoading(true);
      const res = await api.post('/orders/bulk-invoice', { orderIds: selectedOrderIds }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data && res.data.invoice_url) {
        window.open(res.data.invoice_url, '_blank');
      } else {
        alert('Bulk Invoice URL not found.');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Error generating bulk invoices');
    } finally {
      setIsBulkLoading(false);
    }
  };

  const filteredOrders = orders.filter(order => 
    order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status) => {
    switch (status) {
      case 'processing': return <Package size={16} className="text-blue" />;
      case 'shipped': return <Truck size={16} className="text-orange" />;
      case 'delivered': return <CheckCircle size={16} className="text-green" />;
      case 'cancelled': return <XCircle size={16} className="text-red" />;
      default: return null;
    }
  };

  return (
    <div className="admin-orders-page section">
      <div className="container">
        <div className="admin-header-flex">
          <div>
            <h1 className="premium-title">Order Logistics</h1>
            <p className="premium-subtitle">Manage customer deliveries and track heritage snack shipments.</p>
          </div>
          <div className="admin-search-wrapper">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search by Order ID or Customer..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-search-input"
            />
          </div>
        </div>

        {selectedOrderIds.length > 0 && (
          <div className="admin-bulk-actions glass active">
            <div className="bulk-info">
              <span className="count-badge">{selectedOrderIds.length}</span>
              <span>Orders Selected</span>
            </div>
            <div className="bulk-buttons">
              <button 
                className="btn-bulk label" 
                onClick={handleBulkLabels}
                disabled={isBulkLoading}
              >
                {isBulkLoading ? 'Processing...' : <><Printer size={16} /> Bulk Labels</>}
              </button>
              <button 
                className="btn-bulk invoice" 
                onClick={handleBulkInvoices}
                disabled={isBulkLoading}
              >
                {isBulkLoading ? 'Processing...' : <><FileText size={16} /> Bulk Invoices</>}
              </button>
              <button className="btn-bulk clear" onClick={() => setSelectedOrderIds([])}>Clear</button>
            </div>
          </div>
        )}

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: '40px' }}>
                  <input 
                    type="checkbox" 
                    onChange={handleSelectAll}
                    checked={selectedOrderIds.length === filteredOrders.length && filteredOrders.length > 0}
                  />
                </th>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array(5).fill(0).map((_, i) => (
                  <tr key={i}>
                    <td><Skeleton type="text" style={{ width: '20px' }} /></td>
                    <td><Skeleton type="text" style={{ width: '80px' }} /></td>
                    <td><Skeleton type="text" style={{ width: '150px' }} /><Skeleton type="text" style={{ width: '120px', height: '12px' }} /></td>
                    <td><Skeleton type="text" style={{ width: '60px' }} /></td>
                    <td><Skeleton type="text" style={{ width: '100px', height: '24px', borderRadius: '12px' }} /></td>
                    <td><Skeleton type="text" style={{ width: '100px' }} /></td>
                    <td><Skeleton type="text" style={{ width: '100px' }} /></td>
                  </tr>
                ))
              ) : (
                filteredOrders.map(order => (
                  <tr key={order._id} className={selectedOrderIds.includes(order._id) ? 'selected-row' : ''}>
                    <td>
                      <input 
                        type="checkbox" 
                        checked={selectedOrderIds.includes(order._id)}
                        onChange={() => handleSelectOrder(order._id)}
                      />
                    </td>
                    <td data-label="Order ID">#{order._id.slice(-6)}</td>
                    <td data-label="Customer">
                      <div className="customer-info">
                        <span className="customer-name">{order.user?.name}</span>
                        <span className="customer-email">{order.user?.email}</span>
                      </div>
                    </td>
                    <td data-label="Amount" className="amount-cell">₹{order.totalAmount}</td>
                    <td data-label="Status">
                      <span className={`status-badge ${order.orderStatus}`}>
                        {getStatusIcon(order.orderStatus)}
                        {order.orderStatus}
                      </span>
                    </td>
                    <td data-label="Date">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td data-label="Actions" className="actions-cell">
                      <div className="admin-item-actions">
                        {!order.trackingId && (
                          <button className="icon-btn" title="Sync to Shiprocket" onClick={() => handleManualSync(order._id)}>
                            <Truck size={17} />
                          </button>
                        )}
                        <button className="icon-btn" title="View Details" onClick={() => {
                          setSelectedOrder(order);
                          setTrackingData({
                            orderStatus: order.orderStatus,
                            trackingId: order.trackingId || '',
                            carrierName: order.carrierName || ''
                          });
                        }}>
                          <Eye size={17} />
                        </button>
                        <button className="icon-btn" title="Update Logistics" onClick={() => {
                          setSelectedOrder(order);
                          setEditingTracking(true);
                          setTrackingData({
                            orderStatus: order.orderStatus,
                            trackingId: order.trackingId || '',
                            carrierName: order.carrierName || ''
                          });
                        }}>
                          <Edit size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Update Modal */}
        {(selectedOrder && editingTracking) && (
          <div className="admin-modal-overlay">
            <div className="admin-modal glass active">
              <div className="modal-header">
                <h3>Update Order Logistics</h3>
                <button onClick={() => setEditingTracking(false)} className="close-btn">×</button>
              </div>
              <form onSubmit={handleUpdateStatus} className="admin-form-premium">
                <div className="admin-input-group">
                  <label>Order Status</label>
                  <select 
                    className="admin-input-premium"
                    value={trackingData.orderStatus}
                    onChange={(e) => setTrackingData({...trackingData, orderStatus: e.target.value})}
                  >
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div className="admin-input-group" style={{ marginTop: '20px' }}>
                  <label>Tracking ID</label>
                  <input 
                    className="admin-input-premium"
                    placeholder="e.g. AWB12345678"
                    value={trackingData.trackingId}
                    onChange={(e) => setTrackingData({...trackingData, trackingId: e.target.value})}
                  />
                </div>
                <div className="admin-input-group" style={{ marginTop: '20px' }}>
                  <label>Carrier Name</label>
                  <input 
                    className="admin-input-premium"
                    placeholder="e.g. Delhivery, BlueDart"
                    value={trackingData.carrierName}
                    onChange={(e) => setTrackingData({...trackingData, carrierName: e.target.value})}
                  />
                </div>
                <div style={{ marginTop: '30px' }}>
                  <button type="submit" className="btn-primary" style={{ width: '100%' }}>Update Order Logistics</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* View Details Modal */}
        {(selectedOrder && !editingTracking) && (
          <div className="admin-modal-overlay">
            <div className="admin-modal glass active" style={{ maxWidth: '900px' }}>
              <div className="modal-header">
                <h3>Order Details - #{selectedOrder._id}</h3>
                <button onClick={() => setSelectedOrder(null)} className="close-btn">×</button>
              </div>
              <div className="order-detail-grid">
                <div className="detail-section">
                  <h4>Items</h4>
                  <div className="order-items-list-premium">
                    {selectedOrder.items.map((item, idx) => (
                      <div key={idx} className="order-item-row-premium">
                        <div className="item-thumb-wrapper">
                          <img src={item.image} alt={item.name} className="item-thumb-premium" />
                        </div>
                        <div className="item-info-premium">
                          <p className="item-name-premium">{item.name}</p>
                          <span className="item-qty-premium">Quantity: {item.quantity}</span>
                        </div>
                        <p className="item-price-premium">₹{item.price * item.quantity}</p>
                      </div>
                    ))}
                  </div>
                  <div className="order-total-bar-premium">
                    <span>Grand Total</span>
                    <span className="total-amount-premium">₹{selectedOrder.totalAmount}</span>
                  </div>
                </div>
                <div className="detail-section">
                  <div className="shipping-address-premium">
                    <h4>Shipping Address</h4>
                    <div className="address-card-premium">
                      <p className="customer-name-address">{selectedOrder.shippingAddress?.name || selectedOrder.user?.name}</p>
                      <p>{selectedOrder.shippingAddress?.street}</p>
                      <p>{selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state} - {selectedOrder.shippingAddress?.zipCode}</p>
                      <p className="phone-address">📞 {selectedOrder.shippingAddress?.phone}</p>
                    </div>
                  </div>
                  
                  <div className="logistics-ops-premium">
                    <h4>Logistics Operations</h4>
                    <div className="tracking-status-badge">
                      <strong>Status:</strong> <span className={`status-text ${selectedOrder.orderStatus}`}>{selectedOrder.orderStatus}</span>
                    </div>
                    {selectedOrder.trackingId && (
                      <div className="tracking-id-display">
                        <strong>Shiprocket ID:</strong> <code>{selectedOrder.trackingId}</code>
                      </div>
                    )}
                    
                    <div className="admin-actions-grid-premium">
                      <button 
                        className="btn btn-secondary btn-full" 
                        onClick={() => selectedOrder.trackingId ? handlePrintLabel(selectedOrder._id) : alert('Please sync with Shiprocket first to generate label.')}
                      >
                        <Printer size={18} /> Print Shipping Label
                      </button>
                      <button 
                        className="btn btn-outline btn-full" 
                        onClick={() => handlePrintInvoice(selectedOrder._id)}
                      >
                        <FileText size={18} /> Download Tax Invoice
                      </button>
                    </div>
                    {!selectedOrder.trackingId && (
                      <p className="logistics-note">Note: Label will be available once the order is synced with Shiprocket.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
