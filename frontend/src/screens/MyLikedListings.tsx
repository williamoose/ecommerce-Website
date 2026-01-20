import React, { useEffect, useState } from 'react'
import styles from '../styles/MyLikedListings.module.css'
import ListingCard from '../components/ui/ListingCard'
import { useNavigate } from 'react-router'
import type { Listing } from '../types/listing'

export default function MyLikedListings() {
    const [likedListings, setLikedListings] = useState<Listing[]>([])
    const [likedIds, setLikedIds] = useState<number[]>([]) // track liked listing IDs
    const navigate = useNavigate()

    // Fetch liked listings
    useEffect(() => {
        const fetchLikedListings = async () => {
            const token = localStorage.getItem('token')
            console.log('Token:', token)

            if (!token) {
                alert('You must be signed in to view liked listings')
                return
            }

            try {
                const res = await fetch('http://localhost:3000/api/listings/liked', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (!res.ok) {
                    throw new Error('Failed to fetch liked listings')
                }

                const data: Listing[] = await res.json()
                setLikedListings(data)
                setLikedIds(data.map(l => l.id)) // initialize likedIds
                console.log('Successfully fetched liked listings')
            } catch (error) {
                console.error('Error fetching liked listings:', error)
            }
        }

        fetchLikedListings()
    }, [])

    // Toggle like/unlike
    const handleToggleLike = async (listingId: number) => {
        const token = localStorage.getItem('token')
        if (!token) {
            alert('You must be signed in to like a listing')
            return
        }

        const isLiked = likedIds.includes(listingId)

        try {
            await fetch(`http://localhost:3000/api/listings/${listingId}/like`, {
                method: isLiked ? 'DELETE' : 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })

            // Update local likedIds immediately
            setLikedIds(prev =>
                isLiked
                    ? prev.filter(id => id !== listingId)
                    : [...prev, listingId]
            )

            // Optional: remove from likedListings if unliked (since this is MyLikedListings page)
            if (isLiked) {
                setLikedListings(prev =>
                    prev.filter(listing => listing.id !== listingId)
                )
            }
        } catch (error) {
            console.error('Failed to toggle like:', error)
        }
    }

    return (
        <div className={styles.MainContainer}>
            <div className={styles.ContentContainer}>
                <h1>Likes</h1>

                <div className={styles.ListingContainer}>
                    {likedListings.map(listing => (
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
                        onClick={() =>
                            navigate(`/listing/${listing.id}`, {
                                state: { listing },
                            })
                        }
                    />
                    ))}
                </div>
            </div>
        </div>
    )
}
