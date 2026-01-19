import React, { useEffect, useState } from 'react'
import styles from '../styles/MyLikedListings.module.css'
import ListingCard from '../components/ui/ListingCard'
import { useNavigate } from "react-router";
import type { Listing } from '../types/listing';

export default function Discover() {
    const [listings, setListings] = useState<Listing[]>([])
    const [likedIds, setLikedIds] = useState<number[]>([])
    const [cartIds, setCartIds] = useState<number[]>([])
    const navigate = useNavigate()

    const token = localStorage.getItem('token')

    // Fetch discover listings
    useEffect(() => {
        const fetchListings = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/listings/discover', {
                    headers: token ? { Authorization: `Bearer ${token}` } : undefined
                })
                if (!res.ok) throw new Error('Failed to fetch listings')
                const data = await res.json()
                setListings(data)
            } catch (error) {
                console.error('Error fetching discover listings:', error)
            }
        }
        fetchListings()
    }, [token])

    // Fetch cart items for the logged-in user
    useEffect(() => {
        if (!token) return

        const fetchCart = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/cart', {
                    headers: { Authorization: `Bearer ${token}` }
                })
                if (!res.ok) throw new Error('Failed to fetch cart')
                const data: { listing_id: number }[] = await res.json()
                setCartIds(data.map(item => item.listing_id))
            } catch (error) {
                console.error('Error fetching cart:', error)
            }
        }

        fetchCart()
    }, [token])

    // Toggle like/unlike
    const handleToggleLike = async (listingId: number) => {
        if (!token) {
            alert('You must be signed in to like a listing')
            return
        }
        const isLiked = likedIds.includes(listingId)
        try {
            await fetch(`http://localhost:3000/api/listings/${listingId}/like`, {
                method: isLiked ? 'DELETE' : 'POST',
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
            })
            setLikedIds(prev => isLiked ? prev.filter(id => id !== listingId) : [...prev, listingId])
        } catch (error) {
            console.error('Failed to toggle like:', error)
        }
    }

    // Toggle cart
    const handleCartToggle = async (listingId: number, isInCart: boolean) => {
        if (!token) {
            alert('You must be signed in to add to cart')
            return
        }
        try {
            await fetch(`http://localhost:3000/api/cart/${listingId}`, {
                method: isInCart ? 'DELETE' : 'POST',
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
            })
            setCartIds(prev => isInCart ? prev.filter(id => id !== listingId) : [...prev, listingId])
        } catch (error) {
            console.error('Failed to toggle cart:', error)
        }
    }

    return (
        <div className={styles.MainContainer}>
            <div className={styles.ContentContainer}>
                <h1>Hidden gems picked for you!</h1>
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
                        onLikeToggle={() => handleToggleLike(listing.id)}
                        inCart={cartIds.includes(listing.id)}
                        onCartToggle={() => handleCartToggle(listing.id, cartIds.includes(listing.id))}
                        onClick={() => navigate(`/listing/${listing.id}`, { state: { listing } })}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
