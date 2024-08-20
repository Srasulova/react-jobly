import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

interface SignupFormProps {
    signup: (userData: { username: string; password: string; firstName: string; lastName: string; email: string }) => Promise<void>;
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
    const navigate = useNavigate();

    // Handle form changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await signup({
                username: userData.username,
                password: userData.password,
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email
            })
            // After signup, navigate to /jobs
            navigate('/');
        } catch (err) {
            console.error('Signup failed:', err);
        }
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
