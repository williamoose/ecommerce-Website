import React from 'react'
import styles from '../../styles/TextInput.module.css'

type InputProps = {
    multiline?: boolean;
    inputType?: string;
    value: string;
    onChange: (text: string) => void;
    purpose: 'auth' | 'sell';
    modifiers?: string;
    placeholder?: string;
}

const HandleMultilineChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    onChange: (value: string) => void
    ) => {
    event.target.style.height = 'auto';
    event.target.style.height = event.target.scrollHeight + 'px';
    onChange(event.target.value)
}

export default function TextInput({ multiline, inputType, value, onChange, purpose, modifiers, placeholder }: InputProps) {
    return (
        !multiline ? 
        <input 
        placeholder={placeholder || value}
        value={value}
        className={`${styles.Input} ${styles[purpose]} ${modifiers ? styles[modifiers] : ''}`} 
        type={inputType}
        onChange={(e) => onChange(e.target.value)}
        /> : 
        <textarea 
        placeholder={placeholder || value}
        value={value}
        className={`${styles.Input} ${styles[purpose]} ${styles.Multiline}`} 
        onChange={(e) => HandleMultilineChange(e, onChange)}
        />
    )
}