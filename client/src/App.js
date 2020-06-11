import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import MovieList from "./components/components/MovieList";
import HomePage from "./components/components/HomePage";
import Navbar from "./components/components/Navbar";
import MoviePage from "./components/components/MoviePage"
import ConnectionPage from "./components/components/ConnectionPage"
import DisconnectionPage from "./components/components/DisconnectionPage"
import SaveMovie from "./components/components/SaveMovie"

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
        <Route path="/save-movie">
          <SaveMovie />
        </Route>
        <Route path="/movies/:movieId" component={MoviePage} userId={selectedUserId}></Route>
        <Route path="/movies" component={MovieList} userId={selectedUserId}></Route>
        <Route path="/">
          <HomePage userId={selectedUserId} />
        </Route>
      </Switch>
    </Router>
    );
}

export default App;

