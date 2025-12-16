import React, { useEffect, useState } from 'react'
import styles from '../styles/MyLikedListings.module.css'
import ListingCard from '../components/ui/ListingCard'
import { useNavigate } from "react-router";
import BeachFashion from '../assets/BeachFashion.jpg'

type Listing = {
    id: number
    name: string
    price: string
    size: string
    image_url?: string
    profilePicture?: string
    username: string
    condition: string
}

export default function Discover() {
    const [listings, setListings] = useState<Listing[]>([]);
    
    const navigate = useNavigate();

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/discover');

                if (!res.ok) {
                    throw new Error('Failed to fetch listings');
                }

                const data = await res.json();
                setListings(data);
                console.log('Successfully fetched discover listings');
            } catch (error) {
                console.error('Error fetching discover listings:', error);       
            }
        }
        
        fetchListings();
    }, []);

    return(
        <div className={styles.MainContainer}>
            <div className={styles.ContentContainer}>
                <h1>Likes</h1>
                <div className={styles.ListingContainer}>
                    {listings.map(listing => {
                        return (
                            <ListingCard
                            key={listing.id}
                            profilePicture={BeachFashion}
                            // profilePicture={listing.profilePicture}
                            username="williamoose"
                            // username={listing.username}
                            image={listing.image_url}
                            name={listing.name}
                            price={listing.price}
                            condition={listing.condition}
                            size={listing.size}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}