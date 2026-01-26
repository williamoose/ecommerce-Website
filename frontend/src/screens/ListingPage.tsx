import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import type { Listing } from '../types/listing';
import timeAgo from '../utils/dateUtils';
import styles from '../styles/ListingPage.module.css';
import { useUserData } from '../contexts/UserDataContext';

const ListingPage = () => {
    const location = useLocation();
    const { id } = useParams<{ id: string }>();
    const [listing, setListing] = useState<Listing | null>(location.state?.listing || null);
    const [loading, setLoading] = useState(!listing);
    const { cartIds, setCartIds } = useUserData();

    // Fetch full listing data if not passed via state 
    useEffect(() => {
        const fetchListing = async () => {
            if (!id) return;

            try {
                const response = await fetch(`http://localhost:3000/api/listings/${id}`);
                
                if (!response.ok) {
                    throw new Error('Failed to fetch listing');
                }
                
                const data = await response.json();
                setListing(data);
            } catch (err) {
                console.error('Error fetching listing:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchListing();
    }, [id]);

    console.log('Listing data:', listing);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!listing) {
        return <div>No listing data</div>;
    }

    const inCart = cartIds.includes(listing.id);

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
                    <p className={styles.posted}>Posted {timeAgo(listing.created_at)}</p>

                    <p className={styles.brand}>{listing.brand || 'Unknown Brand'}</p>

                    <h1 className={styles.title}>{listing.name}</h1>

                    <p className={styles.price}>${listing.price}</p>

                    <button
                        className={styles.addToCartButton}
                        onClick={handleCartToggle}
                    >
                        {inCart ? 'Remove from Cart' : 'Add to Cart'}
                    </button>

                    <div className={styles.divider}></div>

                    <div className={styles.detailsSection}>
                        <h3 className={styles.sectionTitle}>Product Details</h3>
                        <div className={styles.detailsGrid}>
                            <div className={styles.detailItem}>
                                <span className={styles.detailLabel}>Condition</span>
                                <span className={styles.detailValue}>{listing.condition}</span>
                            </div>
                            <div className={styles.detailItem}>
                                <span className={styles.detailLabel}>Size</span>
                                <span className={styles.detailValue}>{listing.size}</span>
                            </div>
                        </div>
                    </div>

                    {listing.description && (
                        <>
                            <div className={styles.divider}></div>
                            <div className={styles.descriptionSection}>
                                <h3 className={styles.sectionTitle}>About this item</h3>
                                <p className={styles.descriptionText}>{listing.description}</p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ListingPage;
