import { useNavigate } from "react-router-dom"
import React, { useState } from 'react'
import GirlAtBeach from '../assets/GirlAtBeach2.jpg'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styles from '../styles/SignUp.module.css'
import TextInput from '../components/TextInput';
import PasswordInput from '../components/PasswordInput'

export default function SignIn() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    let navigate = useNavigate();

    const handleSignIn = () => {
        return(
            !email || !password 
            ? alert('Please fill in all required fields')
            : alert('Sign In Success!')
        )
    }

    return(
        <div className={styles.MainContainer}>
            <div className={styles.ImageContainer}>
                <img className={styles.Image} src={GirlAtBeach} alt="Girl at Beach" />
            </div>
            <div className={styles.InputContainer}>
                <h1 className={styles.CreateAccountText}>
                Log In
                </h1>
                <TextInput 
                value={email || "Email"}
                inputType={'email'} 
                onChange={setEmail} 
                purpose={'auth'}/>
                <PasswordInput input={'Password'} type={'password'} onChange={setPassword} />
                <button className={styles.ForgotPasswordButton}>Forgot your password?</button>
                <RegisterNowButton onClick={handleSignIn}/>
                <div className={styles.RedirectLink}>
                    <h4 style={{ color: 'black', fontWeight: 'medium' }}>
                        Don't have an Account?
                    </h4>
                    <button 
                        className={styles.RedirectToSignIn}
                        onClick={() => navigate('/SignUp')}
                    >
                    Sign Up
                    </button>
                </div>
            </div>
        </div>
    )
}


const RegisterNowButton = ({ onClick }: { onClick: () => void} ) => {
  return (
    <button className={styles.RegisterNowButton} onClick={onClick}>
    Register Now!
    </button>
  )
}