import React, {useState} from "react";
import { useHistory } from "react-router-dom";

const SaveMovie = () => {
  const [error, setError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  const inputTitle = React.createRef();

  const handleSubmit = async (event) => {
    try {
      const opts = {title: inputTitle.current.value};
      console.log(opts);
      const response = await fetch("https://mnbkxsksql.execute-api.eu-west-1.amazonaws.com/dev/movies/", {
        method: 'post',
        body: JSON.stringify(opts)
      });
      setIsSaved(true);
      setError(false);
      console.log(isSaved);
      event.preventDefault();
      return (
        <p>Le film {inputTitle.current.value} est bien enregistré !</p>
      );
    } catch (error) {
        setIsSaved(true);
        setError(error);
        return (
          <div>Error: {error.message}</div>
        );
    }
  };

  const displayForm = ()=> {
    return (
      <div>
        <h2>Enregistrer un nouveau film</h2>
        <form onSubmit={handleSubmit}>
          <label>Titre :</label><br></br>
          <input type="text" ref={inputTitle} /><br></br>
          <input type="submit" value="Enregistrer" />
        </form>
      </div>
    );
  };

  return (
    <div>
      {displayForm()}
    </div>
  )

  
};

export default SaveMovie;