import React, { useState } from 'react'
import styles from '../../styles/EditProfileModal.module.css'
import TextInput from './TextInput'
import PasswordInput from './auth/PasswordInput'
import { useAuth } from '../../contexts/AuthContext'

type EditProfileModalProps = {
    isOpen: boolean
    onClose: () => void
}

export default function EditProfileModal({ isOpen, onClose }: EditProfileModalProps) {
    const { user } = useAuth()
    const [activeTab, setActiveTab] = useState<'general' | 'password'>('general')

    // General form state
    const [username, setUsername] = useState(user?.username || '')
    const [email, setEmail] = useState(user?.email || '')
    const [generalLoading, setGeneralLoading] = useState(false)
    const [generalMessage, setGeneralMessage] = useState('')

    // Password form state
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordLoading, setPasswordLoading] = useState(false)
    const [passwordMessage, setPasswordMessage] = useState('')

    if (!isOpen) return null

    const handleGeneralSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setGeneralMessage('')
        setGeneralLoading(true)

        if (!username || !email) {
            setGeneralMessage('Please fill in all fields')
            setGeneralLoading(false)
            return
        }

        const token = localStorage.getItem('token')
        if (!token) {
            setGeneralMessage('You must be signed in')
            setGeneralLoading(false)
            return
        }

        try {
            const res = await fetch('http://localhost:3000/api/users/profile', {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email }),
            })

            const data = await res.json()

            if (!res.ok) {
                setGeneralMessage(data.message || 'Failed to update profile')
                return
            }

            setGeneralMessage('Profile updated successfully')
            // Update localStorage with new user data
            if (user) {
                const updatedUser = { ...user, username, email }
                localStorage.setItem('user', JSON.stringify(updatedUser))
            }

            setTimeout(() => {
                onClose()
            }, 1500)
        } catch (err) {
            console.error('Error updating profile:', err)
            setGeneralMessage('An error occurred. Please try again.')
        } finally {
            setGeneralLoading(false)
        }
    }

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setPasswordMessage('')
        setPasswordLoading(true)

        if (!currentPassword || !newPassword || !confirmPassword) {
            setPasswordMessage('Please fill in all fields')
            setPasswordLoading(false)
            return
        }

        if (newPassword !== confirmPassword) {
            setPasswordMessage('New passwords do not match')
            setPasswordLoading(false)
            return
        }

        const token = localStorage.getItem('token')
        if (!token) {
            setPasswordMessage('You must be signed in')
            setPasswordLoading(false)
            return
        }

        try {
            const res = await fetch('http://localhost:3000/api/users/change-password', {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ currentPassword, newPassword }),
            })

            const data = await res.json()

            if (!res.ok) {
                setPasswordMessage(data.message || 'Failed to change password')
                return
            }

            setPasswordMessage('Password changed successfully')
            setCurrentPassword('')
            setNewPassword('')
            setConfirmPassword('')

            setTimeout(() => {
                onClose()
            }, 1500)
        } catch (err) {
            console.error('Error changing password:', err)
            setPasswordMessage('An error occurred. Please try again.')
        } finally {
            setPasswordLoading(false)
        }
    }

    return (
        <div className={styles.ModalOverlay} onClick={onClose}>
            <div className={styles.Modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.CloseButton} onClick={onClose}>✕</button>

                <div className={styles.Container}>
                    <div className={styles.Sidebar}>
                        <button
                            className={`${styles.TabButton} ${activeTab === 'general' ? styles.active : ''}`}
                            onClick={() => setActiveTab('general')}
                        >
                            General
                        </button>
                        <button
                            className={`${styles.TabButton} ${activeTab === 'password' ? styles.active : ''}`}
                            onClick={() => setActiveTab('password')}
                        >
                            Change Password
                        </button>
                    </div>

                    <div className={styles.Content}>
                        {activeTab === 'general' && (
                            <form onSubmit={handleGeneralSubmit}>
                                <h2>Edit Profile</h2>
                                
                                <div className={styles.FormGroup}>
                                    <label>Username</label>
                                    <TextInput
                                        value={username}
                                        inputType={'text'} 
                                        onChange={setUsername}
                                        placeholder="Username"
                                        purpose={'auth'}
                                    />
                                </div>

                                <div className={styles.FormGroup}>
                                    <label>Email</label>
                                    <TextInput
                                        value={email}
                                        inputType={'email'} 
                                        onChange={setEmail}
                                        placeholder="Email"
                                        purpose={'auth'}
                                    />
                                </div>

                                {generalMessage && (
                                    <p className={`${styles.Message} ${generalMessage.includes('successfully') ? styles.success : styles.error}`}>
                                        {generalMessage}
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    className={styles.SubmitButton}
                                    disabled={generalLoading}
                                >
                                    {generalLoading ? 'Saving...' : 'Save Changes'}
                                </button>
                            </form>
                        )}

                        {activeTab === 'password' && (
                            <form onSubmit={handlePasswordSubmit}>
                                <h2>Change Password</h2>

                                <div className={styles.FormGroup}>
                                    <label>Current Password</label>
                                    <PasswordInput
                                        input="Current Password"
                                        type="password"
                                        value={currentPassword}
                                        onChange={setCurrentPassword}
                                    />
                                </div>

                                <div className={styles.FormGroup}>
                                    <label>New Password</label>
                                    <PasswordInput
                                        input="New Password"
                                        type="password"
                                        value={newPassword}
                                        onChange={setNewPassword}
                                    />
                                </div>

                                <div className={styles.FormGroup}>
                                    <label>Confirm Password</label>
                                    <PasswordInput
                                        input="Confirm Password"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={setConfirmPassword}
                                        CompareWith={newPassword}
                                    />
                                </div>

                                {passwordMessage && (
                                    <p className={`${styles.Message} ${passwordMessage.includes('successfully') ? styles.success : styles.error}`}>
                                        {passwordMessage}
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    className={styles.SubmitButton}
                                    disabled={passwordLoading}
                                >
                                    {passwordLoading ? 'Saving...' : 'Change Password'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
