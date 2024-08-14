import { Link } from 'react-router-dom';
import { useUserContext } from '../hooks/useUserContext'; // Import the custom hook for UserContext
import './NavBar.css';

function NavBar({ logout }: { logout: () => void }) {
    const { currentUser } = useUserContext(); // Access the currentUser from the context

    return (
        <nav className="navbar">
            <ul className="nav-list">
                <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/companies">Companies</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/jobs">Jobs</Link>
                </li>
                {!currentUser ? (
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/signup">Signup</Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/profile">Profile</Link>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link" onClick={logout}>Logout</button>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default NavBar;
