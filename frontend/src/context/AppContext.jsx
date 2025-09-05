import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('bookstore-cart');
    const savedFavorites = localStorage.getItem('bookstore-favorites');
    
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bookstore-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('bookstore-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToCart = (book) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item._id === book._id);
      if (existingItem) {
        return prevCart.map(item =>
          item._id === book._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...book, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (bookId) => {
    setCart(prevCart => prevCart.filter(item => item._id !== bookId));
  };

  const updateCartQuantity = (bookId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(bookId);
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item._id === bookId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const addToFavorites = (book) => {
    setFavorites(prevFavorites => {
      const isAlreadyFavorite = prevFavorites.some(fav => fav._id === book._id);
      if (isAlreadyFavorite) {
        return prevFavorites.filter(fav => fav._id !== book._id);
      } else {
        return [...prevFavorites, book];
      }
    });
  };

  const removeFromFavorites = (bookId) => {
    setFavorites(prevFavorites => 
      prevFavorites.filter(fav => fav._id !== bookId)
    );
  };

  const isInCart = (bookId) => {
    return cart.some(item => item._id === bookId);
  };

  const isFavorite = (bookId) => {
    return favorites.some(fav => fav._id === bookId);
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace('£', ''));
      return total + (price * item.quantity);
    }, 0).toFixed(2);
  };

  const clearCart = () => {
    setCart([]);
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const value = {
    cart,
    favorites,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    addToFavorites,
    removeFromFavorites,
    isInCart,
    isFavorite,
    getCartItemCount,
    getCartTotal,
    clearCart,
    clearFavorites,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
