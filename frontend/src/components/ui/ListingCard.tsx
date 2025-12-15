import React, { useState } from 'react'
import styles from '../../styles/ListingCard.module.css'

type ListingCard = {
    profilePicture: string
    username: string
    image: string
    name: string
    price: string
    condition: string
    size: string
}

export default function ListingCard({ profilePicture, username, image, name, price, condition, size }: ListingCard) {
    return(
        <div className={styles.MainContainer}>
            <div className={styles.ContentContainer}>
                <div className={styles.ProfileContainer}>
                    <img src={profilePicture} className={styles.ProfilePicture} />
                    <div className={styles.ProfileDetails}>
                        <h2>{username}</h2>
                        <h3>2 years ago</h3>
                    </div>
                </div>
                <img src={image} className={styles.ListingImage} />
                <div className={styles.ListingDescription}>
                    <p>{name}</p>
                    <div className={styles.ListingPrice}>S${price}</div>
                    <p>{condition}</p>
                    <p>Size: {size}</p>
                </div>
            </div>
        </div>
    )
}