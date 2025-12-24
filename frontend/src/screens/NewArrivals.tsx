import React, { useEffect, useState } from 'react'
import styles from '../styles/MyLikedListings.module.css'
import ListingCard from '../components/ui/ListingCard'
import { useNavigate } from "react-router";
import type { Listing } from '../types/listing';

export default function NewArrivals() {
    const [listings, setListings] = useState<Listing[]>([]);
    
    const navigate = useNavigate();

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/listings/new-arrivals');

                if (!res.ok) {
                    throw new Error('Failed to fetch newArrivals listings');
                }

                const data = await res.json();
                console.log(data);
                setListings(data);
                console.log('Successfully fetched newArrivals listings');
            } catch (error) {
                console.error('Error fetching newArrivals listings:', error);       
            }
        }
        
        fetchListings();
    }, []);

    return(
        <div className={styles.MainContainer}>
            <div className={styles.ContentContainer}>
                <h1>Fresh finds just dropped!</h1>
                <div className={styles.ListingContainer}>
                    {listings.map(listing => {
                        console.log('profilephoto_url:', listing.profilephoto_url)
                        return (
                            <ListingCard
                            key={listing.id}
                            profilephoto_url={listing.profilephoto_url}
                            username={listing.username}
                            image_url={listing.image_url}
                            name={listing.name}
                            price={listing.price}
                            condition={listing.condition}
                            size={listing.size}
                            created_at={listing.created_at}
                            onClick={() => navigate(`/listing/${listing.id}`)}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}