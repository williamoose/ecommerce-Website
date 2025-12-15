import React from 'react'
import Logo from '../../assets/Logo.png'
import { CgProfile, CgHeart, CgShoppingCart, CgSearch } from "react-icons/cg";
import { IoChatbubbleOutline } from "react-icons/io5";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { useNavigate } from "react-router-dom"
import styles from '../../styles/NavigationTabs.module.css'

export default function NavigationTabs() {

    let navigate = useNavigate();

    return(
        <div className={styles.NavigationTabsContainer}>
            <img className={styles.Logo} src={Logo} alt="Logo" />
            <button className={styles.Sections}>Discover</button>
            <button className={styles.Sections}>New Arrivals</button>
            <button className={styles.Sections}>Categories</button>
            <div className={styles.SearchBarContainer}>
                <CgSearch className={styles.SearchIcon}/>
                <input className={styles.SearchBar} placeholder="search" />
            </div>
            <div className={styles.IconsContainer}>
                <button className={styles.Icon} onClick={() => navigate('/MyListings')}>
                    <CgProfile />
                </button> 
                <button className={styles.Icon} onClick={() => navigate('/MyLikedListings')}>
                    <CgHeart />
                </button>
                <button className={styles.Icon}>
                    <CgShoppingCart />
                </button>
                <button className={styles.Icon}>
                    <HiOutlineBellAlert />
                </button>
                <button className={styles.Icon}>
                    <IoChatbubbleOutline />
                </button>
                <button className={styles.SellButton} onClick={() => navigate('/Sell')}>Sell</button>
            </div>
        </div>
    )
}

