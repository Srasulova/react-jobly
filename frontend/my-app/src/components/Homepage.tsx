import React from 'react';
import './Homepage.css'; // Import the stylesheet

const Homepage: React.FC = () => {
    return (
        <div className="homepage-container">
            <header className="homepage-header">
                <h1>Jobly</h1>
                <p>All the jobs in one, convenient place.</p>
            </header>
            <section className="welcome-section">
                <h2>Welcome Back, User!</h2>
            </section>
        </div>
    );
};

export default Homepage;
