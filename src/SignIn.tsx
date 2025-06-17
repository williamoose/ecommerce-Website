import { useNavigate } from "react-router-dom"
import React, { useState } from 'react'
import GirlAtBeach from './assets/GirlAtBeach2.jpg'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import './SignUp.css'

export default function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    let navigate = useNavigate();

    const handleSignIn = () => {
        return(
            !email || ! password 
            ? alert('Please fill in all required fields')
            : alert('Sign In Success!')
        )
    }

    return(
        <div className="MainContainer">
            <div className="ImageContainer">
                <img className="Image" src={GirlAtBeach} />
            </div>
            <div className="InputContainer">
                <h1 className="CreateAccountText">
                Log In
                </h1>
                <TextInput input={'Email'} type={'email'} onChange={setEmail} />
                <PasswordInput input={'Password'} type={'password'} onChange={setPassword} />
                <button className="ForgotPasswordButton">Forgot your password?</button>
                <RegisterNowButton onClick={handleSignIn}/>
                <div className="RedirectLink">
                    <h4 style={{ color: 'black', fontWeight: 'medium' }}>
                        Don't have an Account?
                    </h4>
                    <button 
                        className="RedirectToSignIn"
                        onClick={() => navigate('/SignUp')}
                    >
                    Sign Up
                    </button>
                </div>
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
    onChange: (text: string) => void;
}

const PasswordInput = ({ input, type, onChange }: InputProps) => {
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

