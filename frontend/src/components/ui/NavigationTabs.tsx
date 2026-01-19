import React from 'react'
import Logo from '../../assets/Logo.png'
import { CgProfile, CgHeart, CgShoppingCart, CgSearch, CgLogOut } from "react-icons/cg";
import { useNavigate } from "react-router-dom"
import { useAuth } from '../../contexts/AuthContext';
import styles from '../../styles/NavigationTabs.module.css'

export default function NavigationTabs() {

    const { logout } = useAuth();
    let navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/SignIn');
    }

    return(
        <div className={styles.NavigationTabsContainer}>
            <img className={styles.Logo} src={Logo} alt="Logo" />
            <button className={styles.Sections} onClick={() => navigate('/discover')}>Discover</button>
            <button className={styles.Sections} onClick={() => navigate('/new-arrivals')}>New Arrivals</button>
            <div className={styles.CategoriesWrapper}>
                <button className={styles.Sections}>Categories</button>

                <div className={styles.Dropdown}>
                    <button onClick={() => navigate('/category/men')}>Men</button>
                    <button onClick={() => navigate('/category/women')}>Women</button>
                    <button onClick={() => navigate('/category/shoes')}>Shoes</button>
                    <button onClick={() => navigate('/category/accessories')}>Accessories</button>
                </div>
            </div>
            <div className={styles.SearchBarContainer}>
                <CgSearch className={styles.SearchIcon}/>
                <input className={styles.SearchBar} placeholder="search" />
            </div>
            <div className={styles.IconsContainer}>
                <button className={styles.Icon} onClick={() => navigate('/My-listings')}>
                    <CgProfile />
                </button> 
                <button className={styles.Icon} onClick={() => navigate('/My-liked-listings')}>
                    <CgHeart />
                </button>
                <button className={styles.Icon} onClick={() => navigate('/cart')}>
                    <CgShoppingCart />
                </button>
                <button className={styles.SellButton} onClick={() => navigate('/sell')}>Sell</button>
                <button
                className={`${styles.Icon} ${styles.LogoutIcon}`}
                onClick={handleLogout}
                >
                    <CgLogOut />
                </button>

            </div>
        </div>
    )
}

