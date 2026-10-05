import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Theme
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('aqualuxe-theme') || 'light';
  });

  // Currency
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('aqualuxe-currency') || 'USD';
  });

  // Wishlist
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('aqualuxe-wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Apply Theme
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('aqualuxe-theme', theme);
  }, [theme]);

  // Save Currency
  useEffect(() => {
    localStorage.setItem('aqualuxe-currency', currency);
  }, [currency]);

  // Save Wishlist
  useEffect(() => {
    localStorage.setItem('aqualuxe-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const toggleWishlist = (yacht) => {
    setWishlist((prev) => {
      const exists = prev.find((y) => y.id === yacht.id);
      if (exists) {
        return prev.filter((y) => y.id !== yacht.id);
      }
      return [...prev, yacht];
    });
  };

  const isInWishlist = (id) => {
    return wishlist.some((y) => y.id === id);
  };

  // Currency Conversion
  const currencyRates = { USD: 1, EUR: 0.92, GBP: 0.79, BDT: 110 };
  const currencySymbols = { USD: '$', EUR: '€', GBP: '£', BDT: '৳' };

  const convertPrice = (usdPrice) => {
    const num = typeof usdPrice === 'number' ? usdPrice : parseFloat(String(usdPrice).replace(/[^0-9.]/g, ''));
    const converted = num * currencyRates[currency];
    return `${currencySymbols[currency]}${Math.round(converted).toLocaleString()}`;
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        currency,
        setCurrency,
        convertPrice,
        currencySymbols,
        wishlist,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);