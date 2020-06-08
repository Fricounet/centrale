import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./Navbar.css";
import HomePage from "./HomePage";
import PokemonDisplayer from "./PokemonDisplayer";

const Navbar = () => {
    return(
        <div className='Navbar'>
            <nav>
                <ul>
                    <li>
                        <Link to='/'>Accueil</Link>
                    </li>
                    <li>
                        <Link to='/allMovies'>Tous les films</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;