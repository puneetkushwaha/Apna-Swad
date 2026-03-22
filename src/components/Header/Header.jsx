import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { User as UserIcon, LogOut, Search, ShoppingCart, ShieldCheck, Zap, ChevronDown, Package, MessageSquare, Star, Truck, Heart, Menu, X } from 'lucide-react';
import api from '../../api/api';
import './Header.css';
import NotificationBell from './NotificationBell';

const Header = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showTextLogo, setShowTextLogo] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const location = useLocation();
  const navigate = useNavigate();



  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/categories');
        setCategories(res.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const logoInterval = setInterval(() => {
      setShowTextLogo(prev => !prev);
    }, 4000); // Shuffle every 4 seconds
    return () => clearInterval(logoInterval);
  }, []);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchActive(false);
      setSearchQuery('');
    }
  };

  const isAdminMode = location.pathname.startsWith('/admin');

  const adminLinks = [
    { title: 'Dashboard', path: '/admin/dashboard' },
    { title: 'Products', path: '/admin/products' },
    { title: 'Categories', path: '/admin/categories' },
    { title: 'Banners', path: '/admin/banners' },
    { title: 'Reviews', path: '/admin/reviews' },
    { title: 'Order Logistics', path: '/admin/orders' },
    { title: 'Chat', path: '/admin/chat' },
    { title: 'Bulk Email', path: '/admin/bulk-email' },
  ];

  return (
    <header className={`header glass ${isMenuOpen ? 'nav-active' : ''}`}>
      <div className="container header-content">
        <div className="mobile-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </div>

        <div className="logo-container">
          <Link to="/" className="logo-link">
            <div className="logo-wrapper">
              <img
                src="/mascot_logo.png"
                alt="Apna Swad Mascot"
                className={`logo-img mascot ${!showTextLogo ? 'active' : ''}`}
              />
              <img
                src="/logo text.png"
                alt="Apna Swad Text"
                className={`logo-img text-logo ${showTextLogo ? 'active' : ''}`}
              />
            </div>
            {isAdminMode && <span className="admin-tag">Admin</span>}
          </Link>
        </div>

        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <ul className="nav-links main-nav">
            {!isAdminMode ? (
              <>
                <li><Link to="/">Home</Link></li>
                <li className="nav-item-with-badge">
                  <Link to="/best-sellers">
                    Best Sellers
                    <span className="nav-badge preferred">
                      <Star size={10} fill="currentColor" />
                      Most Loved
                    </span>
                  </Link>
                </li>

                <li
                  className="dropdown-trigger"
                  onMouseEnter={() => setActiveDropdown('store')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link to="/fav-picks" className="dropdown-link">
                    Dhyanti's Fav Picks <ChevronDown size={14} />
                  </Link>
                  <div className={`mega-dropdown ${activeDropdown === 'store' ? 'show' : ''}`}>
                    <div className="category-grid-mini">
                      {[
                        { id: '69b81ce1f30a3be5e9037219', name: 'Elaichi Thekua' },
                        { id: '69b837e4162db0360bf0b004', name: 'Jaggery Thekua' },
                        { id: '69b846f56fac84f1c9686c12', name: 'Traditional Thekua' },
                        { id: '69b8476d6fac84f1c9686c18', name: 'Saunf Flavour' }
                      ].map(item => (
                        <Link
                          key={item.id}
                          to={`/product/${item.id}`}
                          className="mini-cat-item"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <div className="mini-cat-mascot">
                            <img src="/mascot_logo.png" alt="Mascot" />
                          </div>
                          <span>{item.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </li>

                <li className="nav-item-with-badge">
                  <Link to="/new-arrivals">
                    New Arrivals
                    <span className="nav-badge trending">
                      <Zap size={10} fill="currentColor" />
                      Trending
                    </span>
                  </Link>
                </li>

                <li
                  className="dropdown-trigger"
                  onMouseEnter={() => setActiveDropdown('account')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link to="/profile" className="dropdown-link account-nav-link">
                    My Accounts & More <ChevronDown size={14} />
                  </Link>
                  <div className={`user-dropdown-nav ${activeDropdown === 'account' ? 'show' : ''}`}>
                    <Link to="/profile" className="nav-drop-item" onClick={() => setActiveDropdown(null)}>
                      <UserIcon size={18} /> My Account
                    </Link>
                    {!user ? (
                      <Link to="/login" className="nav-drop-item">
                        <Package size={18} /> My Orders / Log In Now
                      </Link>
                    ) : (
                      <>
                        <Link to="/profile#orders" className="nav-drop-item" onClick={() => setActiveDropdown(null)}>
                          <Package size={18} /> My Orders
                        </Link>
                        <Link to="/profile#orders" className="nav-drop-item" onClick={() => setActiveDropdown(null)}>
                          <Truck size={18} /> 🚚 Track Your Order
                        </Link>
                        <div
                          className="nav-drop-item"
                          style={{ cursor: 'pointer' }}
                          onClick={() => {
                            console.log('Dispatching toggleChat event');
                            window.dispatchEvent(new CustomEvent('toggleChat'));
                            setActiveDropdown(null);
                          }}
                        >
                          <MessageSquare size={18} /> 💬 Chat with Us
                        </div>
                      </>
                    )}
                    {user && user.role === 'admin' && (
                      <Link to="/admin/dashboard" className="nav-drop-item admin-link">
                        <ShieldCheck size={18} /> Admin Panel
                      </Link>
                    )}
                    {user && (
                      <button onClick={logout} className="nav-drop-item logout-btn">
                        <LogOut size={18} /> Log Out
                      </button>
                    )}
                  </div>
                </li>
              </>
            ) : (
              adminLinks.map(link => (
                <li key={link.title}>
                  <Link to={link.path} onClick={() => setIsMenuOpen(false)}>{link.title}</Link>
                </li>
              ))
            )}
          </ul>
        </nav>

        <div className="header-actions">
          <div className="action-btn" onClick={() => setIsSearchActive(true)} style={{ cursor: 'pointer' }}>
            <Search size={22} />
          </div>

          <Link to="/wishlist" className="action-btn">
            <Heart size={22} className={wishlistCount > 0 ? 'heart-filled' : ''} />
            {wishlistCount > 0 && <span className="cart-count wishlist-count">{wishlistCount}</span>}
          </Link>

          <NotificationBell />

          <div className="auth-actions">
            {!user ? (
              <Link to="/login" className="guest-auth">
                <div className="guest-icons">
                  <UserIcon size={24} className="guest-profile-icon" />
                  <Zap size={15} className="guest-thunder-icon" />
                </div>
              </Link>
            ) : null}
          </div>

          <div className="cart-icon-wrapper">
            <Link to="/cart" className="action-btn">
              <ShoppingCart size={22} />
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </Link>
          </div>
        </div>
      </div>

      {/* Search Overlay */}
      <div className={`search-overlay ${isSearchActive ? 'active' : ''}`}>
        <button className="search-close-btn" onClick={() => setIsSearchActive(false)}>×</button>
        <div className="search-container-inner">
          <input
            type="text"
            className="search-overlay-input"
            placeholder="Search for snacks, sweets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            autoFocus={isSearchActive}
          />
          <p className="search-hint">Press Enter to search</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
