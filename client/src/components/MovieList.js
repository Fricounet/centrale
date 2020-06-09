import React, { useState, useEffect } from "react";
import "./MovieList.css"

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
				<div>
					<table id="moviesTable">
						<thead>
							<tr>
								<th id="headUuuid">ID</th>
								<th id="headType">Type</th>
								<th id="headTitle">Title</th>
							</tr>
						</thead>
						<tbody>
							{items.map((item) => (
								<tr key={item.uuid}>
									<td id="bodyUuid">{item.uuid}</td>
									<td id="bodyType">{item.type}</td>
									<td id="bodyTitle">{item.title}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
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