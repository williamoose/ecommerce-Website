import React from 'react'
import styles from '../../styles/ListingCard.module.css'

type ListingCard = {
    profilePicture_url: string | undefined
    username: string 
    image_url: string | undefined
    name: string
    price: string
    condition: string
    size: string
}

export default function ListingCard({ profilePicture_url, username, image_url, name, price, condition, size }: ListingCard) {
    return(
        <div className={styles.MainContainer}>
            <div className={styles.ContentContainer}>
                <div className={styles.ProfileContainer}>
                    <img src={`http://localhost:3000${profilePicture_url}`} className={styles.ProfilePicture} />
                    <div className={styles.ProfileDetails}>
                        <h2>{username}</h2>
                        <h3>2 years ago</h3>
                    </div>
                </div>
                <img src={`http://localhost:3000${image_url}`} className={styles.ListingImage} />
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