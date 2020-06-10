import React, { useState, useEffect } from "react";
import "../styles/MovieList.css"

const MovieList = () => {
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [items, setItems] = useState([]);

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
	}, []);

	//Need to change order of columns, and columns titles, but the skeleton is here
	const displayMovies = () => {
		if (error) {
			return <div>Error: {error.message}</div>;
		} else if (!isLoaded) {
			return <div>Loading...</div>;
		} else {
			return (
				<div id = "movieList">
					<h2 class="pageTitle">Liste des films</h2>
					<table id="moviesTable">
						<thead>
							<tr>
								<th class="movieListHeader" id="headUuuid">ID</th>
								<th class="movieListHeader" id="headType">Type</th>
								<th class="movieListHeader" id="headTitle">Title</th>
							</tr>
						</thead>
						<tbody>
							{items.map((item) => (
								<tr key={item.uuid}>
									<td class="movieListCell" id="bodyUuid">{item.uuid}</td>
									<td class="movieListCell" id="bodyType">{item.type}</td>
									<td class="movieListCell" id="bodyTitle">{item.title}</td>
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
			{displayMovies()}
		</div>
	);
};

export default MovieList;