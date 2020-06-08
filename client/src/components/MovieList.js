import React, { useState, useEffect } from "react";

const MovieList = () => {
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [items, setItems] = useState([]);
	const [fetchAgain, setFetchAgain] = useState(false);
	const triggerFetchAgain = () => setFetchAgain(!fetchAgain);

	const fetchMovies = async () => {
		try {
			const response = await fetch("https://pokeapi.co/api/v2/pokemon/"); // Modifier l'adresse et la suite de la fonction quand le back sera pret.
			const responseJson = await response.json();
			setIsLoaded(true);
			setError(false);
			setItems(responseJson.results);
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
					{items.map((item) => (
						<li key={item.name}>{item.name}</li>
					))}
				</ul>
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