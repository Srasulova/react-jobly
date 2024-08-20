import React from 'react';
import './Homepage.css';

interface HomepageProps {
    firstName?: string;
}

const Homepage: React.FC<HomepageProps> = ({ firstName }) => {
    return (
        <div className="homepage-container">
            <header className="homepage-header">
                <h1>Jobly</h1>
                <p>All the jobs in one, convenient place.</p>
            </header>
            <section className="welcome-section">
                <h2>Welcome, {firstName || 'User'}!</h2>
            </section>
        </div>
    );
};

export default Homepage;