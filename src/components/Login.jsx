import '../App.css';
import React from "react";
import { useState } from "react";
import { FormControl, Input, Button } from '@mui/material';
import { useAuth } from './AuthContext'; // Import the useAuth hook

export const Login = () => {
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const { accessToken, setToken } = useAuth();
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleEmailChange = (event) => {
        setUserEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setUserPassword(event.target.value);
    };

    const handleRegisterEmailChange = (event) => {
        setRegisterEmail(event.target.value);
    };

    const handleRegisterUsernameChange = (event) => {
        setRegisterUsername(event.target.value);
    };

    const handleRegisterPasswordChange = (event) => {
        setRegisterPassword(event.target.value);
    };

    const doLogIn = async () => {
        try {
            const response = await fetch('https://localhost:5001/Accounts/SignIn', {
                method: 'POST',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: userEmail,
                    password: userPassword,
                }),
            });

            const data = await response.json();
            setToken(data.token);
            console.log(data);
            console.log(accessToken);
        } catch (error) {
            console.error(error);
        }
    };

    const doRegister = async () => {
        try {
            const response = await fetch('https://localhost:5001/Accounts/Register', {
                method: 'POST',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: registerEmail,
                    userName: registerUsername,
                    password: registerPassword,
                }),
            });

            const data = await response.json();
            setMessage(data.message);
            console.log(data);
            console.log(message);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <h1>This is the Login page</h1>
            <FormControl id="loginForm">
                <input type='text' placeholder='Email' value={userEmail} onChange={handleEmailChange} />
                <input type='password' placeholder='Password' value={userPassword} onChange={handlePasswordChange} />
                <Button id="loginButton" className="button" type='button' onClick={doLogIn}>Log In</Button>
            </FormControl>
            <br />
            <FormControl id="registerForm" >  {/* onSubmit={handleSubmit} */}
                <input type='text' placeholder='Email' value={registerEmail} onChange={handleRegisterEmailChange} />
                <input type='text' placeholder='Username' value={registerUsername} onChange={handleRegisterUsernameChange} />
                <input type='password' placeholder='Password' value={registerPassword} onChange={handleRegisterPasswordChange} />
                <Button id="loginButton" className="button" type='button' onClick={doRegister}>Register</Button>
            </FormControl >
            <h2>{message}</h2>
            <h2>
                {accessToken ? "User is authenticated" : "No user authenticated, please log in"}
            </h2>
        </>
    )
}