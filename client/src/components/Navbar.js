import React from "react";
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
                        <a href='/'>Accueil</a>
                    </li>
                    <li className='NavbarLinks'>
                        <a href='/movies'>Tous les films</a>
                    </li>
                    <li className='NavbarLinks'>
                        <a href='/connection'>Se connecter</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;