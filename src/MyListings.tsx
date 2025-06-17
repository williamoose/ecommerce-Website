import React, { useState } from 'react'
import BeachFashion from './assets/BeachFashion.jpg'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router";
import NavigationTabs from './NavigationTabs'
import './MyListings.css'

export default function MyListings() {

    const listings = [
    { id: 1, name: "Piano", price: 100, size: "EU30/US4", image: BeachFashion },
    { id: 2, name: "Menguin", price: 1000, size: "EU30/US4", image: BeachFashion },
    { id: 3, name: "Blanket", price: 2, size: "EU30/US4",  image: BeachFashion },
    { id: 4, name: "Carrot", price: 10000, size: "EU30/US4",  image: BeachFashion },
    { id: 5, name: "Dino", price: 50, size: "EU30/US4",  image: BeachFashion },
    { id: 6, name: "Aircon", price: 500, size: "EU30/US4",  image: BeachFashion }
    ];

    return(
        <div className="MainContainer">
            <NavigationTabs />
            <div className="MainWrapper">
                <div className="ProfileContainer">
                    <img className="ProfilePhoto" src={BeachFashion} />
                    <div className="ProfileText">
                        <div className="Username">@Williamoose</div>
                        <button className="ViewProfileButton">
                            Profile Details 
                        </button>
                    </div>
                    <button className="EditProfile">Edit Profile</button>
                </div>
                <div className="ListingsHeader">Listings</div>
                <div className="ListingsContainer">
                    {listings.map(item => (
                        <button key={item.id} className="IndividualListing">
                            <img className="ListingImage" src={item.image} />
                            <div className="ListingName">{item.name}</div>
                            <div className="ListingPrice">${item.price}</div>
                            <div className="ListingSize">Size: {item.size}</div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}