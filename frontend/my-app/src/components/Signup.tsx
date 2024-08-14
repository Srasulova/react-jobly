import React, { useState } from 'react';
import './Signup.css';

interface SignupFormProps {
    signup: (userData: { username: string; password: string; first_name: string; last_name: string; email: string }) => void;
}

// Define the initial state shape
const initialUserData = {
    username: '',
    password: '',
    first_name: '',
    last_name: '',
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

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        signup(userData);
    };

    return (
        <form onSubmit={handleSubmit} className="signup-form">
            <h2>Signup</h2>
            <label>
                Username:
                <input
                    type="text"
                    name="username"
                    value={userData.username}
                    onChange={handleChange}
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                />
            </label>
            <label>
                First Name:
                <input
                    type="text"
                    name="first_name"
                    value={userData.first_name}
                    onChange={handleChange}
                />
            </label>
            <label>
                Last Name:
                <input
                    type="text"
                    name="last_name"
                    value={userData.last_name}
                    onChange={handleChange}
                />
            </label>
            <label>
                Email:
                <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                />
            </label>
            <button type="submit">Signup</button>
        </form>
    );
};

export default Signup;
