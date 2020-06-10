import React, {useState} from "react";
import { useHistory } from "react-router-dom";

const SaveMovie = () => {
  const [error, setError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const history = useHistory();
  const movieTypes = ['unknown', 'action', 'adventure', 'animation', 'children', 'comedy', 'crime', 'documentary', 'drama', 'fantasy', 'black-movie', 'horror', 'musical', 'mystery', 'romance', 'sci-fi', 'thriller', 'war', 'western'];

  const inputTitle = React.createRef();
  const inputReleaseDate = React.createRef();
  const inputMovieTypes = {};
  for (var i = 0; i < movieTypes.length; i++) {
    inputMovieTypes[movieTypes[i]] = React.createRef();
  };
  const inputAction = React.createRef();

  const handleSubmit = async (event) => {
    try {
      /*const opts = {'title': inputTitle.current.value, 'realese date': inputReleaseDate.current.value};
      for (var i = 0; i < movieTypes.length; i++) {
        const type = movieTypes[i];
        opts[type] = inputMovieTypes[type];
      };*/
      console.log(inputAction);
      /*const response = await fetch("https://qwb4mgojyk.execute-api.eu-west-1.amazonaws.com/dev/movies/", {
        method: 'post',
        body: JSON.stringify(opts)
      });*/
      setIsSaved(true);
      console.log(isSaved);
      setError(false);
      event.preventDefault();
      return history.push('/save-movie');
    } catch (error) {
        setIsSaved(true);
        setError(error);
        return history.push('/save-movie');
    }
  };

  const displaySelectTypes = () => {
    return (
      <p>{/*
        {movieTypes.map((type) => (
          <>
            <input type="checkbox" id={type} ref={inputMovieTypes[type]} />
            <label for={type}>{type}</label><br />
          </>
        ))}*/}
        <input type="checkbox" id='action' ref={inputAction} />
        <label for='action'>action</label><br />
      </p>
    );
  };

  const displayForm = () => {
    if (error) {
			return <div>Error: {error.message}</div>;
		} else if (isSaved == true) {
      return <p>Le film est bien enregistré !</p>;
		} else {
			return (
        <form onSubmit={handleSubmit}>
          <label>Titre :</label><br></br>
          <input type="text" ref={inputTitle} /><br></br>
          <label>Date de sortie (au format 01-Jan-1995) :</label><br></br>
          <input type="text" ref={inputReleaseDate} /><br></br>
          <label>Type de film :</label><br></br>
          {displaySelectTypes()}
          <br></br>
          <input type="submit" value="Enregistrer" />
        </form>
      );
    }
  };

  return (
    <div>
      <h2>Enregistrer un nouveau film</h2>
      {displayForm()}
    </div>
  );

};

export default SaveMovie;