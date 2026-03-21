import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (err) {
        console.error('Error parsing wishlist from localStorage:', err);
      }
    }
  }, []);

  // Sync wishlist with localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (product) => {
    if (!isInWishlist(product._id)) {
      setWishlist(prev => [...prev, product]);
    }
  };

  const removeFromWishlist = (productId) => {
    setWishlist(prev => prev.filter(item => item._id !== productId));
  };

  const toggleWishlist = (product) => {
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item._id === productId);
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider value={{ 
      wishlist, 
      addToWishlist, 
      removeFromWishlist, 
      toggleWishlist, 
      isInWishlist,
      clearWishlist,
      wishlistCount: wishlist.length 
    }}>
      {children}
    </WishlistContext.Provider>
  );
};
