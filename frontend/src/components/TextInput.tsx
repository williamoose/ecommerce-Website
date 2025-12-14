import React from 'react'
import styles from '../styles/TextInput.module.css'
import { PiPlaceholder } from 'react-icons/pi';

type InputProps = {
    multiline?: boolean;
    inputType?: string;
    value: string;
    onChange: (text: string) => void;
    purpose: 'auth' | 'sell';
    modifiers?: 'price';
}

const HandleMultilineChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    onChange: (value: string) => void
    ) => {
    event.target.style.height = 'auto';
    event.target.style.height = event.target.scrollHeight + 'px';
    onChange(event.target.value)
}

export default function TextInput({ multiline, inputType, value, onChange, purpose, modifiers }: InputProps) {
    return (
        !multiline ? 
        <input 
        placeholder={value} 
        className={`${styles.Input} ${styles[purpose]} ${modifiers ? styles[modifiers] : ''}`} 
        type={inputType}
        onChange={(e) => onChange(e.target.value)}
        /> : 
        <textarea 
        placeholder={value} 
        className={`${styles.Input} ${styles[purpose]} ${styles.Multiline}`} 
        onChange={(e) => HandleMultilineChange(e, onChange)}
        />
    )
}