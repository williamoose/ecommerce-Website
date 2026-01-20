import React, { useState } from 'react'
import Logo from '../../assets/Logo.png'
import { CgProfile, CgHeart, CgShoppingCart, CgSearch } from "react-icons/cg";
import { IoChatbubbleOutline } from "react-icons/io5";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { useNavigate } from "react-router-dom"
import styles from '../../styles/NavigationTabs.module.css'

export default function NavigationTabs() {

    let navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && searchQuery.trim() !== '') {
            navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
        }
    }

    return(
        <div className={styles.NavigationTabsContainer}>
            <img className={styles.Logo} src={Logo} alt="Logo" />
            <button className={styles.Sections} onClick={() => navigate('/discover')}>Discover</button>
            <button className={styles.Sections} onClick={() => navigate('/new-arrivals')}>New Arrivals</button>
            <div className={styles.CategoriesWrapper}>
                <button className={styles.Sections}>Categories</button>

                <div className={styles.Dropdown}>
                    <button onClick={() => navigate('/category/dresses')}>Dresses</button>
                    <button onClick={() => navigate('/category/skirts')}>Skirts</button>
                    <button onClick={() => navigate('/category/pants')}>Pants</button>
                    <button onClick={() => navigate('/category/shirts')}>Shirts</button>
                    <button onClick={() => navigate('/category/socks')}>Socks</button>
                    <button onClick={() => navigate('/category/underwear')}>Underwear</button>
                    <button onClick={() => navigate('/category/jackets')}>Jackets</button>
                </div>
            </div>            
            <div className={styles.SearchBarContainer}>
                <CgSearch className={styles.SearchIcon}/>
                <input
                    className={styles.SearchBar}
                    placeholder="search"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearch} 
                />
            </div>
            <div className={styles.IconsContainer}>
                <button className={styles.Icon} onClick={() => navigate('/my-listings')}>
                    <CgProfile />
                </button> 
                <button className={styles.Icon} onClick={() => navigate('/my-liked-listings')}>
                    <CgHeart />
                </button>
                <button className={styles.Icon} onClick={() => navigate('/cart')}>
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

