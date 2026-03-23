import React, { useState, useEffect } from 'react';
import api from '../api/api';
import './Admin.css';

const AdminPromos = () => {
    const [settings, setSettings] = useState({
        b2g1: { isEnabled: false, minQty: 3 },
        firstOrders: { isEnabled: false, discountValue: 50, orderLimit: 100 },
        referral: { isEnabled: true, targetCount: 5 }
    });
    const [bulkCoupon, setBulkCoupon] = useState({
        quantity: 10,
        prefix: 'SAVE',
        discountValue: 100,
        discountType: 'flat',
        expiryDate: '',
        maxUses: 1
    });
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        setLoading(true);
        try {
            const [settingsRes, couponsRes] = await Promise.all([
                api.getPromoSettings(),
                api.getCoupons()
            ]);
            if (settingsRes.data) setSettings(settingsRes.data);
            if (couponsRes.data) setCoupons(couponsRes.data);
        } catch (err) {
            console.error('Error fetching initial data', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchCoupons = async () => {
        try {
            const res = await api.getCoupons();
            setCoupons(res.data);
        } catch (err) {
            console.error('Error fetching coupons', err);
        }
    };

    const handleUpdateSettings = async () => {
        try {
            await api.updatePromoSettings(settings);
            setMessage('Settings updated successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            setMessage('Error updating settings: ' + err.message);
        }
    };

    const handleGenerateCoupons = async () => {
        try {
            const res = await api.generateBulkCoupons(bulkCoupon);
            setMessage(res.data.message);
            fetchCoupons(); // Refresh the list
            setTimeout(() => setMessage(''), 5000);
        } catch (err) {
            setMessage('Error generating coupons: ' + err.message);
        }
    };

    const copyToClipboard = (code) => {
        navigator.clipboard.writeText(code);
        alert('Code Copied: ' + code);
    };

    if (loading) return <div className="section container">Loading Promotion Hub...</div>;

    return (
        <div className="admin-promos-page section">
            <div className="container">
                <div className="admin-header-flex">
                    <div>
                        <h1 className="premium-title">Promotion Hub</h1>
                        <p className="premium-subtitle">Manage dynamic offers and elite coupon campaigns.</p>
                    </div>
                </div>

                {message && <div className="alert-banner">{message}</div>}

                <div className="admin-items-grid-premium">
                    {/* B2G1 Section */}
                    <div className="admin-card-large">
                        <h3>Buy 2 Get 1 Free (B2G1)</h3>
                        <div className="input-group-row">
                            <label className="switch">
                                <input 
                                    type="checkbox" 
                                    checked={settings.b2g1.isEnabled} 
                                    onChange={(e) => setSettings({...settings, b2g1: {...settings.b2g1, isEnabled: e.target.checked}})} 
                                />
                                <span className="slider round"></span>
                            </label>
                            <span style={{fontWeight: 600, color: 'var(--admin-accent)'}}>Active Status</span>
                        </div>
                        <button onClick={handleUpdateSettings} className="btn-primary">Update B2G1 Setting</button>
                    </div>

                    {/* First 100 Orders Section */}
                    <div className="admin-card-large">
                        <h3>Elite Welcome Program</h3>
                        <div className="input-group-row">
                            <label className="switch">
                                <input 
                                    type="checkbox" 
                                    checked={settings.firstOrders.isEnabled} 
                                    onChange={(e) => setSettings({...settings, firstOrders: {...settings.firstOrders, isEnabled: e.target.checked}})} 
                                />
                                <span className="slider round"></span>
                            </label>
                            <span style={{fontWeight: 600, color: 'var(--admin-accent)'}}>Active Status</span>
                        </div>
                        <div className="flex-inputs-premium">
                            <div className="admin-input-group">
                                <label>Discount Amount (Rs)</label>
                                <input 
                                    type="number" 
                                    className="admin-input-premium"
                                    value={settings.firstOrders.discountValue} 
                                    onChange={(e) => setSettings({...settings, firstOrders: {...settings.firstOrders, discountValue: parseInt(e.target.value)}})} 
                                />
                            </div>
                            <div className="admin-input-group">
                                <label>Target Order Count</label>
                                <input 
                                    type="number" 
                                    className="admin-input-premium"
                                    value={settings.firstOrders.orderLimit} 
                                    onChange={(e) => setSettings({...settings, firstOrders: {...settings.firstOrders, orderLimit: parseInt(e.target.value)}})} 
                                />
                            </div>
                        </div>
                        <button onClick={handleUpdateSettings} className="btn-primary">Update Welcome Logic</button>
                    </div>

                    {/* Referral Section */}
                    <div className="admin-card-large">
                        <h3>Referral Heritage System</h3>
                        <div className="input-group-row">
                            <label className="switch">
                                <input 
                                    type="checkbox" 
                                    checked={settings.referral.isEnabled} 
                                    onChange={(e) => setSettings({...settings, referral: {...settings.referral, isEnabled: e.target.checked}})} 
                                />
                                <span className="slider round"></span>
                            </label>
                            <span style={{fontWeight: 600, color: 'var(--admin-accent)'}}>Active Status</span>
                        </div>
                        <div className="flex-inputs-premium">
                            <div className="admin-input-group">
                                <label>Required Successful Referrals</label>
                                <input 
                                    type="number" 
                                    className="admin-input-premium"
                                    value={settings.referral.targetCount} 
                                    onChange={(e) => setSettings({...settings, referral: {...settings.referral, targetCount: parseInt(e.target.value)}})} 
                                />
                            </div>
                        </div>
                        <button onClick={handleUpdateSettings} className="btn-primary">Update Referral Config</button>
                    </div>

                    {/* Bulk Coupon Generation */}
                    <div className="admin-card-large">
                        <h3>Bulk Coupon Architect</h3>
                        <div className="flex-inputs-premium">
                            <div className="admin-input-group">
                                <label>Batch Quantity</label>
                                <input 
                                    type="number" 
                                    className="admin-input-premium"
                                    value={bulkCoupon.quantity} 
                                    onChange={(e) => setBulkCoupon({...bulkCoupon, quantity: parseInt(e.target.value)})} 
                                />
                            </div>
                            <div className="admin-input-group">
                                <label>Code Prefix</label>
                                <input 
                                    type="text" 
                                    className="admin-input-premium"
                                    placeholder="e.g. FESTIVAL"
                                    value={bulkCoupon.prefix} 
                                    onChange={(e) => setBulkCoupon({...bulkCoupon, prefix: e.target.value.toUpperCase()})} 
                                />
                            </div>
                            <div className="admin-input-group">
                                <label>Reward Value</label>
                                <input 
                                    type="number" 
                                    className="admin-input-premium"
                                    value={bulkCoupon.discountValue} 
                                    onChange={(e) => setBulkCoupon({...bulkCoupon, discountValue: parseInt(e.target.value)})} 
                                />
                            </div>
                            <div className="admin-input-group">
                                <label>Type</label>
                                <select 
                                    className="admin-input-premium"
                                    value={bulkCoupon.discountType} 
                                    onChange={(e) => setBulkCoupon({...bulkCoupon, discountType: e.target.value})}
                                >
                                    <option value="flat">Flat Cash (Rs)</option>
                                    <option value="percentage">Percentage (%)</option>
                                </select>
                            </div>
                        </div>
                        <button onClick={handleGenerateCoupons} className="btn-primary">Create Elite Batch</button>
                    </div>
                </div>

                {/* Coupon List Table */}
                <div className="admin-card-large mt-4">
                    <h3>Recently Generated Elite Coupons</h3>
                    <div className="coupon-history-list">
                        <table>
                            <thead>
                                <tr>
                                    <th>Code</th>
                                    <th>Value</th>
                                    <th>Uses</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {coupons.map((coupon) => (
                                    <tr key={coupon._id}>
                                        <td className="coupon-code-cell">{coupon.code}</td>
                                        <td>{coupon.discountValue}{coupon.discountType === 'percentage' ? '%' : '₹'}</td>
                                        <td>{coupon.usedCount}/{coupon.maxUses}</td>
                                        <td>
                                            <span className={`status-tag ${coupon.isActive ? 'active' : 'inactive'}`}>
                                                {coupon.isActive ? 'Active' : 'Expired'}
                                            </span>
                                        </td>
                                        <td>
                                            <button className="btn-small-outline" onClick={() => copyToClipboard(coupon.code)}>Copy</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {coupons.length === 0 && <p className="text-center py-4">No coupons generated yet.</p>}
                    </div>
                </div>
            </div>
            <style jsx="true">{`
                .coupon-history-list {
                    max-height: 500px;
                    overflow-y: auto;
                    margin-top: 20px;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                th {
                    text-align: left;
                    padding: 12px;
                    background: var(--admin-accent-soft);
                    color: var(--admin-accent);
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                td {
                    padding: 15px 12px;
                    border-bottom: 1px solid #eee;
                    font-size: 0.9rem;
                }
                .coupon-code-cell {
                    font-family: monospace;
                    font-weight: 700;
                    color: var(--admin-accent);
                    letter-spacing: 1px;
                }
                .status-tag {
                    padding: 4px 10px;
                    border-radius: 20px;
                    font-size: 0.75rem;
                    font-weight: 700;
                }
                .status-tag.active {
                    background: #e8f5e9;
                    color: #2e7d32;
                }
                .status-tag.inactive {
                    background: #ffebee;
                    color: #c62828;
                }
                .btn-small-outline {
                    background: transparent;
                    border: 1px solid var(--admin-accent);
                    color: var(--admin-accent);
                    padding: 5px 15px;
                    border-radius: 12px;
                    cursor: pointer;
                    font-size: 0.8rem;
                    transition: all 0.2s;
                }
                .btn-small-outline:hover {
                    background: var(--admin-accent);
                    color: white;
                }
            `}</style>
        </div>
    );
};

export default AdminPromos;
