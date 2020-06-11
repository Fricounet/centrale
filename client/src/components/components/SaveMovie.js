import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

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
    const response = await fetch("https://ekqiwnhmr7.execute-api.eu-west-1.amazonaws.com/dev/movies/", {
      method: 'post',
      body: JSON.stringify(opts)
    });
  };

  return (
    <div>
      <h2>Enregistrer un nouveau film</h2>
      <form>
        <label>Titre :</label><br />
        <input type="text" ref={inputTitle} /><br />
        <label>Date de sortie (au format 01-Jan-1995) :</label><br />
        <input type="text" ref={inputReleaseDate} /><br />
        <label>Type de film :</label><br />
        {movieTypes.map((type) => (
          <FormControlLabel
            control={<Checkbox onChange={handleChange} name={type} />}
            label={type}
          />
        ))}
        <Button startIcon={<SaveIcon />} onClick={() => {handleClick()}}>Enregistrer</Button>
      </form>
    </div>
  );

};

export default SaveMovie;