import React from "react";
import { BrowserRouter as Link } from "react-router-dom";
import logo from "./Movie-Club-logo.png";
import "./Navbar.css";

const Navbar = () => {
    return(
        <div className='Navbar'>
            <nav className='flexContainer'>
                <div class="logoContainer">
                    <img src={logo} className="Navbar-logo" alt="logo" />
                </div>
                <ul>
                    <li className='NavbarLinks'>
                        <Link to='/'>Accueil</Link>
                    </li>
                    <li className='NavbarLinks'>
                        <Link to='/movies'>Tous les films</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;