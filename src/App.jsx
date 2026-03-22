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
            
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/products" element={<ProtectedRoute><AdminProducts /></ProtectedRoute>} />
            <Route path="/admin/categories" element={<ProtectedRoute><AdminCategories /></ProtectedRoute>} />
            <Route path="/admin/banners" element={<ProtectedRoute><AdminBanners /></ProtectedRoute>} />
            <Route path="/admin/reviews" element={<ProtectedRoute><AdminReviews /></ProtectedRoute>} />
            <Route path="/admin/announcements" element={<ProtectedRoute><AdminAnnouncement /></ProtectedRoute>} />
            <Route path="/admin/orders" element={<ProtectedRoute><AdminOrders /></ProtectedRoute>} />
            <Route path="/admin/chat" element={<ProtectedRoute><AdminChat /></ProtectedRoute>} />
            <Route path="/admin/bulk-email" element={<ProtectedRoute><AdminBulkEmail /></ProtectedRoute>} />
          </Routes>
        </main>
        
        {!isAdminPath && <Footer />}
        <ChatWidget />
      </div>
    </WishlistProvider>
  );
}

export default App;
