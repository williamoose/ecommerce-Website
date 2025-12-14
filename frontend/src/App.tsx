import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import SignUp from './screens/SignUp';
import SignIn from './screens/SignIn';
import MyListings from './screens/MyListings'
import Sell from './screens/Sell'
import MyLikedListings from './screens/MyLikedListings';
import './styles/App.css'
import NavigationTabs from './components/NavigationTabs';

function App() {

    return (
        <BrowserRouter>
            <NavigationTabs />
            <Routes>
                <Route index element={<SignIn />} />
                <Route path="/SignUp" element={<SignUp />} />
                <Route path="/SignIn" element={<SignIn />} />
                <Route path="/MyListings" element={<MyListings />} />
                <Route path="/Sell" element={<Sell />} />
                <Route path="/MyLikedListings" element={<MyLikedListings />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
