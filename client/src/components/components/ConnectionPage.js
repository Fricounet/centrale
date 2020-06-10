import React from "react";
import { useHistory } from "react-router-dom";

const Connection = (props) => {
  const setUserId = props.setUserId;
  const history = useHistory();

  const inputName = React.createRef();
  const inputFisrtName = React.createRef();

  const handleSubmit = (event) => {
    const userId = inputName.current.value + "_" + inputFisrtName.current.value;
    setUserId(userId);
    event.preventDefault();
    return (
      history.push("/")
    );
  };

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


const Registration = (props) => {
  const setUserId = props.setUserId;
  const history = useHistory();

  const inputName = React.createRef();
  const inputFisrtName = React.createRef();

  const createUser = async () => {
    const opts = {'lastname': inputName.current.value, 'firstname': inputFisrtName.current.value};
    const response = await fetch("https://mnbkxsksql.execute-api.eu-west-1.amazonaws.com/dev/users/", {
      method: 'post',
      body: JSON.stringify(opts)
    });
  };

  const handleSubmit = (event) => {
    const userId = inputName.current.value + "_" + inputFisrtName.current.value;
    setUserId();
    event.preventDefault();
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