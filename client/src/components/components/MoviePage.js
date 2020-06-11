import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import SaveRating from "./SaveRating";
import "../styles/MoviePage.css";

const MoviePage = (props) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [movie, setMovie] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(false);
  const movieTypes = ['unknown', 'action', 'adventure', 'animation', 'children', 'comedy', 'crime', 'documentary', 'drama', 'fantasy', 'black-movie', 'horror', 'musical', 'mystery', 'romance', 'sci-fi', 'thriller', 'war', 'western'];

  const { movieId } = useParams();
  const userId = props.location.userId;

  const useStyles = makeStyles((theme) => ({
    root: {
      minWidth: 400,
      minHeight: 300,
      padding: 10,
    },
    chipArray: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      listStyle: 'none',
      padding: 3,
      margin: 0,
    },
    chip: {
      margin: 5,
    },
  }));

  const classes = useStyles();

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

  const displayTypes = () => {
    const typesToDisplay = [];
    for (const key in movie) {
      if (movie[key] == "1") {
        typesToDisplay.push(key);
      };
    };
    return (
      typesToDisplay.map((type) => <Chip className={classes.chip} label={type} />)
    );
  };

	const displayMovie = () => {
		if (error) {
			return <div>Error: {error.message}</div>;
		} else if (!isLoaded) {
			return <div>Loading...</div>;
		} else {
			return (
        <Card className={classes.root}>
          <CardContent>
            <Typography component="h2">Titre - {movie.title}</Typography>
            <Typography>Date de sortie : {movie["release date"]}</Typography>
            <Typography>Genres :</Typography>
            <Paper component="ul" className={classes.chipArray}>
              {displayTypes()}
            </Paper>
          </CardContent>
          <SaveRating movieId={movieId} userId={userId} />
        </Card>
			)
		}
	};

  return (
    <div className="MoviePage">
      {displayMovie()}
    </div>
  );
}

export default MoviePage;