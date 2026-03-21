import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Trash2, Heart, ArrowRight } from 'lucide-react';
import './WishlistPage.css';

const WishlistPage = () => {
  const { wishlist, removeFromWishlist, wishlistCount, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlistCount === 0) {
    return (
      <div className="wishlist-page empty-state">
        <div className="container">
          <div className="empty-content reveal fade-up">
            <div className="empty-icon-wrapper">
              <Heart size={100} strokeWidth={1} />
            </div>
            <h2>Your Heart is <span>Empty</span></h2>
            <p>Don't let your favorite snacks slip away. Start adding them to your wishlist today!</p>
            <Link to="/#shop" className="btn btn-primary">
              Discover Snacks <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="container">
        <div className="wishlist-header reveal fade-up">
          <div className="header-text">
            <h1>My <span>Favorites</span></h1>
            <p>Saved snacks you can't wait to taste again.</p>
          </div>
          <button className="clear-all-btn" onClick={clearWishlist}>Clear All</button>
        </div>

        <div className="wishlist-grid">
          {wishlist.map((product) => (
            <div key={product._id} className="wishlist-item reveal fade-up">
              <div className="item-image-area">
                <Link to={`/product/${product._id}`}>
                  <img src={product.image} alt={product.name} />
                </Link>
                <button 
                  className="remove-fav-btn" 
                  onClick={() => removeFromWishlist(product._id)}
                  title="Remove from favorites"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <div className="item-details">
                <div className="item-info">
                  <h3>{product.name}</h3>
                  <div className="item-price">Rs. {product.price}.00</div>
                </div>
                <button 
                  className="btn btn-secondary add-to-cart-fav"
                  onClick={() => {
                    addToCart(product);
                    removeFromWishlist(product._id);
                  }}
                >
                  <ShoppingCart size={18} /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="wishlist-footer reveal fade-up">
          <Link to="/#shop" className="continue-link">
            <ArrowRight size={18} style={{ transform: 'rotate(180deg)' }} /> Continue Exploring
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
