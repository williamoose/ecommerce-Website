import React from 'react'
import styles from '../../styles/ListingCard.module.css'
import timeAgo from '../../utils/dateUtils.ts'
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import { IoCartOutline, IoCartSharp } from "react-icons/io5";

type ListingCardProps = {
    profilephoto_url: string | undefined
    username: string
    image_url: string | undefined
    name: string
    price: string
    condition: string
    size: string
    created_at: string
    isLiked?: boolean            
    onLikeToggle?: () => void    
    onClick: () => void
    inCart?: boolean
    onCartToggle?: () => void
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
    isLiked = false,
    onLikeToggle,
    onClick,
    inCart = false,
    onCartToggle,
}: ListingCardProps) {
    return (
        <div className={styles.MainContainer}>
            <div className={styles.ContentContainer} onClick={onClick} style={{ cursor: 'pointer' }}>
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
                <div className={styles.ButtonsContainer}>
                    {onLikeToggle && (
                        <button 
                            className={styles.LikeButton} 
                            onClick={(e) => {
                                e.stopPropagation()  
                                onLikeToggle()
                            }}
                        >
                            {isLiked ? <IoMdHeart /> : <IoIosHeartEmpty />}
                        </button>
                    )}
                    {onCartToggle && (
                        <button
                            className={styles.CartButton}
                            onClick={(e) => {
                                e.stopPropagation()
                                onCartToggle()
                            }}
                        >
                            {inCart ? <IoCartOutline /> : <IoCartSharp />}
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
