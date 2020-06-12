import React, {useState} from "react";
// import { useHistory } from "react-router-dom";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';

const SaveMovie = () => {
  const inputTitle = React.createRef();
  const inputReleaseDate = React.createRef();
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

  const useStyles = makeStyles((theme) => ({
    root: {
      paddingTop: 40,
      paddingBottom: 45,
      paddingLeft: 100,
      paddingRight:100,
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      backgroundColor: '#282c34',
    },
    card: {
      padding: 20,
      display: 'flex',
      justifyItems: 'center',
      flexWrap: 'wrap',
    },
  }));

  const classes = useStyles();

  const handleChange = (event) => {
    const dico = checkboxes;
    const type = event.target.name;
    dico[type] =  !dico[type];
    setCheckboxes(dico);
  };

  const createOpts = () => {
    const opts = {'title': inputTitle.current.value, 'release date': inputReleaseDate.current.value};
    for (var i = 0; i < movieTypes.length; i++) {
      const type = movieTypes[i];
      if (checkboxes[type]) {
        opts[type] = 1;
      } else {
        opts[type] = 0;
      };
    };
    console.log(opts);
    return opts;
  };

  const handleClick = async () => {
    const opts = createOpts();
    await fetch("https://ekqiwnhmr7.execute-api.eu-west-1.amazonaws.com/dev/movies/", {
      method: 'post',
      body: JSON.stringify(opts)
    });
  };

  return (
    <Box className={classes.root}>
      <Card className={classes.card}>
        <h2>Enregistrer un nouveau film</h2>
        <form>
          <label>Titre :</label><br />
          <input type="text" ref={inputTitle} /><br />
          <label>Date de sortie (au format 01-Jan-1995) :</label><br />
          <input type="text" ref={inputReleaseDate} /><br />
          <label>Type de film :</label><br />
          {movieTypes.map((type) => (
            <FormControlLabel
              key={type}
              control={<Checkbox onChange={handleChange} name={type} />}
              label={type}
            />
          ))}
        </form>
        <Button startIcon={<SaveIcon />} onClick={() => {handleClick()}}>Enregistrer</Button>
      </Card>
    </Box>
  );

};

export default SaveMovie;