import React, { useState, useEffect } from "react";
import "./MoviePage.css";

const MoviePage = (props) => {
  const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [item, setItem] = useState([]);
	const [fetchAgain, setFetchAgain] = useState(false);

  const movieId = props.match.params.movieId;

  const fetchMovies = async () => {
		try {
			const response = await fetch("https://pokeapi.co/api/v2/pokemon/"); // Modifier l'adresse et la suite de la fonction quand le back sera pret.
      const responseJson = await response.json();
      setIsLoaded(true);
      setError(false);
      setItem(responseJson.results);
		} catch (error) {
			setIsLoaded(true);
			setError(error);
		}
	};

	useEffect(() => {
		setIsLoaded(false);
		fetchMovies();
	}, [fetchAgain]);

	const displayMovies = () => {
		if (error) {
			return <div>Error: {error.message}</div>;
		} else if (!isLoaded) {
			return <div>Loading...</div>;
		} else {
			return (
				<ul>
					{item.map((movie) => (
						<li key={movie.name}>{movie.name}</li>
					))}
				</ul>
			);
		}
	};

  return (
    <div className="MoviePage">
      <h2>Titre du film</h2>
      <p>Film numéro {movieId}</p>
      <p>Note du film : </p>
      {displayMovies()}
    </div>
  )
}

export default MoviePage;
