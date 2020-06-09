import React, { useState, useEffect } from "react";

const MovieList = () => {
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [items, setItems] = useState([]);
	const [fetchAgain, setFetchAgain] = useState(false);
	const triggerFetchAgain = () => setFetchAgain(!fetchAgain);

	const fetchMovies = async () => {
		try {
			const response = await fetch("https://mnbkxsksql.execute-api.eu-west-1.amazonaws.com/dev/movies");
			const responseJson = await response.json();
			setIsLoaded(true);
			setError(false);
			setItems(responseJson.Movies);
		} catch (error) {
			setIsLoaded(true);
			setError(error);
		}
	};

	useEffect(() => {
		setIsLoaded(false);
		fetchMovies();
	}, [fetchAgain]);

	//Need to change order of columns, and columns titles, but the skeleton is here
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
          <th>ID</th>
          <th>Type</th>
          <th>Title</th>
          </tr>
        </thead>
        <tbody>
				{items.map((item) => (
					<tr key={item.uuid}>
						<td>{item.uuid}</td>
						<td>{item.type}</td>
						<td>{item.title}</td>
					</tr>     
          ))}
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