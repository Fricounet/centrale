const DynamoDB = require('aws-sdk/clients/dynamodb');
const getRatings = require('../Ratings/getRatings');
const serchMovieByCriteria = require('../Search/searchMoviesByCriteria');

module.exports.handle = async event => {
    const userId = event.multiValueQueryStringParameters.user;
    const userRatings = userId != undefined ? JSON.parse((await getRatings.handle({"multiValueQueryStringParameters": {"user" : userId}})).body).Ratings : [];
    const preferedRatedMovies = userRatings.filter( movieRating => parseInt(movieRating.rating) > 3 );
    const moviesUuid = [];
    preferedRatedMovies.forEach(movie => moviesUuid.push(movie.uuid.slice(0, - (userId[0].length + 1))));

    const dynamoDb = new DynamoDB.DocumentClient();
    const moviesInfo = [];
    moviesUuid.forEach(async movieUuid => {
        console.log(movieUuid);
        const info = await dynamoDb.get({
            TableName: process.env.tableName,
            Key: {
                type: 'movie',
                uuid: movieUuid,
            },
        }).promise();
        console.log(info);
        moviesInfo.push(info);
    });

    console.log(moviesInfo);


    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(moviesUuid)
    }
}