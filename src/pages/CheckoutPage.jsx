import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { 
    ChevronLeft, 
    ShieldCheck, 
    Truck, 
    MapPin, 
    CheckCircle2, 
    ArrowRight,
    ShoppingBag,
    User,
    Lock,
    Phone
} from 'lucide-react';
import './CheckoutPage.css';

const INDIAN_STATES = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", 
    "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", 
    "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", 
    "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", 
    "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

const CheckoutPage = () => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const { user, token, updateUser } = useAuth();
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [touched, setTouched] = useState({});
    const [saveToProfile, setSaveToProfile] = useState(true);
    const [paymentType, setPaymentType] = useState('online'); // 'online' or 'cod'

    const isLadduBypass = cartItems.length === 1 && 
                         cartItems[0].name === "Artisanal Besan Ladoo" && 
                         cartItems[0].quantity === 1;

    const [shippingAddress, setShippingAddress] = useState({
        fullName: user?.name || '',
        street: user?.address?.street || '',
        landmark: user?.address?.landmark || '',
        city: user?.address?.city || '',
        state: user?.address?.state || '',
        zipCode: user?.address?.pincode || user?.pincode || '',
        phone: user?.phone || ''
    });

    useEffect(() => {
        if (user) {
            setShippingAddress(prev => ({
                ...prev,
                fullName: user.name || prev.fullName,
                street: user.address?.street || prev.street,
                landmark: user.address?.landmark || prev.landmark,
                city: user.address?.city || prev.city,
                state: user.address?.state || prev.state,
                zipCode: user.address?.pincode || user.pincode || prev.zipCode,
                phone: user.phone || prev.phone
            }));
        }
    }, [user]);

    const handleAddressChange = (e) => {
        setShippingAddress({
            ...shippingAddress,
            [e.target.name]: e.target.value
        });
    };

    const handleBlur = (field) => {
        setTouched({ ...touched, [field]: true });
    };

    const validateInfo = () => {
        const { fullName, street, city, state, zipCode, phone } = shippingAddress;
        if (!fullName || !street || !city || !state || !zipCode || !phone) {
            alert('Please fill all required shipping information.');
            return false;
        }
        if (!/^\d{6}$/.test(zipCode)) {
            alert('Please enter a valid 6-digit Pincode.');
            return false;
        }
        if (!/^\d{10}$/.test(phone)) {
            alert('Please enter a valid 10-digit mobile number.');
            return false;
        }
        return true;
    };

    const nextStep = (e) => {
        e.preventDefault();
        if (step === 1 && validateInfo()) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setStep(2);
        }
    };

    const performPayment = async () => {
        if (isLadduBypass) {
            await handleFreeOrder();
            return;
        }

        if (paymentType === 'cod') {
            await handleCodOrder();
            return;
        }

        setLoading(true);
        // ... (rest of online payment logic)
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const { data: orderData } = await axios.post(`${apiUrl}/payment/create-order`, {
                amount: cartTotal,
                currency: 'INR'
            });

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: orderData.amount,
                currency: orderData.currency,
                name: "Apna Swad",
                description: "Premium Snack Box",
                order_id: orderData.id,
                handler: async (response) => {
                    try {
                        const verifyRes = await axios.post(`${apiUrl}/payment/verify-payment`, response);
                        
                        if (verifyRes.data.status === 'success') {
                            // Save address to profile if selected
                            if (saveToProfile) {
                                try {
                                    const updateRes = await axios.put(`${apiUrl}/user/profile`, {
                                        name: shippingAddress.fullName,
                                        phone: shippingAddress.phone,
                                        address: {
                                            street: shippingAddress.street,
                                            landmark: shippingAddress.landmark,
                                            city: shippingAddress.city,
                                            state: shippingAddress.state,
                                            pincode: shippingAddress.zipCode
                                        }
                                    }, {
                                        headers: { Authorization: `Bearer ${token}` }
                                    });
                                    if (typeof updateUser === 'function') {
                                        updateUser(updateRes.data);
                                    }
                                } catch (err) {
                                    console.error('Failed to save address to profile:', err);
                                }
                            }

                             await axios.post(`${apiUrl}/orders`, {
                                items: cartItems.map(item => ({
                                    product: item._id,
                                    name: item.name,
                                    quantity: item.quantity,
                                    price: item.price,
                                    image: item.image
                                })),
                                totalAmount: cartTotal,
                                shippingAddress: {
                                    street: `${shippingAddress.street}${shippingAddress.landmark ? ', ' + shippingAddress.landmark : ''}`,
                                    city: shippingAddress.city,
                                    state: shippingAddress.state,
                                    zipCode: shippingAddress.zipCode,
                                    phone: shippingAddress.phone
                                },
                                paymentMethod: 'Razorpay',
                                paymentStatus: 'completed',
                                razorpayOrderId: response.razorpay_order_id,
                                razorpayPaymentId: response.razorpay_payment_id
                            }, {
                                headers: { Authorization: `Bearer ${token}` }
                            });
                            clearCart();
                            navigate('/profile#orders');
                        }
                    } catch (err) {
                        alert('Payment Verification Failed');
                    }
                },
                prefill: {
                    name: shippingAddress.fullName,
                    email: user.email,
                    contact: shippingAddress.phone
                },
                theme: { color: "#4A2C2A" }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            alert('Could not initialize payment.');
        } finally {
            setLoading(false);
        }
    };

    const handleFreeOrder = async () => {
        setLoading(true);
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            
            if (saveToProfile) {
                try {
                    const updateRes = await axios.put(`${apiUrl}/user/profile`, {
                        name: shippingAddress.fullName,
                        phone: shippingAddress.phone,
                        address: {
                            street: shippingAddress.street,
                            landmark: shippingAddress.landmark,
                            city: shippingAddress.city,
                            state: shippingAddress.state,
                            pincode: shippingAddress.zipCode
                        }
                    }, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    if (typeof updateUser === 'function') {
                        updateUser(updateRes.data);
                    }
                } catch (err) {
                    console.error('Failed to save address to profile:', err);
                }
            }

            await axios.post(`${apiUrl}/orders`, {
                items: cartItems.map(item => ({
                    product: item._id,
                    name: item.name,
                    quantity: item.quantity,
                    price: 0,
                    image: item.image
                })),
                totalAmount: 0,
                shippingAddress: {
                    street: `${shippingAddress.street}${shippingAddress.landmark ? ', ' + shippingAddress.landmark : ''}`,
                    city: shippingAddress.city,
                    state: shippingAddress.state,
                    zipCode: shippingAddress.zipCode,
                    phone: shippingAddress.phone
                },
                paymentMethod: 'Razorpay', // Treating as prepaid since it's 0
                paymentStatus: 'completed'
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            clearCart();
            navigate('/profile#orders');
        } catch (err) {
            console.error('Bypass Order Failed:', err);
            alert('Could not place order (Bypass Error).');
        } finally {
            setLoading(false);
        }
    };

    const handleCodOrder = async () => {
        setLoading(true);
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            
            if (saveToProfile) {
                try {
                    const updateRes = await axios.put(`${apiUrl}/user/profile`, {
                        name: shippingAddress.fullName,
                        phone: shippingAddress.phone,
                        address: {
                            street: shippingAddress.street,
                            landmark: shippingAddress.landmark,
                            city: shippingAddress.city,
                            state: shippingAddress.state,
                            pincode: shippingAddress.zipCode
                        }
                    }, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    if (typeof updateUser === 'function') {
                        updateUser(updateRes.data);
                    }
                } catch (err) {
                    console.error('Failed to save address to profile:', err);
                }
            }

            await axios.post(`${apiUrl}/orders`, {
                items: cartItems.map(item => ({
                    product: item._id,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    image: item.image
                })),
                totalAmount: cartTotal,
                shippingAddress: {
                    street: `${shippingAddress.street}${shippingAddress.landmark ? ', ' + shippingAddress.landmark : ''}`,
                    city: shippingAddress.city,
                    state: shippingAddress.state,
                    zipCode: shippingAddress.zipCode,
                    phone: shippingAddress.phone
                },
                paymentMethod: 'COD',
                paymentStatus: 'pending'
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            clearCart();
            navigate('/profile#orders');
        } catch (err) {
            console.error('COD Order Failed:', err);
            alert('Could not place order (COD Error).');
        } finally {
            setLoading(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="empty-checkout container section text-center">
                <ShoppingBag size={80} strokeWidth={1} className="mb-4 text-muted" />
                <h2 className="brand-font luxury-title">Your Box is Empty</h2>
                <p className="luxury-subtitle">Return to our collection to fill it with handcrafted delights.</p>
                <Link to="/" className="btn btn-primary mt-4 luxury-btn">Start Curating</Link>
            </div>
        );
    }

    return (
        <div className="checkout-master-page">
            {/* Split Layout */}
            <div className="checkout-container">
                
                {/* Left Side: Forms */}
                <div className="checkout-visual-side">
                    <div className="visual-content">
                        <Link to="/cart" className="luxury-back">
                            <ChevronLeft size={18} /> Review Cart
                        </Link>
                        
                        <div className="luxury-stepper">
                            <div className={`lux-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'done' : ''}`}>
                                <small>01</small>
                                <span>Shipping</span>
                            </div>
                            <div className="lux-line"></div>
                            <div className={`lux-step ${step >= 2 ? 'active' : ''}`}>
                                <small>02</small>
                                <span>Payment</span>
                            </div>
                        </div>

                        <div className="form-surface">
                            {step === 1 ? (
                                <div className="shipping-view fade-in">
                                    <h1 className="luxury-h1 brand-font">Where should we <br/><span>send your flavors?</span></h1>
                                    
                                    <form className="lux-form" onSubmit={nextStep}>
                                        <div className="lux-group">
                                            <input 
                                                type="text" name="fullName" placeholder=" " required
                                                value={shippingAddress.fullName} onChange={handleAddressChange}
                                            />
                                            <label>Full Recipient Name</label>
                                            <User size={16} className="lux-icon" />
                                        </div>

                                        <div className="lux-group">
                                            <input 
                                                type="text" name="street" placeholder=" " required
                                                value={shippingAddress.street} onChange={handleAddressChange}
                                            />
                                            <label>Apartment, Street, House No.</label>
                                            <MapPin size={16} className="lux-icon" />
                                        </div>

                                        <div className="lux-row">
                                            <div className="lux-group half">
                                                <input 
                                                    type="text" name="city" placeholder=" " required
                                                    value={shippingAddress.city} onChange={handleAddressChange}
                                                />
                                                <label>City</label>
                                            </div>
                                            <div className="lux-group half">
                                                <select 
                                                    name="state" required className="lux-select"
                                                    value={shippingAddress.state} onChange={handleAddressChange}
                                                >
                                                    <option value="" disabled>Select State</option>
                                                    {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="lux-row">
                                            <div className="lux-group half">
                                                <input 
                                                    type="text" name="zipCode" placeholder=" " required maxLength="6"
                                                    value={shippingAddress.zipCode} onChange={handleAddressChange}
                                                />
                                                <label>ZIP / Pincode</label>
                                            </div>
                                            <div className="lux-group half">
                                                <input 
                                                    type="tel" name="phone" placeholder=" " required maxLength="10"
                                                    value={shippingAddress.phone} onChange={handleAddressChange}
                                                />
                                                <label>Mobile Contact</label>
                                                <Phone size={16} className="lux-icon" />
                                            </div>
                                        </div>
                                        <div className="lux-checkbox-group">
                                            <label className="lux-checkbox-label">
                                                <input 
                                                    type="checkbox" 
                                                    checked={saveToProfile} 
                                                    onChange={(e) => setSaveToProfile(e.target.checked)}
                                                />
                                                <span className="checkbox-text">Save this address to my profile for faster checkout</span>
                                            </label>
                                        </div>

                                        <button type="submit" className="lux-submit-btn">
                                            Continue to Secure Payment <ArrowRight size={20} />
                                        </button>
                                    </form>
                                </div>
                            ) : (
                                <div className="payment-view fade-in">
                                    <h1 className="luxury-h1 brand-font">One last look <br/><span>before it's yours.</span></h1>
                                    
                                    <div className="review-summary-box">
                                        <div className="review-item">
                                            <Truck size={20} />
                                            <div>
                                                <h4>Delivering To</h4>
                                                <p>{shippingAddress.fullName}</p>
                                                <p>{shippingAddress.street}, {shippingAddress.city}, {shippingAddress.state}</p>
                                            </div>
                                        </div>
                                        <button className="lux-text-btn" onClick={() => setStep(1)}>Change Address</button>
                                    </div>

                                     <div className="payment-type-selector">
                                        <h4 className="luxury-h4 mb-3">Choose Payment Method</h4>
                                        <div className="payment-options">
                                            <div 
                                                className={`pay-option ${paymentType === 'online' ? 'active' : ''}`}
                                                onClick={() => setPaymentType('online')}
                                            >
                                                <ShieldCheck className="option-icon" />
                                                <div className="option-info">
                                                    <strong>Online Payment</strong>
                                                    <span>UPI, Cards, Netbanking</span>
                                                </div>
                                            </div>
                                            <div 
                                                className={`pay-option ${paymentType === 'cod' ? 'active' : ''}`}
                                                onClick={() => setPaymentType('cod')}
                                            >
                                                <Truck className="option-icon" />
                                                <div className="option-info">
                                                    <strong>Cash on Delivery</strong>
                                                    <span>Pay when you receive</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="security-shield mt-4">
                                        <ShieldCheck className="text-success" />
                                        <span>{paymentType === 'online' ? 'Your transaction is secured with bank-grade 256-bit encryption through Razorpay.' : 'Pay securely at your doorstep.'}</span>
                                    </div>

                                    <button 
                                        className={`lux-pay-btn ${loading ? 'loading' : ''}`} 
                                        onClick={performPayment}
                                        disabled={loading}
                                    >
                                        {loading ? 'Processing...' : (isLadduBypass ? 'Complete Free Order • ₹0' : `Complete Payment • ₹${cartTotal}`)}
                                    </button>
                                    
                                    <p className="cancel-note" onClick={() => setStep(1)}>Go back to shipping</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Side: Sticky Summary */}
                <div className="checkout-summary-side">
                    <div className="sticky-content">
                        <div className="summary-header">
                            <h2 className="brand-font">Order Summary</h2>
                            <span>{cartItems.length} Handcrafted Items</span>
                        </div>

                        <div className="luxury-item-flow">
                            {cartItems.map(item => (
                                <div key={item._id} className="lux-item-card">
                                    <div className="lux-item-img">
                                        <img src={item.image} alt={item.name} />
                                        <div className="lux-qty-badge">{item.quantity}</div>
                                    </div>
                                    <div className="lux-item-info">
                                        <h4>{item.name}</h4>
                                        <p>{item.weight || 'Standard'}</p>
                                    </div>
                                    <span className="lux-item-price">₹{item.price * item.quantity}</span>
                                </div>
                            ))}
                        </div>

                        <div className="luxury-calculations">
                            <div className="calc-row">
                                <span>Subtotal</span>
                                <span>₹{cartTotal}</span>
                            </div>
                            <div className="calc-row">
                                <span>Shipping Fees</span>
                                <span className="text-success">Complimentary</span>
                            </div>
                            <div className="calc-divider"></div>
                            <div className="calc-row grand-total">
                                <span>Total to Pay</span>
                                <span>₹{cartTotal}</span>
                            </div>
                        </div>

                        <div className="lux-guarantee">
                            <Lock size={14} />
                            <span>Transparent Pricing • Secure Checkout • Fresh Delivery</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CheckoutPage;
