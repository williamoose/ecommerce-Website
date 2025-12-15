import React, { useState } from 'react'
import styles from '../styles/MyLikedListings.module.css'
import ListingCard from '../components/ui/ListingCard'

export default function myLikedListings() {

const listings = [
  { id: 1, name: 'Denim Jacket', price: '$45', condition: 'Lightly Used', size: 'M', username: 'clotheslover21', image: 'https://picsum.photos/seed/jacket1/300/250', profilePicture: 'https://picsum.photos/seed/profile1/40/40' },
]

    return(
        <div className={styles.MainContainer}>
            <div className={styles.ContentContainer}>
                <h1>Likes</h1>
                <div className={styles.ListingContainer}>
                    {listings.map(listing => {
                        return (
                            <ListingCard
                            key={listing.id}
                            profilePicture={listing.profilePicture}
                            username={listing.username}
                            image={listing.image}
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