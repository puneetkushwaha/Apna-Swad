import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { Heart, Share2, Star, Truck, ShieldCheck, Leaf, Clock, Package, MessageSquare } from 'lucide-react';
import ProductReviewTicker from './ProductReviewTicker';
import Skeleton from '../Loader/Skeleton';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, buyNow } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out ${product.name} on Apna Swad!`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
        setActiveImage(res.data.image);
      } catch (err) {
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="product-detail-page">
        <div className="container">
          <div className="product-detail-grid">
            <div className="product-gallery">
              <Skeleton type="rect" style={{ width: '100%', aspectRatio: '1/1', borderRadius: '12px' }} />
              <div className="thumbnails-grid" style={{ marginTop: '20px' }}>
                {Array(4).fill(0).map((_, i) => (
                  <Skeleton key={i} type="rect" style={{ width: '100%', aspectRation: '1/1', borderRadius: '8px' }} />
                ))}
              </div>
            </div>
            <div className="product-info-premium">
              <Skeleton type="text" style={{ width: '150px', marginBottom: '10px' }} />
              <Skeleton type="title" style={{ width: '80%', height: '40px', marginBottom: '20px' }} />
              <Skeleton type="text" style={{ width: '120px', height: '30px', marginBottom: '20px' }} />
              <Skeleton type="text" style={{ width: '100px', height: '20px', marginBottom: '30px' }} />
              <Skeleton type="rect" style={{ width: '100%', height: '50px', borderRadius: '25px', marginBottom: '20px' }} />
              <div style={{ marginTop: '40px' }}>
                <Skeleton type="title" style={{ width: '200px', marginBottom: '15px' }} />
                <Skeleton type="text" style={{ width: '100%', height: '100px' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (!product) return <div className="error">Product not found</div>;

  const allImages = [product.image, ...(product.images || [])].filter(Boolean);

  return (
    <div className="product-detail-page">
      <div className="container">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Back to Collection
        </button>

        <div className="product-detail-grid">
          {/* Left: Image Gallery */}
          <div className="product-gallery">
            <div className="main-image-wrapper">
              <img src={activeImage} alt={product.name} />
            </div>
            
            <div className="thumbnails-grid">
              {allImages.map((img, idx) => (
                <div 
                  key={idx} 
                  className={`thumb-item ${activeImage === img ? 'active' : ''}`}
                  onMouseEnter={() => setActiveImage(img)}
                >
                  <img src={img} alt={`${product.name} view ${idx + 1}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Info Section */}
          <div className="product-info-premium">
            <div className="brand-header-premium">
              <span className="brand-label-small">APNA SWAD PRIVATE LIMITED</span>
            </div>
            
            <h1 className="product-title brand-font">{product.name}</h1>
            
            <div className="premium-price-row">
              <div className="price-container">
                {product.oldPrice && <span className="old-price">Rs. {product.oldPrice}.00</span>}
                <span className="current-price">Rs. {product.price}.00</span>
              </div>
              {product.oldPrice && <span className="premium-sale-tag">Sale</span>}
            </div>

            <div className="shipping-policy-premium">
              <span><Link to="/shipping">Shipping</Link> calculated at checkout.</span>
            </div>

            {product.isBestSeller && (
              <div className="best-seller-badge-banner">
                <Star size={14} fill="currentColor" />
                <span>Best seller in {product.category?.name || 'traditional snacks'}</span>
              </div>
            )}

            <span className="quantity-label">Quantity</span>
            <div className="quantity-selector-premium">
              <button className="quantity-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <span className="quantity-value">{quantity}</span>
              <button className="quantity-btn" onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>

            <div className="stock-status">
              <Clock size={16} />
              <span>Fresh batch selling fast, limited stock</span>
            </div>

            <div className="action-buttons">
              <button 
                className="btn-premium btn-fill"
                onClick={() => addToCart(product, quantity)}
                style={{ width: '100%' }}
              >
                Add to cart
              </button>
            </div>

            <div 
              className="share-row" 
              onClick={handleShare}
              style={{ cursor: 'pointer' }}
            >
              <Share2 size={16} />
              <span>Share</span>
            </div>

            <div className="product-details-accordion">
              <div className="detail-tab">
                <h3 className="tab-title">Craftsmanship & Ingredients</h3>
                <div className="long-description">
                  {product.description?.split('\n\n').map((para, i) => (
                    <p key={i}>
                      {i === 0 ? (
                        <>
                          <strong>{product.name}</strong>{' '}
                          {para.replace(new RegExp(`^${product.name}`, 'i'), '').trim()}
                        </>
                      ) : para}
                    </p>
                  ))}
                </div>
              </div>
              
              <div className="detail-tab">
                <h3 className="tab-title">Specifications</h3>
                <ul className="specs-list-premium">
                  {product.weight && <li><span>Weight:</span> <span>{product.weight}</span></li>}
                  {product.shelfLife && <li><span>Shelf Life:</span> <span>{product.shelfLife}</span></li>}
                  {product.storageInstructions && <li><span>Storage:</span> <span>{product.storageInstructions}</span></li>}
                </ul>
              </div>
            </div>

            <div className="product-attributes">
              <div className="attribute-item">
                <Leaf className="attr-icon" color="#2c7a2c" />
                <span className="attr-label">No preservatives</span>
              </div>
              <div className="attribute-item">
                <Star className="attr-icon" color="#f5a623" fill="#f5a623" />
                <span className="attr-label">{product.rating || 5.0}</span>
              </div>
              <div className="attribute-item">
                <Truck className="attr-icon" color="#4a2c2a" />
                <span className="attr-label">Free Delivery</span>
              </div>
            </div>

            <a 
              href={`https://wa.me/917380663685?text=I'm interested in ${product.name}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="whatsapp-ask-btn"
            >
              <MessageSquare size={18} /> Ask about this product
            </a>
          </div>
        </div>

        {/* Reviews Section */}
        <section className="product-reviews-section">
          <h2 className="brand-font">Customer Reviews</h2>
          
          <div className="product-page-reviews">
            <ProductReviewTicker productId={product._id} />
          </div>
          
          <div className="rating-summary-premium">
            <h3>{product.rating || 5.0} / 5.0</h3>
            <p>Based on {product.reviews || 0} real matching reviews</p>
          </div>
        </section>
      </div>
    </div>
  );
};

// Helper link component if not imported
const Link = ({ children, to }) => <a href={to} style={{color: 'inherit'}}>{children}</a>;

export default ProductDetail;
