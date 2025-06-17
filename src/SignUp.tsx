import React, { useState } from 'react'
import BeachFashion from './assets/BeachFashion.jpg'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router";
import './SignUp.css'

export default function SignUp() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmedPassword, setConfirmedPassword] = useState('')

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
        <div className="MainContainer">
            <div className="ImageContainer">
                <img className="Image" src={BeachFashion} />
            </div>
            <div className="InputContainer">
                <h1 className="CreateAccountText">
                Create Account
                </h1>
                <TextInput input={'First Name'} type={'text'} onChange={setFirstName} />
                <TextInput input={'Last Name'} type={'text'} onChange={setLastName} />
                <TextInput input={'Email'} type={'email'} onChange={setEmail} />
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
                <div className="RedirectLink">
                    <h4 style={{ color: 'black', fontWeight: 'medium' }}>
                        Already Have an Account?
                    </h4>
                    <button 
                        className="RedirectToSignIn"
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

const TextInput = ({ input, type, onChange }: InputProps) => {
    return (
        <input 
        placeholder={input} 
        className="Input" 
        type={type}
        onChange={(e) => onChange(e.target.value)}
        />
    )
}

type InputProps = {
    input: string;
    type: string;
    value?: string;
    onChange: (text: string) => void;
    CompareWith?: string
}

const PasswordInput = ({ input, type, value, onChange, CompareWith }: InputProps) => {
    const [showPassword, setShowPassword] = useState(false)

    return(
        <>
            <div className="PasswordInputWrapper Input">
                <input 
                placeholder={input} 
                className = "Input"
                type={showPassword ? 'text' : type} 
                onChange={(e) => onChange(e.target.value)}
                />
                {showPassword 
                ? <FaEyeSlash className="TogglePasswordIcon" onClick={() => setShowPassword(false)}/>
                : <FaEye className="TogglePasswordIcon" onClick={() => setShowPassword(true)} />
                }
            </div>
            {CompareWith !== undefined && value !== undefined && value !== CompareWith &&
            <h5>Your passwords are wrong lol</h5>}
        </>
    )
}

const RegisterNowButton = ({ onClick }: { onClick: () => void} ) => {

  return (
    <button className="RegisterNowButton" onClick={onClick}>
    Register Now!
    </button>
  )
}

