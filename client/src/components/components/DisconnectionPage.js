import React from "react";
import { useHistory } from "react-router-dom";

const DisconnectionPage = (props) => {
  const userId = props.userId;
  const history = useHistory();
  const [userName, userFirstName] = userId.split("_");
  const setUserId = props.setUserId;

  const handleSubmit = (event) => {
    setUserId(null);
    event.preventDefault();
    return (
      history.push("/")
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Vous êtes connecté en tant que {userFirstName} {userName}.
      </label><br></br>
      <input type="submit" value="Se déconnecter" />
    </form>
  );
};

export default DisconnectionPage;
