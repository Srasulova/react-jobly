import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
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
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/signup">Signup</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/profile">Profile</Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;
