import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ListingCard from '../components/ui/ListingCard';
import type { Listing } from '../types/listing';
import styles from '../styles/MyLikedListings.module.css';
import { useUserData } from '../contexts/UserDataContext';

export default function SearchPage() {
    const [listings, setListings] = useState<Listing[]>([]);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const { likedIds, setLikedIds, cartIds, setCartIds } = useUserData();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query') || '';

    useEffect(() => {
        if (!query) return;

        const fetchListings = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/listings/search?q=${encodeURIComponent(query)}`, {
                    headers: token ? { Authorization: `Bearer ${token}` } : undefined
                });
                if (!res.ok) throw new Error('Failed to fetch listings');
                const data = await res.json();
                setListings(data);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        fetchListings();
    }, [query, token]);

    return (
        <div className={styles.MainContainer}>
            <div className={styles.ContentContainer}>
                <h1>Search results for "{query}"</h1>

                <div className={styles.ListingContainer}>
                    {listings.map(listing => (
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
                            isLiked={likedIds.includes(listing.id)}
                            onLikeToggle={() => {}}
                            inCart={cartIds.includes(listing.id)}
                            onCartToggle={() => {}}
                            onClick={() => navigate(`/listing/${listing.id}`, { state: { listing } })}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
