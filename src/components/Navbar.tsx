// src/components/Navbar.js
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    const history = useHistory();
    const token = localStorage.getItem('accessToken');

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        history.push('/login');
    };

    return (
        <nav className="navbar">
            <Link to="/users">Users</Link>
            <Link to="/books">Books</Link>
            <Link to="/books/add">Add Book</Link>
            <Link to="/registration">Registration</Link>
            {token ? (
                <>
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <Link to="/login">Login</Link>
            )}
        </nav>
    );
}

export default Navbar;
