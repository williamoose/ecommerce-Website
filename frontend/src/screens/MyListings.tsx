import React, { useEffect, useState, useRef } from 'react'
import BeachFashion from '../assets/BeachFashion.jpg'
import { useNavigate } from "react-router";
import { useAuth } from '../contexts/AuthContext';
import styles from '../styles/MyListings.module.css'
import type { Listing } from '../types/listing'
import EditProfileModal from '../components/ui/EditProfileModal';

export default function MyListings() {
    const [listings, setListings] = useState<Listing[]>([]);
    const [newProfilePhoto, setNewProfilePhoto] = useState<string>('');
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [showEditProfileModal, setShowEditProfileModal] = useState(false);
    
    const { user } = useAuth();

    const inputRef = useRef<HTMLInputElement>(null);

    const handleSelectedPhotos = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const token = localStorage.getItem('token');

        if (!token) {
            alert('You must be signed in to update profile photo');
            return;
        }

        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setNewProfilePhoto(URL.createObjectURL(file));
            
            const formData = new FormData();
            formData.append('profilePhoto', file);

            try {
                const res = await fetch('http://localhost:3000/api/users/profile-photo', {
                    method: 'PATCH',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                });

                if (!res.ok) {
                    throw new Error('Failed to upload profile photo');
                }

                console.log('Profile photo updated successfully');
            } catch (err) {
                console.error('Error uploading profile photo:', err);
            }
        }
    };

    const handleImageClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    useEffect(() => {
        const fetchListings = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                alert('You must be signed in to list an item');
                return;
            }

            try {
                const res = await fetch('http://localhost:3000/api/listings/mylistings', {
                    headers:{
                        Authorization: `Bearer ${token}`
                    },
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch listings');
                }

                const data = await res.json();
                setListings(data);
                console.log('Successfully fetched listings');
            } catch (error) {
                console.error('Error fetching listings:', error);       
            }
        };

        console.log(user?.image_url);
        fetchListings();
    }, []);

    return(
        <div className={styles.MainContainer}>
            <EditProfileModal 
                isOpen={showEditProfileModal}
                onClose={() => setShowEditProfileModal(false)}
            />
            {showProfileModal && (
                <div className={styles.ModalOverlay} onClick={() => setShowProfileModal(false)}>
                    <div className={styles.Modal} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.CloseButton} onClick={() => setShowProfileModal(false)}>✕</button>
                        <h2 className={styles.ModalTitle}>Profile Details</h2>
                        <div className={styles.ModalContent}>
                            <div className={styles.DetailRow}>
                                <span className={styles.DetailLabel}>First Name:</span>
                                <span className={styles.DetailValue}>{user?.firstName || 'N/A'}</span>
                            </div>
                            <div className={styles.DetailRow}>
                                <span className={styles.DetailLabel}>Last Name:</span>
                                <span className={styles.DetailValue}>{user?.lastName || 'N/A'}</span>
                            </div>
                            <div className={styles.DetailRow}>
                                <span className={styles.DetailLabel}>Username:</span>
                                <span className={styles.DetailValue}>{user?.username || 'N/A'}</span>
                            </div>
                            <div className={styles.DetailRow}>
                                <span className={styles.DetailLabel}>Email:</span>
                                <span className={styles.DetailValue}>{user?.email || 'N/A'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className={styles.ContentContainer}>
                <div className={styles.ProfileContainer}>
                    <div className={styles.ProfilePhotoContainer}>
                        <img
                        className={styles.ProfilePhoto}
                         src={
                            newProfilePhoto !== '' 
                            ? newProfilePhoto 
                            : user?.image_url 
                                ? `http://localhost:3000${user.image_url}` 
                                : BeachFashion
                        }
                        onClick={handleImageClick} 
                        style={{ cursor: 'pointer' }}
                        />
                        <input
                        ref={inputRef} 
                        id="PhotosInput"
                        style={{ display: 'none' }}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleSelectedPhotos}
                        />
                    </div>
                    <div className={styles.ProfileText}>
                        <div className={styles.Username}>{user?.username || 'user'}</div>
                        <button className={styles.ViewProfileButton} onClick={() => setShowProfileModal(true)}>
                            Profile Details ▼
                        </button>
                    </div>
                    <button className={styles.EditProfile} onClick={() => setShowEditProfileModal(true)}>Edit Profile</button>
                </div>
                <div className={styles.ListingsHeader}>Listings</div>
                <div className={styles.ListingsContainer}>
                    {listings.map(item => (
                        <button key={item.id} className={styles.IndividualListing}>
                            <img className={styles.ListingImage} src={`http://localhost:3000${item.image_url}`} alt={item.name} />
                            <div className={styles.ListingName}>{item.name}</div>
                            <div className={styles.ListingPrice}>${item.price}</div>
                            <div className={styles.ListingSize}>Size: {item.size}</div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}