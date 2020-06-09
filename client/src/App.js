import React from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import PokemonDisplayer from "./components/PokemonDisplayer";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import MoviePage from "./components/MoviePage"
import ConnectionPage from "./components/ConnectionPage"

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/connection" component={ConnectionPage}></Route>
        <Route path="/movie/:movieId" component={MoviePage}></Route>
        <Route path="/movies" component={PokemonDisplayer}></Route>
        <Route path="/user/:userId" component={PokemonDisplayer}></Route>
        <Route path="/" component={HomePage}></Route>
      </Switch>
    </Router>
    );
}

export default App;
