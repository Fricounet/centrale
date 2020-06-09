import React from "react";
import { useHistory } from "react-router-dom";

const ConnectionPage = (props) => {
  const setUserId = props.setUserId;
  const history = useHistory();

  const inputName = React.createRef();
  const inputFisrtName = React.createRef();

  const handleSubmitConnection = (event) => {
    const userId = inputName.current.value + "_" + inputFisrtName.current.value;
    setUserId(userId);
    event.preventDefault();
    return (
      history.push("/")
    );
  };

  return (
    <form onSubmit={handleSubmitConnection}>
      <label>Nom :</label><br></br>
      <input type="text" ref={inputName} /><br></br>
      <label>Prénom :</label><br></br>
      <input type="text" ref={inputFisrtName} /><br></br>
      <input type="submit" value="Se connecter" />
    </form>
  );
};

export default ConnectionPage;
