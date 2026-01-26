import React from 'react'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { PiShoppingCartLight, PiShoppingCartFill } from 'react-icons/pi'
import styles from '../../styles/ListingCard.module.css'
import timeAgo from '../../utils/dateUtils.ts'

type ListingCardProps = {
    profilephoto_url: string | undefined
    username: string
    image_url: string | undefined
    name: string
    price: string
    condition: string
    size: string
    created_at: string
    isLiked: boolean
    onLikeToggle: () => void
    inCart: boolean
    onCartToggle: () => void
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
    isLiked,
    onLikeToggle,
    inCart,
    onCartToggle,
    onClick,
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
                    <div className={styles.SpecsContainer}>
                        <span className={styles.Spec}>{condition}</span>
                        <span className={styles.SpecDot}>•</span>
                        <span className={styles.Spec}>Size: {size}</span>
                    </div>
                </div>

                <div className={styles.ButtonsContainer} onClick={(e) => e.stopPropagation()}>
                    <button
                        className={`${styles.LikeButton} ${isLiked ? styles.active : ''}`}
                        onClick={onLikeToggle}
                        title={isLiked ? 'Unlike' : 'Like'}
                    >
                        {isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
                    </button>
                    <button
                        className={`${styles.CartButton} ${inCart ? styles.active : ''}`}
                        onClick={onCartToggle}
                        title={inCart ? 'Remove from cart' : 'Add to cart'}
                    >
                        {inCart ? <PiShoppingCartFill /> : <PiShoppingCartLight />}
                    </button>
                </div>
            </div>
        </div>
    )
}
