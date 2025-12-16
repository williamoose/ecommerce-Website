import React, { useEffect, useState } from 'react'
import BeachFashion from '../assets/BeachFashion.jpg'
import { useNavigate } from "react-router";
import styles from '../styles/MyListings.module.css'

type Listing = {
    id: number
    name: string
    price: string
    size: string
    image: string
}

export default function MyListings() {
    const [listings, setListings] = useState<Listing[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchListings = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                alert('You must be signed in to list an item');
                return;
            }

            try {
                const res = await fetch('http://localhost:3000/api/listings', {
                    headers:{
                        Authorization: `Bearer ${token}`
                    },
                });
                if (!res.ok) {
                    throw new Error('Failed to fetch listings');
                }
                const data = await res.json();
                setListings(data);
                console.log('Successfully fetched listings');
            } catch (error) {
                console.error('Error fetching listings:', error);       
            }
        };

        fetchListings();
    }, []);

    return(
        <div className={styles.MainContainer}>
            <div className={styles.ContentContainer}>
                <div className={styles.ProfileContainer}>
                    <img className={styles.ProfilePhoto} src={BeachFashion} alt="Profile" />
                    <div className={styles.ProfileText}>
                        <div className={styles.Username}>@Williamoose</div>
                        <button className={styles.ViewProfileButton}>
                            Profile Details ▼
                        </button>
                    </div>
                    <button className={styles.EditProfile}>Edit Profile</button>
                </div>
                <div className={styles.ListingsHeader}>Listings</div>
                <div className={styles.ListingsContainer}>
                    {listings.map(item => (
                        <button key={item.id} className={styles.IndividualListing}>
                            <img className={styles.ListingImage} src={BeachFashion} alt={item.name} />
                            <div className={styles.ListingName}>{item.name}</div>
                            <div className={styles.ListingPrice}>${item.price}</div>
                            <div className={styles.ListingSize}>Size: {item.size}</div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
