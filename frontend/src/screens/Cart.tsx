import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useUserData } from '../contexts/UserDataContext'
import type { Listing } from '../types/listing'
import styles from '../styles/Cart.module.css'
import { FiX } from 'react-icons/fi'

interface CartItem extends Listing {
  cart_item_id: number;
  quantity: number;
  listing_id: number;
}

export default function MyCart() {
    const { setCartIds } = useUserData()
    const navigate = useNavigate()
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [loading, setLoading] = useState(true)

    // Fetch cart items from API
    useEffect(() => {
        const fetchCartItems = async () => {
            const token = localStorage.getItem('token')
            if (!token) {
                setLoading(false)
                return
            }

            try {
                const response = await fetch('http://localhost:3000/api/cart', {
                    headers: { Authorization: `Bearer ${token}` },
                })

                if (!response.ok) {
                    throw new Error('Failed to fetch cart')
                }

                const data = await response.json()
                setCartItems(data)
            } catch (err) {
                console.error('Error fetching cart:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchCartItems()
    }, [])

    // Calculate totals
    const subtotal = cartItems.reduce((sum, item) => {
        const price = parseFloat(item.price)
        return sum + price
    }, 0)

    const shippingCost = cartItems.length > 0 ? 5.99 : 0
    const tax = subtotal * 0.08 // 8% tax
    const total = subtotal + shippingCost + tax

    const handleRemoveItem = async (listingId: number) => {
        const token = localStorage.getItem('token')
        if (!token) return

        try {
            await fetch(`http://localhost:3000/api/cart/${listingId}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            })

            // Remove from local state
            setCartItems(prev => prev.filter(item => item.listing_id !== listingId))

            // Update context
            setCartIds(prev => prev.filter(id => id !== listingId))
        } catch (err) {
            console.error(err)
        }
    }

    if (loading) {
        return (
            <div className={styles.MainContainer}>
                <div className={styles.ContentContainer}>
                    <h1>Shopping Cart</h1>
                    <p>Loading...</p>
                </div>
            </div>
        )
    }

    if (cartItems.length === 0) {
        return (
            <div className={styles.MainContainer}>
                <div className={styles.ContentContainer}>
                    <h1>Shopping Cart</h1>
                    <div className={styles.EmptyCart}>
                        <p>Your cart is empty</p>
                        <button 
                            className={styles.ContinueShoppingBtn}
                            onClick={() => navigate('/discover')}
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.MainContainer}>
            <div className={styles.ContentContainer}>
                <h1>Shopping Cart</h1>
                
                <div className={styles.CartLayout}>
                    {/* Items Section */}
                    <div className={styles.ItemsSection}>
                        <div className={styles.CartItems}>
                            {cartItems.map(item => (
                                <div key={item.cart_item_id} className={styles.CartItemRow}>
                                    {/* Product Image */}
                                    <div className={styles.ItemImage}>
                                        <img 
                                            src={`http://localhost:3000${item.image_url}`} 
                                            alt={item.name}
                                            onClick={() => navigate(`/listing/${item.listing_id}`, { state: { item } })}
                                        />
                                    </div>

                                    {/* Product Details */}
                                    <div className={styles.ItemDetails}>
                                        <h3 className={styles.ItemName}>{item.name}</h3>
                                        <p className={styles.ItemBrand}>{item.brand}</p>
                                        <div className={styles.ItemSpecs}>
                                            <span className={styles.Spec}>{item.size}</span>
                                            <span className={styles.SpecDot}>•</span>
                                            <span className={styles.Spec}>{item.condition}</span>
                                        </div>
                                        <div className={styles.SellerInfo}>
                                            <img 
                                                src={`http://localhost:3000${item.profilephoto_url}`}
                                                alt={item.username}
                                                className={styles.SellerAvatar}
                                            />
                                            <span>{item.username}</span>
                                        </div>
                                    </div>

                                    {/* Quantity and Price */}
                                    <div className={styles.ItemControls}>
                                        <p className={styles.ItemPrice}>
                                            ${parseFloat(item.price).toFixed(2)}
                                        </p>
                                    </div>

                                    {/* Remove Button */}
                                    <button
                                        className={styles.RemoveBtn}
                                        onClick={() => handleRemoveItem(item.listing_id)}
                                        title="Remove from cart"
                                    >
                                        <FiX size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className={styles.OrderSummary}>
                        <h2>Order Summary</h2>
                        
                        <div className={styles.SummaryRow}>
                            <span>Subtotal ({cartItems.length} items)</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>

                        <div className={styles.SummaryRow}>
                            <span>Shipping</span>
                            <span>${shippingCost.toFixed(2)}</span>
                        </div>

                        <div className={styles.SummaryRow}>
                            <span>Tax</span>
                            <span>${tax.toFixed(2)}</span>
                        </div>

                        <div className={styles.SummaryDivider}></div>

                        <div className={`${styles.SummaryRow} ${styles.TotalRow}`}>
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>

                        <button className={styles.CheckoutBtn}>
                            Proceed to Checkout
                        </button>

                        <button 
                            className={styles.ContinueShoppingBtn}
                            onClick={() => navigate('/discover')}
                        >
                            Continue Shopping
                        </button>

                        <div className={styles.PromoCode}>
                            <input 
                                type="text" 
                                placeholder="Enter promo code"
                                className={styles.PromoInput}
                            />
                            <button className={styles.PromoBtn}>Apply</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
