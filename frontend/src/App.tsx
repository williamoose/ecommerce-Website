import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";

import './styles/App.css'

import SignUp from './screens/auth/SignUp';
import SignIn from './screens/auth/SignIn';
import MyListings from './screens/MyListings'
import Sell from './screens/Sell'
import MyLikedListings from './screens/MyLikedListings';
import NavigationTabs from './components/ui/NavigationTabs';
import Discover from './screens/Discover';
import NewArrivals from './screens/NewArrivals';
import ListingPage from './screens/ListingPage';
import Cart from './screens/Cart';
import CategoryPage from './screens/CategoryPage';
import SearchPage from './screens/SearchPage';
import { UserDataProvider } from './contexts/UserDataContext';

function App() {
    return (
        <AuthProvider>
            <UserDataProvider>
                <BrowserRouter>
                    <Routes>
                        // Public Routes
                        <Route index element={<SignIn />} />
                        <Route path="/signUp" element={<SignUp />} />
                        <Route path="/signIn" element={<SignIn />} />

                        // Protected Routes
                        <Route element={<ProtectedRoute />}>
                            <Route element={<ProtectedLayout />}>
                                <Route path="/discover" element={<Discover />} />
                                <Route path="/new-arrivals" element={<NewArrivals />} />
                                <Route path="/my-listings" element={<MyListings />} />
                                <Route path="/sell" element={<Sell />} />
                                <Route path="/my-liked-listings" element={<MyLikedListings />} />
                                <Route path="/listing/:id" element={<ListingPage />} />
                                <Route path="/cart" element={<Cart />} />
                                <Route path="/category/:categoryName" element={<CategoryPage />} />
                                <Route path="/search" element={<SearchPage />} />
                            </Route>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </UserDataProvider>
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
