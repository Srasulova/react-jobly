import { useState } from 'react';
import { useUserContext } from '../hooks/useUserContext';
import JoblyApi from "../../../../api";
import './Profile.css'; // Import the CSS file

const Profile: React.FC = () => {
    const { currentUser, setCurrentUser } = useUserContext();
    const [editing, setEditing] = useState(false);
    const [userData, setUserData] = useState({
        username: currentUser?.username || '',
        firstName: currentUser?.firstName || '',
        lastName: currentUser?.lastName || '',
        email: currentUser?.email || '',
    });

    if (!currentUser) {
        return <p>You need to log in to view this page.</p>;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentUser?.username) return; // Ensure username is available
        try {
            // Exclude the username from the updates
            const { username, ...updates } = userData;
            const updatedUser = await JoblyApi.updateUser(username, updates);
            setCurrentUser(updatedUser); // Update context with new user data
            setEditing(false); // Exit edit mode
        } catch (error) {
            console.error('Profile update failed:', error);
        }
    };

    return (
        <div className="profile-container">
            <h2>Profile</h2>
            {editing ? (
                <form onSubmit={handleSubmit}>
                    <label>
                        Username:
                        <input
                            type="text"
                            name="username"
                            value={userData.username}
                            onChange={handleChange}
                            disabled
                        />
                    </label>
                    <label>
                        First Name:
                        <input
                            type="text"
                            name="firstName"
                            value={userData.firstName}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Last Name:
                        <input
                            type="text"
                            name="lastName"
                            value={userData.lastName}
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
                    <button type="submit" className='submit-btn'>Save</button>
                    <button type="button" className='cancel-btn' onClick={() => setEditing(false)}>Cancel</button>
                </form>
            ) : (
                <div>
                    <p><strong>Username:</strong> {currentUser.username}</p>
                    <p><strong>First Name:</strong> {currentUser.firstName}</p>
                    <p><strong>Last Name:</strong> {currentUser.lastName}</p>
                    <p><strong>Email:</strong> {currentUser.email}</p>
                    <p><strong className="admin-status">Admin:</strong> {currentUser.is_admin ? 'Yes' : 'No'}</p>
                    <button onClick={() => setEditing(true)}>Edit Profile</button>
                </div>
            )}
        </div>
    );
};

export default Profile;
