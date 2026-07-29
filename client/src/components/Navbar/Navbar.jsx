import { Link, NavLink } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo">
                <Link to='/'>URL Shortener</Link>
            </div>

            <div className="nav-links">
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/dashboard'>
                    Dashboard
                </NavLink>
            </div>
        </nav>
    )
};

export default Navbar;