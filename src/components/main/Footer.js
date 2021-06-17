import React from 'react';
import { NavLink } from 'react-router-dom';


const Footer = () => {
    return (
        <div className="footer">
            <NavLink to="/contact">Contact Us</NavLink>
            <NavLink to="/about">About Us</NavLink>
        </div>
    )
};

export default Footer;