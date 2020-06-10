import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Combobox } from "react-widgets";
import "../styles/MoviePage.css";

const MoviePage = (props) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [movie, setMovie] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(false);
  const ratingsPossible = [1, 2, 3, 4, 5];

  const { movieId } = useParams();

  const fetchMovies = async () => {
		try {
      const response = await fetch("https://y2nm5r8mg9.execute-api.eu-west-1.amazonaws.com/dev/movies/" + movieId);
      const responseJson = await response.json();
      setIsLoaded(true);
      setError(false);
      setMovie(responseJson);
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
        <>
          <h2>Titre du film : {movie.title}</h2>
          <p>Film numéro {movie.uuid}</p>
          <Combobox 
            data={ratingsPossible}
          />
        </>
			)
		}
	};

  return (
    <div className="MoviePage">
      {displayMovies()}
    </div>
  );
}

export default MoviePage;
