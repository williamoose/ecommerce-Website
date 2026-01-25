import React from 'react';
import { useLocation } from 'react-router-dom';
import type { Listing } from '../types/listing';
import timeAgo from '../utils/dateUtils';
import styles from '../styles/ListingPage.module.css';
import { useUserData } from '../contexts/UserDataContext';

const ListingPage = () => {
    const location = useLocation();
    const { listing } = location.state as { listing: Listing };
    const { cartIds, setCartIds } = useUserData(); // use context for cart
    console.log('Listing data:', listing);

    if (!listing) {
        return <div>No listing data</div>;
    }

    // Check if listing is in cart
    const inCart = cartIds.includes(listing.id);

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

            // Update cartIds in context
            setCartIds(prev =>
                inCart
                    ? prev.filter(id => id !== listing.id)
                    : [...prev, listing.id]
            );
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
                        <h1 className={styles.title}>{listing.name}</h1>
                        <h3 className={styles.brand}>Brand: {listing.brand || 'No brand'}</h3>
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
