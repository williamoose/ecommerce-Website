import React from 'react'
import BeachFashion from '../assets/BeachFashion.jpg'
import { useNavigate } from "react-router";
import styles from '../styles/MyListings.module.css'

export default function MyListings() {

    const navigate = useNavigate()

    type listing = {
        id: number
        name: string
        price: number
        size: string
        image: string
    }

    const listings: listing[] = [
        { id: 1, name: "Piano", price: 100, size: "EU30/US4", image: BeachFashion },
        { id: 2, name: "Menguin", price: 1000, size: "EU30/US4", image: BeachFashion },
        { id: 3, name: "Blanket", price: 2, size: "EU30/US4",  image: BeachFashion },
        { id: 4, name: "Carrot", price: 10000, size: "EU30/US4",  image: BeachFashion },
        { id: 5, name: "Dino", price: 50, size: "EU30/US4",  image: BeachFashion },
        { id: 6, name: "Aircon", price: 500, size: "EU30/US4",  image: BeachFashion }
    ];

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
                            <img className={styles.ListingImage} src={item.image} alt={item.name} />
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
