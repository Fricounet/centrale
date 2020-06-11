import React, { useState, useEffect } from "react";
import { Link, useLocation, useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import "../styles/MovieList.css"

const MovieList = (props) => {
	const { userId } = useLocation();
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [items, setItems] = useState([]);
	const { pathname } = useLocation();
	const pathElements = pathname.split("/");
	const search = pathElements[pathElements.length - 1];
	const history = useHistory();
	const [titleQuery, setTitleQuery] = useState("");
	const movieTypes = ['unknown', 'action', 'adventure', 'animation', 'children', 'comedy', 'crime', 'documentary', 'drama', 'fantasy', 'black-movie', 'horror', 'musical', 'mystery', 'romance', 'sci-fi', 'thriller', 'war', 'western'];
	const [checkboxes, setCheckboxes] = useState({
		'unknown': false,
		'action': false,
		'adventure': false,
		'animation': false,
		'children': false,
		'comedy': false,
		'crime': false,
		'documentary': false,
		'drama': false,
		'fantasy': false,
		'black-movie': false, 
		'horror': false,
		'musical': false,
		'mystery': false, 
		'romance': false,
		'sci-fi': false, 
		'thriller': false, 
		'war': false,
		'western': false
	});

	const fetchMovies = async () => {
		try {
			var route = "https://ekqiwnhmr7.execute-api.eu-west-1.amazonaws.com/dev/movies";
			if (search !== 'movies') {
				route += "/search?" + search;
			};
			console.log("route", route);
			const response = await fetch(route);
			const responseJson = await response.json();
			console.log(responseJson);
			setIsLoaded(true);
			setError(false);
			setItems(responseJson.Movies);
		} catch (error) {
			setIsLoaded(true);
			setError(error);
		}
	};

	const insertLink = (item) => {
		const link = {pathname:`/movies/${item.uuid}`, userId:userId};
		return (
			<Link className="movieLink" to={link}>{item.title}</Link>
		);
	};

	useEffect(() => {
		fetchMovies();
	}, [isLoaded]);

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
							<th className="movieListHeader" id="headTitle">Titre</th>
							<th className="movieListHeader" id="headRating">Note Moyenne</th>
						</tr>
					</thead>
					<tbody>
						{items.map((item) => (
							<tr key={item.uuid}>
								<td className="movieListCell" id="bodyTitle">{insertLink(item)}</td>
								<td className="movieListCell" id="bodyRating">
									<div className="star-ratings-sprite"><span className="star-ratings-sprite-rating" style={{ width: `${item.AvgRating / 5 * 100}%` }}></span></div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			);
		}
	};

	const handleChange = (event) => {
		const dico = checkboxes;
		const type = event.target.name;
		dico[type] =  !dico[type];
		setCheckboxes(dico);
	};

	const handleClick = () => {
		var query = "";
		for (var i = 0; i < movieTypes.length; i++) {
			const type = movieTypes[i];
			if (checkboxes[type]) {
				if (query !== "") {
					query += "&";
				};
				query += "type=" + type;
			};
		};
		const endQuery = titleQuery.toLowerCase().replace(/[^a-zA-Z0-9]/g, " ").replace(' ', '_');
		if (endQuery !== "") {
			if (query !== "") {
				query += "&";
			};
			query += "query=" + endQuery
		};
		console.log("submit query :", query)
		const path = "/movies/search/" + query;
		setIsLoaded(false);
		return (
			history.push(path)
		);
	};


	return (
		<div id="movieList">
			<h2 className="pageTitle">Liste des films</h2>
			<Box ml={0.7} mr={3}>
				<TextField size='small'
					label="Recherche par titre"
					onChange={(event) => {setTitleQuery(event.target.value)}}
					style={{ margin: 8 }}
					placeholder="Rechercher..."
					fullWidth
					margin="normal"
					InputLabelProps={{
						shrink: true,
					}}
					InputProps={{
						startAdornment: (
						<InputAdornment position="start"><SearchIcon /></InputAdornment>
						),
					}}
					variant="outlined"
				/>
			</Box>
			<Box m={2} p={1} border={1} borderColor="primary.main" borderRadius={5} label="Recherche par titre">
				<Typography variant="caption" >Recherche par genre</Typography><br />
				{movieTypes.map((type) => (
					<FormControlLabel
						control={<Checkbox onChange={handleChange} name={type} />}
						label={type}
					/>
				))}
			</Box>
			<Box display="flex" justifyContent="center" mt={0.5} mb={1} p={1}>
				<Button variant="contained" color="primary" onClick={handleClick}>Rechercher</Button>
			</Box>
			{displayMovies()}
		</div>
	);
};

export default MovieList;