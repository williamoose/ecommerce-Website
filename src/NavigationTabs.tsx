import React, { useState } from 'react'
import './NavigationTabs.css'
import Logo from './assets/Logo.png'
import { CgProfile, CgHeart, CgShoppingCart, CgSearch } from "react-icons/cg";
import { IoChatbubbleOutline } from "react-icons/io5";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { useNavigate } from "react-router-dom"

export default function NavigationTabs() {

    let navigate = useNavigate();

    return(
        <div className="NavigationTabsContainer">
            <img className="Logo" src={Logo} />
            <button>Discover</button>
            <button>New Arrivals</button>
            <button>Categories</button>
            <div className="SearchBarContainer">
                <CgSearch className="SearchIcon"/>
                <input className="SearchBar" placeholder="search" />
            </div>
            <div className="IconsContainer">
                <CgProfile className="Icon" />
                <CgHeart className='Icon'/>
                <CgShoppingCart className='Icon'/>
                <HiOutlineBellAlert className='Icon'/>
                <IoChatbubbleOutline className='Icon'/>
                <button className="SellButton" onClick={() => navigate('/Sell')}>Sell</button>
            </div>
        </div>
    )
}
