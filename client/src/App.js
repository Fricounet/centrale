import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PokemonDisplayer from "./components/PokemonDisplayer";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/allMovies">
            <PokemonDisplayer />
        </Route>
        <Route path="/">
            <HomePage />
        </Route>
      </Switch>
    </Router>
    );
}

export default App;
