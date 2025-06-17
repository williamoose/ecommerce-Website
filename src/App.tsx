import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from './SignUp';
import SignIn from './SignIn';
import NavigationTabs from './NavigationTabs';
import MyListings from './Listings/MyListings'
import './App.css'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<MyListings />} />
                <Route path="/SignUp" element={<SignUp />} />
                <Route path="/SignIn" element={<SignIn />} />
                <Route path="/MyListings" element={<MyListings />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
