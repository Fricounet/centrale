import React, { useState } from "react";
import { Redirect } from "react-router-dom";

const ConnectionPage = () => {
  const [userId, setUserId] = useState(null);

  const change_userId = (event) => {
    setUserId(event.target.value);
    console.log(userId);
  };

  const redirect_to_user = (event) => {
    const path = "/user/" + userId;
    console.log(path);
    return <Redirect to={path} />
  };

  return (
    <form>
      <label>Rentrez votre identifiant utilisateur :</label><br></br>
      <input type="text" onChange={change_userId}></input><br></br>
      <button onClick={redirect_to_user}>Se connecter</button>
    </form>
  );
};

export default ConnectionPage;
