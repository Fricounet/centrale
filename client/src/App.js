import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PokemonDisplayer from "./components/PokemonDisplayer";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import MoviePage from "./components/MoviePage"

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/movie/:movieId" component={MoviePage}></Route>
        <Route path="/movies">
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
