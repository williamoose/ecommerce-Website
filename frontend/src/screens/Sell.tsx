import React, { useState } from 'react'
import styles from '../styles/Sell.module.css'
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import DropdownMenu from '../components/ui/DropdownMenu'
import TextInput from '../components/ui/TextInput'
import { useNavigate } from "react-router";

export default function Sell() {
    const [photos, setPhotos] = useState<File[]>([])
    const [category, setCategory] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [brand, setBrand] = useState<string>('')
    const [condition, setCondition] = useState<string>('')
    const [size, setSize] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [price, setPrice] = useState<string>('0')

    const categories: string[] = ['Dresses', 'Skirts', 'Pants', 'Shirts', 'Socks', 'Underwear', 'Jackets']
    const conditions: string[] = ['Brand New', 'Like New', 'Lightly Used', 'Well Used', 'Heavily Used']
    const sizes: string[] = ['XXXS', 'XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'XXXXL']

    const navigate = useNavigate();

    const handleSelectedPhotos = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setPhotos(Array.from(event.target.files));
        }
    };

    const handleSubmit = async() => {
        const token = localStorage.getItem('token');

        if (!token) {
            alert('You must be signed in to list an item');
            return;
        }

        if (!category || !name || !brand || !condition || !size || !description || !price) {
            alert('Please fill in all required fields');
            return;
        }

        const formData = new FormData();
        formData.append('category', category);
        formData.append('name', name);
        formData.append('brand', brand);
        formData.append('condition', condition);
        formData.append('size', size);
        formData.append('description', description);
        formData.append('price', price);

        photos.forEach(photo => formData.append('images', photo));

        const response = await fetch('http://localhost:3000/api/listings/mylistings', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        if (!response.ok) {
            alert('Failed to list item');
            return;
        }

        const data = await response.json();
        console.log('Listing created:', data);

        navigate('/MyListings');
    };

    return (
        <div className={styles.MainContainer}>
            <div className={styles.HeaderContainer}>
                <div className={styles.Header}>List an Item</div>
                <div className={styles.HeaderSubtext}>Find a New Owner for your Clothes!</div>
            </div>
            <div className={styles.ContentContainer}>
                <div className={styles.SelectDisplayPhotosContainer}>
                    <div className={styles.SelectPhotosHeader}>
                        Upload some Photos of your Item! (Max 10 Photos)
                    </div>
                    <div className={styles.SelectPhotosContainer}>
                        <input
                        id="PhotosInput" 
                        style={{ display: 'none' }}
                        type="file" 
                        accept='image/*' 
                        multiple 
                        onChange={handleSelectedPhotos}
                        />
                        <MdOutlineAddPhotoAlternate className={styles.SelectPhotosIcon} />
                        <label htmlFor='PhotosInput' className={styles.SelectPhotosButton}>
                            Select Photos
                        </label>
                    </div>
                    <div className={styles.PhotosDisplayContainer}>
                        {photos.map((photoURL, index) =>(
                            <div key={index} className={styles.IndividualPhoto}>
                                <img 
                                src={URL.createObjectURL(photoURL)}
                                width='100%'
                                height='100%'
                                alt={`preview-${index}`}
                                />  
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.InputContainer}>
                    <DropdownMenu
                    type={'Category'}
                    options={categories}
                    value={category || "Select a Category  ▼"}
                    setSelected={setCategory}
                    width='100%'
                    />
                    <div style={{ width: '100%' }}>
                        <h2>Listing Name</h2>
                        <TextInput 
                        value={name || "Name your Listing"} 
                        inputType={'text'} 
                        onChange={setName} 
                        purpose={'sell'}
                        />
                    </div>
                    <div style={{ width: '100%' }}>
                        <h2>Brand</h2>
                        <TextInput 
                        value={brand || "What is the Brand of your Item?"} 
                        inputType={'text'} 
                        onChange={setBrand} 
                        purpose={'sell'}
                        />
                    </div>
                    <DropdownMenu
                    type={"Item Condition"}
                    options={conditions}
                    value={condition || "What is the Condition of your Item?  ▼"}
                    setSelected={setCondition}
                    width='100%'
                    />
                    <DropdownMenu
                    type={"Size"}
                    options={sizes}
                    value={size || "Select a Size  ▼"}
                    setSelected={setSize}
                    width='100%'
                    />
                    <div style={{ width: '100%' }}>
                        <h2>Item Description</h2>
                        <TextInput
                        multiline={true} 
                        value={description || 'Describe your Item'} 
                        inputType={'text'} 
                        onChange={setDescription} 
                        purpose={'sell'}
                        />
                    </div>
                    <div style={{ width: '100%' }}>
                        <h2>Price</h2>
                        <div className={styles.PriceInput}>
                            <span className={styles.DollarSign}>S$</span>
                            <TextInput 
                            value={price || '0'} 
                            inputType={'text'} 
                            onChange={setPrice} 
                            purpose={'sell'}
                            modifiers={'price'}
                            />
                        </div>
                        {Number(price) < 0 && 
                            <h2>Price cannot be Negative</h2>}
                    </div>
                    <button 
                    className={styles.ListNowButton}
                    onClick={handleSubmit}
                    >
                        List Now!
                    </button>
                </div>
            </div>
        </div>
    )
}


