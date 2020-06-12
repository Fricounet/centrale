import React, { useState, useEffect } from "react";
import { Link, useLocation, useHistory } from 'react-router-dom';
import Rating from '@material-ui/lab/Rating';
import "../styles/Suggestions.css"

const SuggestionList = (props) => {
  const { userId } = useLocation();
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const fetchMovies = async () => {
		try {
      const response = await fetch("https://ekqiwnhmr7.execute-api.eu-west-1.amazonaws.com/dev/recomOnCriterias/" + userId);
      const responseJson = await response.json();
      setIsLoaded(true);
      setError(false);
      setItems(responseJson);
		} catch (error) {
			setIsLoaded(true);
			setError(error);
		}
  };

  const insertLink = (item) => {
		const link = {pathname:`/movies/${item.uuid}`, userId:userId};
		return (
			<Link className="movieLink" to={link}>{item.title}</Link>
		);
  };
  
  useEffect(() => {
    if (userId != undefined) {
      setIsLoaded(false);
      fetchMovies();
    }
	}, []);
  
  const displayMovies = () => {
    if (userId) {
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
          <>
            <h2 style={{margin:15}}>Genres similaires à vos films préférés</h2>
            <table id="moviesTable">
              <thead>
                <tr>
                  <th className="movieListHeader" id="headTitle">Titre</th>
                  <th className="movieListHeader" id="headRating">Note moyenne</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.uuid}>
                    <td className="movieListCell" id="bodyTitle">{insertLink(item)}</td>
                    <td className="movieListCell" id="bodyRating">
                      <Rating value={item.AvgRating} precision={0.1} readOnly />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        );
      }
    } else {
      return (
        <div>
          <h2 id = "NotConnectedSuggestionList">
            Connectez-vous pour voir vos suggestions !
          </h2>
        </div>
      );
    }
  };
  
  return (
    <div className="SuggestionList">
      {displayMovies()}
    </div>
  );
}

export default SuggestionList;