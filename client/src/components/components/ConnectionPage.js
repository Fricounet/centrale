import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Connection = (props) => {
  const setUserId = props.setUserId;
  const history = useHistory();
  const [userIsLoaded, setUserIsLoaded] = useState(false);
  const [userExists, setUserExists] = useState(null);

  const inputName = React.createRef();
  const inputFisrtName = React.createRef();

  const checkUserExists = async (userId) => {
    const response = await fetch("https://ekqiwnhmr7.execute-api.eu-west-1.amazonaws.com/dev/users/" + userId);
    const responseJson = await response.json();
    if (responseJson == 'Not found') {
      setUserExists(false);
      setUserIsLoaded(true);
    } else {
      setUserId(userId);
      setUserExists(true);
      setUserIsLoaded(true);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = inputName.current.value.toLowerCase().replace(/[^a-zA-Z0-9]/g, " ").replace(' ', '_');
    const firstName = inputFisrtName.current.value.toLowerCase().replace(/[^a-zA-Z0-9]/g, " ").replace(' ', '_');
    const userId = name + "_" + firstName;
    checkUserExists(userId);
  };

  const displayConnexion = () => {
    if (userIsLoaded) {
      if (userExists) {
        return history.push("/");
      } else {
        return (
          <div>
            <h2>Connexion</h2>
            <p>L'utilisateur n'existe pas, merci de vous inscrire.</p>
            <form onSubmit={handleSubmit}>
              <label>Nom :</label><br></br>
              <input type="text" ref={inputName} /><br></br>
              <label>Prénom :</label><br></br>
              <input type="text" ref={inputFisrtName} /><br></br>
              <input type="submit" value="Se connecter" />
            </form>
          </div>
        )
      };
    } else {
      return (
        <div>
          <h2>Connexion</h2>
          <form onSubmit={handleSubmit}>
            <label>Nom :</label><br></br>
            <input type="text" ref={inputName} /><br></br>
            <label>Prénom :</label><br></br>
            <input type="text" ref={inputFisrtName} /><br></br>
            <input type="submit" value="Se connecter" />
          </form>
        </div>
      );
    };
  };

  useEffect(() => {
    displayConnexion();
  }, [userIsLoaded]);

  return (
    <div>{displayConnexion()}</div>
  );
};


const Registration = (props) => {
  const setUserId = props.setUserId;
  const history = useHistory();

  const inputName = React.createRef();
  const inputFisrtName = React.createRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const name = inputName.current.value.toLowerCase().replace(/[^a-zA-Z0-9]/g, " ").replace(' ', '_');
    const firstName = inputFisrtName.current.value.toLowerCase().replace(/[^a-zA-Z0-9]/g, " ").replace(' ', '_');
    const userId = name + "_" + firstName;
    const opts = {'lastname': inputName.current.value, 'firstname': inputFisrtName.current.value};
    const response = await fetch("https://ekqiwnhmr7.execute-api.eu-west-1.amazonaws.com/dev/users/", {
      method: 'post',
      body: JSON.stringify(opts)
    });
    setUserId(userId);
    const response_get = await fetch("https://ekqiwnhmr7.execute-api.eu-west-1.amazonaws.com/dev/users/renaud_pauline");
    const responseJson = await response_get.json();
    console.log(responseJson);
    return (
      history.push("/")
    );
  };

  return (
    <div>
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <label>Nom :</label><br></br>
        <input type="text" ref={inputName} /><br></br>
        <label>Prénom :</label><br></br>
        <input type="text" ref={inputFisrtName} /><br></br>
        <input type="submit" value="S'inscrire" />
      </form>
    </div>
  );
};


const ConnectionPage = (props) => {
  const setUserId = props.setUserId;

  return (
    <div>
      <Connection setUserId={setUserId} />
      <Registration setUserId={setUserId} />
    </div>
  );
};

export default ConnectionPage;