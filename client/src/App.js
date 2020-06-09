import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import PokemonDisplayer from "./components/PokemonDisplayer";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import MoviePage from "./components/MoviePage"
import ConnectionPage from "./components/ConnectionPage"
import DisconnectionPage from "./components/DisconnectionPage"

function App() {
  const [selectedUserId, setSelectedUserId] = useState(null);

  return (
    <Router>
      <Navbar userId={selectedUserId} />
      <Switch>
        <Route path="/connection">
          <ConnectionPage setUserId ={setSelectedUserId} />
        </Route>
        <Route path="/disconnection">
          <DisconnectionPage userId={selectedUserId} setUserId ={setSelectedUserId} />
        </Route>
        <Route path="/movies/:movieId" component={MoviePage}></Route>
        <Route path="/movies">
          <PokemonDisplayer />
        </Route>
        <Route path="/">
          <HomePage userId={selectedUserId} />
        </Route>
      </Switch>
    </Router>
    );
}

export default App;

