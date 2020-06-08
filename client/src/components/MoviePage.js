import React, { useState, useEffect } from "react";
import "./MoviePage.css";

class MoviePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      movieId: this.props.match.params.movieId,
      movieInfo: null,
    };
  }

  async componentDidMount() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
    const responseJson = await response.json();
    this.setState({movieInfo: responseJson.results});
  }

  render () {
    return (
      <div className="MoviePage">
        <h2>Titre du film</h2>
        <p>Film numéro {this.state.movieId}</p>
      </div>
    )
  };
};

export default MoviePage;
