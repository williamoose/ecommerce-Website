import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Listing } from '../types/listing';

type UserDataContextType = {
  likedIds: number[];
  cartIds: number[];
  setLikedIds: React.Dispatch<React.SetStateAction<number[]>>;
  setCartIds: React.Dispatch<React.SetStateAction<number[]>>;
};

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

export const UserDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [likedIds, setLikedIds] = useState<number[]>([]);
  const [cartIds, setCartIds] = useState<number[]>([]);
  const token = localStorage.getItem('token');

  // Fetch likes and cart in parallel
  useEffect(() => {
    if (!token) return;

    const fetchUserData = async () => {
      try {
        const [likesRes, cartRes] = await Promise.all([
          fetch('http://localhost:3000/api/listings/liked', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch('http://localhost:3000/api/cart', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (!likesRes.ok) throw new Error('Failed to fetch likes');
        if (!cartRes.ok) throw new Error('Failed to fetch cart');

        const likesData: Listing[] = await likesRes.json();
        setLikedIds(likesData.map(item => item.id));

        const cartData: { listing_id: number }[] = await cartRes.json();
        setCartIds(cartData.map(item => item.listing_id));
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserData();
  }, [token]);

  return (
    <UserDataContext.Provider value={{ likedIds, cartIds, setLikedIds, setCartIds }}>
      {children}
    </UserDataContext.Provider>
  );
};

// Custom hook for easier access
export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (!context) throw new Error('useUserData must be used within UserDataProvider');
  return context;
};
