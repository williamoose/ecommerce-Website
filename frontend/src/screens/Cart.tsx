import React, { useEffect, useState } from 'react'
import ListingCard from '../components/ui/ListingCard'
import { useNavigate } from 'react-router'
import type { Listing } from '../types/listing'

export default function MyCart() {
    const [cartItems, setCartItems] = useState<Listing[]>([])
    const navigate = useNavigate()

    const fetchCart = async () => {
        const token = localStorage.getItem('token')
        if (!token) return

        try {
            const res = await fetch('http://localhost:3000/api/cart', {
                headers: { Authorization: `Bearer ${token}` },
            })
            if (!res.ok) throw new Error('Failed to fetch cart')
            const data = await res.json()
            setCartItems(data)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchCart()
    }, [])

    const handleCartToggle = async (listingId: number, inCart: boolean) => {
        const token = localStorage.getItem('token')
        if (!token) return

        try {
            await fetch(`http://localhost:3000/api/cart/${listingId}`, {
                method: inCart ? 'DELETE' : 'POST',
                headers: { Authorization: `Bearer ${token}` },
            })
            setCartItems(prev =>
                inCart ? prev.filter(item => item.id !== listingId) : prev
            )
            if (!inCart) fetchCart() // refresh cart
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div>
            <h1>My Cart</h1>
            <div>
                {cartItems.map(listing => (
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
                    inCart={true}
                    onCartToggle={() => handleCartToggle(listing.id, true)}
                    onClick={() =>
                        navigate(`/listing/${listing.id}`, { state: { listing } })
                    }
                    />
                ))}
            </div>
        </div>
    )
}
