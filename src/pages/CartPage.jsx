import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Trash2, Plus, Minus, ChevronRight, ShoppingBag } from 'lucide-react';
import './CartPage.css';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      navigate('/login?redirect=cart');
    } else {
      navigate('/checkout');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty-state container section">
        <div className="empty-content text-center fade-in-up">
          <div className="empty-icon-wrapper">
            <ShoppingBag size={80} strokeWidth={1} />
          </div>
          <h2 className="brand-font">Your Cart is Empty</h2>
          <p>Explore our handcrafted delicacies and find your next favorite snack.</p>
          <Link to="/" className="btn btn-primary">Start Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page container section">
      <div className="cart-header">
        <h1 className="brand-font">Your <span>Cravings</span></h1>
        <p>Review your selected snacks before checkout</p>
      </div>

      <div className="cart-content-grid">
        <div className="cart-items-section">
          {cartItems.map((item) => (
            <div key={item._id} className="cart-item-card glass">
              <div className="item-image">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="item-details">
                <div className="item-main-info">
                  <h3 className="brand-font">{item.name}</h3>
                  <p className="item-weight">{item.weight}</p>
                </div>
                <div className="item-controls">
                  <div className="quantity-toggle">
                    <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>
                      <Minus size={14} />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>
                      <Plus size={14} />
                    </button>
                  </div>
                  <div className="item-price-info">
                    <span className="unit-price">₹{item.price}</span>
                    <span className="total-item-price">₹{item.price * item.quantity}</span>
                  </div>
                  <button className="remove-btn" onClick={() => removeFromCart(item._id)}>
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="cart-actions-bottom">
            <Link to="/" className="continue-shopping">
              ← Continue Shopping
            </Link>
            <button className="clear-cart-btn" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        </div>

        <div className="cart-summary-section">
          <div className="summary-card glass sticky-summary">
            <h3 className="brand-font">Order Summary</h3>
            <div className="summary-rows">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{cartTotal}</span>
              </div>
              <div className="summary-row">
                <span>Delivery</span>
                <span className="free-tag">Calculated at checkout</span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-row total-row">
                <span>Total Amount</span>
                <span>₹{cartTotal}</span>
              </div>
            </div>

            <button className="btn btn-primary checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout <ChevronRight size={20} />
            </button>

            <div className="security-badges">
              <p>🔒 Secure 128-bit SSL encrypted payment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
