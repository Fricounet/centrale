import React from "react";
import logo from "./Movie-Club-logo.png";
import "./HomePage.css";

const HomePage = (props) => {
  const userId = props.userId;

  const displayWelcome = () => {
    if (userId) {
      const [userName, userFirstName] = userId.split("_");
      return (
        <p>
          Bonjour {userFirstName} {userName} !
        </p>
      );
    };
  };

  return (
    <div className="HomePage">
      <header className="HomePage-header">
        <img src={logo} className="HomePage-logo" alt="logo" />
        <p>
          Site de recommandation de films
        </p>
        {displayWelcome()}
        <p>
          <a
            className="HomePage-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Notez 
          </a>
          vos films préférés et accédez à votre recommandation personnalisée !
        </p>
        <p>
          Films préférés de nos utilisateurs
        </p>
        <p>
          Derniers films ajoutés
        </p>
      </header>
    </div>
  );
};

export default HomePage;
