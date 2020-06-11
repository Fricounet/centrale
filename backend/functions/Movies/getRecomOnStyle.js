const DynamoDB = require('aws-sdk/clients/dynamodb');
const getRatings = require('../Ratings/getRatings');
const serchMovieByCriteria = require('../Search/searchMoviesByCriteria');

module.exports.handle = async event => {
    console.log(event);
    const user = event.multiValueQueryStringParameters.user;
    console.log(user);
    const userRatings = user != undefined ? await getRatings.handle(user) : [];
    console.log(userRatings);

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(userRatings)
    }
}