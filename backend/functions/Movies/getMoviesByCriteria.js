const listMovies = require('./listMovies');
//const DynamoDB = require('aws-sdk/clients/dynamodb');

module.exports.handle = async event => {
    searchCriterias = event.multiValueQueryStringParameters.type;
    const moviesList = JSON.parse((await listMovies.handle()).body).Movies;
    const moviesListFiltered = await moviesList.filter(movie => {
        return !searchCriterias.map(criteria => {
            return movie[criteria] == 1
        }).includes(false)
    });

    return {
        statusCode: 200,
        headers:{
            'Access-Control-Allow-Origin':'*',
        },
        body: JSON.stringify(moviesListFiltered)
    }
}