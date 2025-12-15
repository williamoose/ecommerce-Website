import React, {useState} from 'react'
import styles from '../../styles/PasswordInput.module.css'
import { FaEye, FaEyeSlash } from "react-icons/fa";

type InputProps = {
    input: string;
    type: string;
    value?: string;
    onChange: (text: string) => void;
    CompareWith?: string
}

const PasswordInput = ({ input, type, value, onChange, CompareWith }: InputProps) => {
    const [showPassword, setShowPassword] = useState<boolean>(false)

    return(
        <>
            <div className={`${styles.PasswordInputWrapper} ${styles.Input}`}>
                <input 
                placeholder={input} 
                className={styles.Input}
                type={showPassword ? 'text' : type} 
                value={value}
                onChange={(e) => onChange(e.target.value)}
                />
                {showPassword 
                ? <FaEyeSlash className={styles.TogglePasswordIcon} onClick={() => setShowPassword(false)}/>
                : <FaEye className={styles.TogglePasswordIcon} onClick={() => setShowPassword(true)} />
                }
            </div>
            {CompareWith !== undefined && value !== undefined && value !== CompareWith &&
            <h5>Your passwords are wrong lol</h5>}
        </>
    )
}

export default PasswordInput
