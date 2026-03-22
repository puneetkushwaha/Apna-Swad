import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import AdminProducts from './admin/AdminProducts';
import AdminCategories from './admin/AdminCategories';
import AdminBanners from './admin/AdminBanners';
import AdminReviews from './admin/AdminReviews';
import AdminAnnouncement from './admin/AdminAnnouncement';
import AdminOrders from './admin/AdminOrders';
import AdminChat from './admin/AdminChat';
import AdminBulkEmail from './admin/AdminBulkEmail';
import InstagramFeed from './components/InstagramFeed/InstagramFeed';
import ChatWidget from './components/Chat/ChatWidget';
import AnnouncementBoard from './components/AnnouncementBoard/AnnouncementBoard';
import ProductDetail from './components/ProductDetail/ProductDetail';
import LoadingScreen from './components/Loader/LoadingScreen';
import CategoryPage from './pages/CategoryPage';
import HeroBanner from './components/HeroBanner/HeroBanner';
import BestSellers from './components/BestSellers/BestSellers';
import FeaturedProducts from './components/FeaturedProducts/FeaturedProducts';
import NewArrivals from './components/NewArrivals/NewArrivals';
import DhyantisDevPicks from './components/DhyantisDevPicks/DhyantisDevPicks';
import DhyantisStory from './components/JanakiStory/JanakiStory';
import LastBanner from './components/LastBanner/LastBanner';
import CategoryTicker from './components/CategoryTicker/CategoryTicker';
import TestimonialTicker from './components/Testimonials/TestimonialTicker';
import VideoReviews from './components/VideoReviews/VideoReviews';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import CartPage from './pages/CartPage';
import SearchResultsPage from './pages/SearchResultsPage';
import CheckoutPage from './pages/CheckoutPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { WishlistProvider } from './context/WishlistContext';
import WishlistPage from './pages/WishlistPage';
import SEO from './components/SEO/SEO';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import ShippingPolicy from './pages/ShippingPolicy';
import ReturnPolicy from './pages/ReturnPolicy';
import ContactPage from './pages/ContactPage';
import SustainabilityPage from './pages/SustainabilityPage';
import StoreLocatorPage from './pages/StoreLocatorPage';
import SupportPage from './pages/SupportPage';
import './App.css';

function App() {
  const [appLoading, setAppLoading] = useState(true);
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');
  const isAdminLogin = location.pathname === '/admin/login';

  useEffect(() => {
    // Premium loading simulation/auth check
    const timer = setTimeout(() => {
      setAppLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.05,
      rootMargin: '0px 0px 200px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    const observeNewElements = () => {
      const revealElements = document.querySelectorAll('.reveal');
      revealElements.forEach(el => observer.observe(el));
    };

    // Initial observation
    observeNewElements();

    // Re-observe when DOM changes (for dynamic content like blogs)
    const mutationObserver = new MutationObserver(() => {
      observeNewElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [location]);
  if (appLoading) return <LoadingScreen />;

  return (
    <WishlistProvider>
      <div className="app">
        {(!isAdminPath || (isAdminPath && !isAdminLogin)) && <Header />}
        {!isAdminPath && <AnnouncementBoard />}
        
        <main>
          <Routes>
            <Route path="/" element={
              <>
                <SEO 
                  title="Home"
                  description="Discover the real shuddh swad (pure taste) of Bihar with Apna Swad. Authentic Thekua, handmade snacks, and premium Indian delicacies delivered to your home."
                />
                <HeroBanner />
                <div className="reveal"><BestSellers /></div>
                <div className="reveal"><CategoryTicker /></div>
                <FeaturedProducts />
                <div className="reveal"><NewArrivals /></div>
                <div className="reveal"><TestimonialTicker /></div>
                <div className="reveal"><VideoReviews /></div>
                <div className="reveal"><DhyantisDevPicks /></div>
                <div className="reveal"><DhyantisStory /></div>
                <InstagramFeed />
                <div className="reveal"><LastBanner /></div>
              </>
            } />
            
            <Route path="/best-sellers" element={
              <>
                <HeroBanner />
                <div className="reveal"><BestSellers /></div>
                <div className="reveal"><DhyantisDevPicks /></div>
                <div className="reveal"><VideoReviews /></div>
                <div className="reveal"><DhyantisStory /></div>
              </>
            } />

            <Route path="/fav-picks" element={
              <>
                <HeroBanner />
                <div className="reveal"><DhyantisDevPicks /></div>
                <div className="reveal"><VideoReviews /></div>
                <div className="reveal"><DhyantisStory /></div>
              </>
            } />

            <Route path="/new-arrivals" element={
              <>
                <HeroBanner />
                <div className="reveal"><NewArrivals /></div>
                <div className="reveal"><DhyantisDevPicks /></div>
                <div className="reveal"><VideoReviews /></div>
                <div className="reveal"><DhyantisStory /></div>
              </>
            } />
            
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
            <Route path="/search" element={<SearchResultsPage />} />
            
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/category/:slug" element={<CategoryPage />} />
            
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/shipping-policy" element={<ShippingPolicy />} />
            <Route path="/return-policy" element={<ReturnPolicy />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/sustainability" element={<SustainabilityPage />} />
            <Route path="/store-locator" element={<StoreLocatorPage />} />
            <Route path="/support" element={<SupportPage />} />
            
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<ProtectedRoute adminOnly={true}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/products" element={<ProtectedRoute adminOnly={true}><AdminProducts /></ProtectedRoute>} />
            <Route path="/admin/categories" element={<ProtectedRoute adminOnly={true}><AdminCategories /></ProtectedRoute>} />
            <Route path="/admin/banners" element={<ProtectedRoute adminOnly={true}><AdminBanners /></ProtectedRoute>} />
            <Route path="/admin/reviews" element={<ProtectedRoute adminOnly={true}><AdminReviews /></ProtectedRoute>} />
            <Route path="/admin/announcements" element={<ProtectedRoute adminOnly={true}><AdminAnnouncement /></ProtectedRoute>} />
            <Route path="/admin/orders" element={<ProtectedRoute adminOnly={true}><AdminOrders /></ProtectedRoute>} />
            <Route path="/admin/chat" element={<ProtectedRoute adminOnly={true}><AdminChat /></ProtectedRoute>} />
            <Route path="/admin/bulk-email" element={<ProtectedRoute adminOnly={true}><AdminBulkEmail /></ProtectedRoute>} />
          </Routes>
        </main>
        
        {!isAdminPath && <Footer />}
        <ChatWidget />
      </div>
    </WishlistProvider>
  );
}

export default App;
