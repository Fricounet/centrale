import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import { Multiselect } from 'react-widgets';

const SaveMovie = () => {
  const [error, setError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const history = useHistory();
  const movieTypes = ['unknown', 'action', 'adventure', 'animation', 'children', 'comedy', 'crime', 'documentary', 'drama', 'fantasy', 'black-movie', 'horror', 'musical', 'mystery', 'romance', 'sci-fi', 'thriller', 'war', 'western'];
  const [selectedTypes, setSelectedTypes] = useState([]);

  const inputTitle = React.createRef();
  const inputReleaseDate = React.createRef();

  const createOpts = () => {
    const opts = {'title': inputTitle.current.value, 'release date': inputReleaseDate.current.value};
    for (var i = 0; i < movieTypes.length; i++) {
      const type = movieTypes[i];
      if (selectedTypes.value.includes(type)) {
        opts[type] = 1;
      } else {
        opts[type] = 0;
      };
    };
    console.log(opts);
    return opts;
  };

  const handleSubmit = async (event) => {
    try {
      const opts = createOpts();
      console.log(JSON.stringify(opts));
      /*
      const response = await fetch("https://y2nm5r8mg9.execute-api.eu-west-1.amazonaws.com/dev/movies/", {
        method: 'post',
        body: JSON.stringify(opts)
      });*/
      setIsSaved(true);
      setError(false);
      event.preventDefault();
      return history.push('/');
    } catch (error) {
        setIsSaved(true);
        setError(error);
        return history.push('/');
    }
  };

  return (
    <div>
      <h2>Enregistrer un nouveau film</h2>
      <form onSubmit={handleSubmit}>
        <label>Titre :</label><br />
        <input type="text" ref={inputTitle} /><br />
        <label>Date de sortie (au format 01-Jan-1995) :</label><br />
        <input type="text" ref={inputReleaseDate} /><br />
        <label>Type de film :</label><br />
        <Multiselect 
          data={movieTypes} 
          onChange={value => setSelectedTypes({value})}
        />
        <br />
        <input type="submit" value="Enregistrer" />
      </form>
    </div>
  );

};

export default SaveMovie;