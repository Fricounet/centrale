const listMovies = require('./listMovies');
//const DynamoDB = require('aws-sdk/clients/dynamodb');

module.exports.handle = async event => {
    searchCriterias = event.multiValueQueryStringParameters.query[0].toLowerCase().split('_');
    const moviesList = JSON.parse((await listMovies.handle()).body).Movies;
    const moviesListFiltered = await moviesList.filter(movie => {
        let state = true;
        searchCriterias.forEach(word => state = state && movie.uuid.includes(word));
        return state
        });

    return {
        statusCode: 200,
        headers:{
            'Access-Control-Allow-Origin':'*',
        },
        body: JSON.stringify(moviesListFiltered)
    }
}