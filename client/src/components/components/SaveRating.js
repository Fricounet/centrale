import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Rating from '@material-ui/lab/Rating';
import "../styles/MoviePage.css";

const SaveRating = (props) => {
  const movieId = props.movieId;
  const userId = props.userId;
  const [rating, setRating] = useState(2);
  const [alreadyRated, setAlreadyRated] = useState(false);

  const fetchRating = async () => {
    if (userId) {
      try {
        const endRoute = movieId + ":" + userId;
        console.log(`https:// https://ekqiwnhmr7.execute-api.eu-west-1.amazonaws.com/dev/ratings/${endRoute}`)
        const response = await fetch(`https:// https://ekqiwnhmr7.execute-api.eu-west-1.amazonaws.com/dev/ratings/${endRoute}`);
        const responseJson = await response.json();
        setAlreadyRated(true);
        setRating(responseJson);
        console.log("response",responseJson);
      } catch (error) {
        setAlreadyRated(false);
        setRating(undefined);
        console.log("You have not rated this movie already");
      }
    };
  };

  useEffect(() => {
		fetchRating();
	}, []);

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    SaveRating: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      alignItems: 'center',
    },
  }));

  const classes = useStyles();

  const handleClick = async () => {
    const opts = {movieId: movieId, userId: userId, rating: rating};
    console.log(JSON.stringify(opts))
    await fetch("https://ekqiwnhmr7.execute-api.eu-west-1.amazonaws.com/dev/ratings/", {
        method: 'post',
        body: JSON.stringify(opts)
      });
    setAlreadyRated(true);
  }

  const display = () => {
    if (userId) {
      if (alreadyRated) {
        return (
          <div>Votre note pour ce film : <Rating value={rating} readOnly /></div>
        );
      } else {
        return (
          <Box className="SaveRating">
            <Rating
              name='choseRating'
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
            <Button startIcon={<SaveIcon />} onClick={handleClick}>Enregistrer</Button>
          </Box>
        );
      };
    } else {
      return (
        <div>Connectez-vous pour noter ce film !</div>
      );
    }
  };

  return (
    <div>{display()}</div>
  );
}

export default SaveRating;
