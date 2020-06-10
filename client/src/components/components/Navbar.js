import React from "react";
import { Link, Router} from "react-router-dom";
import logo from "../Movie-Club-logo.png";
import "../styles/Navbar.css";

const Navbar = (props) => {
    const userId = props.userId;

    const displayConnection = () => {
        if (userId) {
            return (
                <li class='NavbarLinks'>
                    <Link to='/disconnection'>Se déconnecter</Link>
                </li>
            )
        } else {
            return (
                <li class='NavbarLinks'>
                    <Link to='/connection'>Se connecter</Link>
                </li>
            );
        }
    };


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
                    <li className='NavbarLinks'>
                        <Link to='/save-movie'>Enregistrer un nouveau film</Link>
                    </li>
                    {displayConnection()}
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;