import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { Listing } from '../types/listing';
import timeAgo from '../utils/dateUtils';
import styles from '../styles/ListingPage.module.css';

const ListingPage = () => {
  const location = useLocation();
  const { listing } = location.state as { listing: Listing };

  if (!listing) {
    return <div>No listing data</div>;
  }

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
                    <h1 className={styles.brand}>{listing.brand} || "HI"</h1>
                    <h2 className={styles.title}>{listing.name}</h2>
                    <p className={styles.price}>S${listing.price}</p>
                </div>
                <button className={styles.addToCartButton}>Add to Cart</button>
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
