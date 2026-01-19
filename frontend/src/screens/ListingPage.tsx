import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { Listing } from '../types/listing';
import timeAgo from '../utils/dateUtils';
import styles from '../styles/ListingPage.module.css';

const ListingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { listing } = location.state as { listing: Listing };

  const [inCart, setInCart] = useState(false);

  if (!listing) {
    return <div>No listing data</div>;
  }

  // Fetch cart on mount to check if listing is already in cart
  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await fetch('http://localhost:3000/api/cart', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error('Failed to fetch cart');

        const data: { listing_id: number }[] = await res.json();
        setInCart(data.some(item => item.listing_id === listing.id));
      } catch (err) {
        console.error('Error fetching cart:', err);
      }
    };

    fetchCart();
  }, [listing.id]);

  // Toggle listing in cart
  const handleCartToggle = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be signed in to add items to cart');
      return;
    }

    try {
      await fetch(`http://localhost:3000/api/cart/${listing.id}`, {
        method: inCart ? 'DELETE' : 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      setInCart(prev => !prev);
    } catch (err) {
      console.error('Failed to toggle cart:', err);
    }
  };

  return (
    <div className={styles.MainContainer}>
      <div className={styles.ContentContainer}>
        <div className={styles.left}>
          <img
            src={`http://localhost:3000${listing.image_url}`}
            alt={listing.name}
            className={styles.image}
          />
        </div>
        <div className={styles.right}>
          <div className={styles.mainInformation}>
            <h6 className={styles.posted}>{timeAgo(listing.created_at)}</h6>
            <h1 className={styles.brand}>{listing.brand}</h1>
            <h2 className={styles.title}>{listing.name}</h2>
            <p className={styles.price}>S${listing.price}</p>
          </div>

          <button
            className={styles.addToCartButton}
            onClick={handleCartToggle}
          >
            {inCart ? 'Remove from Cart' : 'Add to Cart'}
          </button>

          <hr className={styles.divider} />
          <div className={styles.AdditionalInformation}>
            <p className={styles.condition}>Condition: {listing.condition}</p>
            <p className={styles.size}>Size: {listing.size}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingPage;
