import { useNavigate } from "react-router-dom"
import React, { useState } from 'react'
import GirlAtBeach from '../assets/GirlAtBeach2.jpg'
import styles from '../styles/SignUp.module.css'
import TextInput from '../components/ui/TextInput';
import PasswordInput from '../components/ui/PasswordInput'
import { useAuth } from "../contexts/AuthContext";

export default function SignIn() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSignIn = async () => {
        if (!email || !password) {
            alert("Please fill in all fields");
            return;
        }

        const res = await fetch('http://localhost:3000/api/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.message);
            return;
        }
        
        login(data.token);

        navigate("/MyListings");
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


const RegisterNowButton = ({ onClick }: {onClick: () => void}) => {
  return (
    <button className={styles.RegisterNowButton} onClick={onClick}>
    Sign In!
    </button>
  )
}