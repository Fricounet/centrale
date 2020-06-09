import React, { useState, useEffect } from "react";

const MovieList = () => {
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [items, setItems] = useState([]);
	const [fetchAgain, setFetchAgain] = useState(false);
	const triggerFetchAgain = () => setFetchAgain(!fetchAgain);

	const fetchMovies = async () => {
		try {
			const response = await fetch("https://aqb7gub7x6.execute-api.eu-west-1.amazonaws.com/dev/movies"); // Modifier l'adresse et la suite de la fonction quand le back sera pret.
			const responseJson = await response.json();
			setIsLoaded(true);
			setError(false);
			setItems(Array.from(responseJson));
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
        <table id="moviesTable">
        <thead>
          <tr>
          <th>Title</th>
          <th>Duration</th>
          <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>title1</td>
            <td>duration1</td>
            <td>rating1</td>
          </tr>
        </tbody>
				</table>
			);
		}
	};

	return (
		<div>
			<button onClick={triggerFetchAgain}>Fetch again</button>
			{displayMovies()}
		</div>
	);
};

export default MovieList;