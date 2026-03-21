import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <div className="product-image-area">
        <Link to={`/product/${product._id}`} className="product-link">
          <img src={product.image} alt={product.name} className="product-image main-img" crossOrigin="anonymous" />
          {product.hoverImage && <img src={product.hoverImage} alt={product.name} className="product-image hover-img" crossOrigin="anonymous" />}
          {product.isBestSeller && <span className="sale-badge">SALE</span>}
        </Link>
      </div>
      <Link to={`/product/${product._id}`} className="product-link">
        <div className="product-details">
          <h3 className="product-title">{product.name}</h3>
          <div className="price-container">
            {product.oldPrice && <span className="old-price">Rs. {product.oldPrice}.00</span>}
            <span className="current-price">Rs. {product.price}.00</span>
          </div>
        </div>
      </Link>
      <button
        className="cart-pill-btn"
        onClick={() => addToCart(product)}
      >
        Add to cart
      </button>
    </div>
  );
};

export default ProductCard;
