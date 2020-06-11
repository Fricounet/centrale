import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import SaveRating from "./SaveRating";
import "../styles/MoviePage.css";

const MoviePage = (props) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [movie, setMovie] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(false);

  const { movieId } = useParams();
  const userId = props.location.userId;

  const fetchMovies = async () => {
		try {
      const response = await fetch("https://5gco9axqge.execute-api.eu-west-1.amazonaws.com/dev/movies/" + movieId);
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
          <label></label>
          <SaveRating movieId={movieId} userId={userId} />
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
