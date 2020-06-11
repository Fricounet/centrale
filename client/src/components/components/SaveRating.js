import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import "../styles/MoviePage.css";

const SaveRating = (props) => {
  const movieId = props.movieId;
  const userId = props.userId;
  const [rating, setRating] = useState(null);
  const [alreadyRated, setAlreadyRated] = useState(false);

  const fetchRating = async () => {
    if (userId) {
      const endRoute = movieId + "^" + userId;
      const response = await fetch("https://5gco9axqge.execute-api.eu-west-1.amazonaws.com/dev/ratings/101_dalmatiens");
      const responseJson = await response.json();
      console.log("response",responseJson);
      /*setAlreadyRated(true);
      setRating(responseJson);*/
    };
  };

  useEffect(() => {
    setAlreadyRated(false);
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

  const handleChange = (event) => {
    setRating(event.target.value);
  };

  const handleClick = async () => {
    const opts = {movieId: movieId, userId: userId, rating: rating};
    const response = await fetch("https://5gco9axqge.execute-api.eu-west-1.amazonaws.com/dev/ratings/", {
        method: 'post',
        body: JSON.stringify(opts)
      });
  }

  const display = () => {
    if (userId) {
      if (alreadyRated) {
        return <div>Votre note pour ce film : {rating}</div>;
      } else {
        return (
          <Box className="SaveRating">
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">Note</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={rating}
                onChange={handleChange}
                label="Note"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
              </Select>
            </FormControl>
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
