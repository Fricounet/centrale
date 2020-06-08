import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PokemonDisplayer from "./components/PokemonDisplayer";
import HomePage from "./components/HomePage";
import MovieList from "./components/MovieList";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/demo">API Fetch demo</Link>
            </li>
            <li>
              <Link to="/movies">All Movies</Link>
            </li>
          </ul>
        </nav>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/movies">
            <MovieList />
          </Route>
          <Route path="/demo">
            <PokemonDisplayer />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
          
        </Switch>
      </div>
    </Router>
  );
}

export default App;
