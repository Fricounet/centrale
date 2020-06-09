import React from "react";
import { useHistory } from "react-router-dom";

const DisconnectionPage = (props) => {
  const userId = props.userId;
  const setUserId = props.setUserId;
  const history = useHistory();

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
        Vous êtes connectés en tant que {userId}.
      </label><br></br>
      <input type="submit" value="Se déconnecter" />
    </form>
  );
};

export default DisconnectionPage;
