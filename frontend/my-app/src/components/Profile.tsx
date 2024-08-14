import React from 'react';
import { useUserContext } from '../hooks/useUserContext';

const Profile: React.FC = () => {
    const { currentUser } = useUserContext();

    if (!currentUser) {
        return <p>You need to log in to view this page.</p>;
    }

    return (
        <div>
            <h2>Profile</h2>
            <p><strong>Username:</strong> {currentUser.username}</p>
            <p><strong>First Name:</strong> {currentUser.first_name}</p>
            <p><strong>Last Name:</strong> {currentUser.last_name}</p>
            <p><strong>Email:</strong> {currentUser.email}</p>
            <p><strong>Admin:</strong> {currentUser.is_admin ? 'Yes' : 'No'}</p>
        </div>
    );
};

export default Profile;
