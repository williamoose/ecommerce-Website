import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";

import './styles/App.css'

import SignUp from './screens/SignUp';
import SignIn from './screens/SignIn';
import MyListings from './screens/MyListings'
import Sell from './screens/Sell'
import MyLikedListings from './screens/MyLikedListings';
import NavigationTabs from './components/ui/NavigationTabs';

function App() {

    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    // Public Routes
                    <Route index element={<SignIn />} />
                    <Route path="/SignUp" element={<SignUp />} />
                    <Route path="/SignIn" element={<SignIn />} />

                    // Protected Routes
                    <Route element={<ProtectedRoute />}>
                        <Route element={<ProtectedLayout />}>
                            <Route path="/MyListings" element={<MyListings />} />
                            <Route path="/Sell" element={<Sell />} />
                            <Route path="/MyLikedListings" element={<MyLikedListings />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

const ProtectedLayout = () => (
    <>
        <NavigationTabs />
        <Outlet />
    </>
);

export default App
