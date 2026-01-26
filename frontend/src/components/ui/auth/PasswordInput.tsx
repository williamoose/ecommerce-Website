import React, { useState } from 'react'
import styles from '../../../styles/auth/PasswordInput.module.css'
import { FaEye, FaEyeSlash } from "react-icons/fa"

type PasswordInputProps = {
    input: string
    type: string
    value?: string
    onChange: (text: string) => void
    CompareWith?: string
}

const PasswordInput = ({ input, type, value, onChange, CompareWith }: PasswordInputProps) => {
    const [showPassword, setShowPassword] = useState<boolean>(false)

    return (
        <>
            <div className={styles.PasswordInputWrapper}>
                <input 
                    placeholder={input} 
                    className={styles.Input}
                    type={showPassword ? 'text' : type} 
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
                {showPassword 
                    ? <FaEyeSlash className={styles.TogglePasswordIcon} onClick={() => setShowPassword(false)} />
                    : <FaEye className={styles.TogglePasswordIcon} onClick={() => setShowPassword(true)} />
                }
            </div>
            {CompareWith !== undefined && value !== undefined && value !== CompareWith &&
            <h5 className={styles.ErrorMessage}>Passwords do not match</h5>}
        </>
    )
}

export default PasswordInput
