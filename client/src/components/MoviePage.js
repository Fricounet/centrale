import React, { useState, useEffect } from "react";
import "./MoviePage.css";

const MoviePage = (movieId) => {
  const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState([]);
  
  const fetchMovie = async () => {
		try {
			const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
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
		fetchMovie();
	});
  
  const displayMovie = () => {
    if (error) {
			return <div>Error: {error.message}</div>;
		} else if (!isLoaded) {
			return <div>Loading...</div>;
		} else {
			return (
        <>
          {/* <h2>{item.title}</h2> */}
          <h2>Titre du film</h2>
          <p>Film numéro {movieId}</p>
        </>
			);
		}
  };

  return (
    <div className="MoviePage">
      {displayMovie()}
    </div>
  );
};

export default MoviePage;
