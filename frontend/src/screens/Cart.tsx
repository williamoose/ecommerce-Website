import React from 'react'
import ListingCard from '../components/ui/ListingCard'
import { useNavigate } from 'react-router'
import { useUserData } from '../contexts/UserDataContext'
import type { Listing } from '../types/listing'
import styles from '../styles/Cart.module.css'

interface MyCartProps {
  allListings: Listing[]; // pass all listings so we can filter by cartIds
}

export default function MyCart({ allListings }: MyCartProps) {
    const { cartIds, setCartIds } = useUserData()
    const navigate = useNavigate()

    // Filter listings that are in cart
    const cartItems = allListings.filter(listing => cartIds.includes(listing.id))

    const handleCartToggle = async (listingId: number) => {
        const token = localStorage.getItem('token')
        if (!token) return

        const inCart = cartIds.includes(listingId)

        try {
            await fetch(`http://localhost:3000/api/cart/${listingId}`, {
                method: inCart ? 'DELETE' : 'POST',
                headers: { Authorization: `Bearer ${token}` },
            })

            // Update context state
            setCartIds(prev =>
                inCart ? prev.filter(id => id !== listingId) : [...prev, listingId]
            )
            } catch (err) {
            console.error(err)
        }
    }

  return (
        <div className={styles.MainContainer}>
            <div className={styles.ContentContainer}>
                <h1>Shopping Cart</h1>
                <div className={styles.ListingContainer}>
                    <div className={styles.ItemContainer}>
                        {cartItems.map(cartItem => (
                            <ListingCard
                                key={cartItem.id}
                                profilephoto_url={cartItem.profilephoto_url}
                                username={cartItem.username}
                                image_url={cartItem.image_url}
                                name={cartItem.name}
                                price={cartItem.price}
                                condition={cartItem.condition}
                                size={cartItem.size}
                                created_at={cartItem.created_at}
                                isLiked={cartItem.includes(cartItem.id)}
                                onLikeToggle={() => handleToggleLike(cartItem.id)}
                                inCart={cartIds.includes(cartItem.id)}
                                onCartToggle={() =>
                                    handleCartToggle(cartItem.id, cartIds.includes(cartItem.id))
                                }
                                onClick={() =>
                                    navigate(`/listing/${cartItem.id}`, { state: { cartItem } })
                                }
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
