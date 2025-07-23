import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ user }) {
    const navigate = useNavigate();

    return (
        <nav className="navbar fade-in">
            <div className="logo" onClick={() => navigate("/")}>DreamShare</div>
            <div className="nav-links">
                <Link to="/">Feed</Link>
                {user ? (
                    <>
                        <Link to="/dashboard">Dashboard</Link>
                        <Link to="/create">Create Post</Link>
                        <button className="logout-btn" onClick={() => navigate("/logout")}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
}