import React, { useState } from 'react';
import './Signup.css';

interface SignupFormProps {
    signup: (userData: { username: string; password: string; first_name: string; last_name: string; email: string }) => void;
}

// Define the initial state shape
const initialUserData = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: ''
};

const Signup: React.FC<SignupFormProps> = ({ signup }) => {
    // Use a single state object for userData
    const [userData, setUserData] = useState(initialUserData);

    // Handle form changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        signup({
            username: userData.username,
            password: userData.password,
            first_name: userData.firstName,  // Updated to match backend expectation
            last_name: userData.lastName,    // Updated to match backend expectation
            email: userData.email
        });
    };

    return (
        <form onSubmit={handleSubmit} className="signup-form">
            <h2>Signup</h2>
            <label htmlFor="username">
                Username:
                <input
                    id="username"
                    type="text"
                    name="username"
                    value={userData.username}
                    onChange={handleChange}
                    required
                />
            </label>
            <label htmlFor="password">
                Password:
                <input
                    id="password"
                    type="password"
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                    minLength={6}
                    required
                />
            </label>
            <label htmlFor="firstName">
                First Name:
                <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    value={userData.firstName}
                    onChange={handleChange}
                    required
                />
            </label>
            <label htmlFor="lastName">
                Last Name:
                <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    value={userData.lastName}
                    onChange={handleChange}
                    required
                />
            </label>
            <label htmlFor="email">
                Email:
                <input
                    id="email"
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    required
                />
            </label>
            <button type="submit">Signup</button>
        </form>
    );
};

export default Signup;
