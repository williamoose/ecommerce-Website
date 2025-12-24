import React from 'react'
import styles from '../../styles/ListingCard.module.css'
import timeAgo from '../../utils/dateUtils.ts'
import type { Listing } from '../../types/listing';

type ListingCard = {
    profilephoto_url: string | undefined
    username: string 
    image_url: string | undefined
    name: string
    price: string
    condition: string
    size: string
    created_at: string
    onClick: () => void
}

export default function ListingCard({ 
    profilephoto_url, 
    username, 
    image_url, 
    name, 
    price, 
    condition, 
    size, 
    created_at,
    onClick
}: ListingCard) {
    return(
        <div className={styles.MainContainer} onClick={onClick} style={{ cursor: 'pointer' }}>
            <div className={styles.ContentContainer}>
                <div className={styles.ProfileContainer}>
                    <img src={`http://localhost:3000${profilephoto_url}`} className={styles.ProfilePicture} />
                    <div className={styles.ProfileDetails}>
                        <h2>{username}</h2>
                        <h3>{timeAgo(created_at)}</h3>
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