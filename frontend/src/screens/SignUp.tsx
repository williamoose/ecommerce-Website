import React, { useState } from 'react'
import BeachFashion from '../assets/BeachFashion.jpg'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router";
import styles from '../styles/SignUp.module.css'
import TextInput from '../components/TextInput';
import PasswordInput from '../components/PasswordInput'

export default function SignUp() {
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmedPassword, setConfirmedPassword] = useState<string>('')

    let navigate = useNavigate();

    const handleRegister = () => {
        !firstName ||
        !lastName ||
        !email ||
        !password 
        ? alert('Please fill in all required fields')
        : navigate('/MyListings')
    }

    return(
        <div className={styles.MainContainer}>
            <div className={styles.ImageContainer}>
                <img className={styles.Image} src={BeachFashion} />
            </div>
            <div className={styles.InputContainer}>
                <h1 className={styles.CreateAccountText}>
                Create Account
                </h1>
                <TextInput 
                value={firstName || "First Name"}
                inputType={'text'} 
                onChange={setFirstName} 
                purpose={'auth'}/>
                <TextInput 
                value={lastName || "Last Name"}
                inputType={'text'} 
                onChange={setLastName} 
                purpose={'auth'}
                />
                <TextInput 
                value={email || "Email"}
                inputType={'email'} 
                onChange={setEmail} 
                purpose={'auth'}
                />
                <PasswordInput 
                input={'Password'} 
                type={'password'} 
                value={password}
                onChange={setPassword} 
                />
                <PasswordInput 
                input={'Confirm Password'} 
                type={'password'} 
                value={confirmedPassword}
                onChange={setConfirmedPassword}
                CompareWith={password}
                />
                <RegisterNowButton onClick={handleRegister}/>
                <div className={styles.RedirectLink}>
                    <h4 style={{ color: 'black', fontWeight: 'medium' }}>
                        Already Have an Account?
                    </h4>
                    <button 
                        className={styles.RedirectToSignIn}
                        onClick={() => navigate('/SignIn')}
                    >
                    Sign In
                    </button>
                </div>
                <p>By clicking 'Register Now', you agree to our 
                Terms and Conditions and Privacy Policy
                </p>
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
