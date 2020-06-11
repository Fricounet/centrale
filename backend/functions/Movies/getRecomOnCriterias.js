const DynamoDB = require('aws-sdk/clients/dynamodb');
const getRatings = require('../Ratings/getRatings');
const serchMovieByCriteria = require('../Search/searchMoviesByCriteria');

module.exports.handle = async event => {
    const userId = event.pathParameters.id;
    const userRatings = userId != undefined ? JSON.parse((await getRatings.handle({ "multiValueQueryStringParameters": { "user": [userId] } })).body).Ratings : [];

    if (!userRatings){
        return {
            statusCode: 404,
            headers:{
                'Access-Control-Allow-Origin':'*',
            },
            body: JSON.stringify('No ratings for this user'),
        }
    }

    // Get movies uuid (to make sure we do not suggest an already rated movie), and select movies rated >2 by user
    const moviesUuid = [];
    userRatings.forEach(movie => moviesUuid.push(movie.uuid.slice(0, - (userId[0].length + 1))));

    const preferedMoviesUuid = [];
    const preferedRatedMovies = userRatings.filter(movieRating => parseInt(movieRating.rating) > 2);
    
    preferedRatedMovies.forEach(movie => preferedMoviesUuid.push(movie.uuid.slice(0, - (userId.length + 1))));
    console.log(preferedMoviesUuid)

    // Get info on well rated movies
    const dynamoDb = new DynamoDB.DocumentClient();
    const moviesInfo = [];
    for (const movieUuid of preferedMoviesUuid) {
        const info = await dynamoDb.get({
            TableName: process.env.tableName,
            Key: {
                type: 'movie',
                uuid: movieUuid,
            },
        }).promise();
        delete info.Item.uuid;
        delete info.Item.title;
        delete info.Item["release date"];
        delete info.Item.AvgRating;
        delete info.Item.type;
        moviesInfo.push(info)
    }
    
    if (!moviesInfo) {
        return {
            statusCode: 404,
            headers:{
                'Access-Control-Allow-Origin':'*',
            },
            body: JSON.stringify('No movies found in DB - servor error'),
        }
    }
    // Calculate presence of each criteria in the list of rated movies.
    const criterias = Object.assign({}, moviesInfo[0].Item);
    for (const criteria in criterias) {
        criterias[criteria] = 0;
    }

    moviesInfo.forEach(movie => {
        for (const criteria in movie.Item) {
            criterias[criteria] += parseInt(movie.Item[criteria]);
        }
    })

    // Sort criterias from most present in rated movies, to less present, and get the top 2 present criterias
    const sortedMovies = Object.keys(criterias).sort(function(a,b){return criterias[b]-criterias[a]}).slice(0, 2);
    const suggestedMovies = sortedMovies != undefined ? (await serchMovieByCriteria.handle(sortedMovies)) : [];

    // Remove already rated movies from the suggested list, and get the top 5 rated movies
    const numberOfSuggestedMovies = 5;
    let maxGrade = Array(numberOfSuggestedMovies).fill(0.);
    const topRatedMovies = [suggestedMovies[0]];
    maxGrade[numberOfSuggestedMovies-1] = suggestedMovies[0].AvgRating;

    for (const movie of suggestedMovies.slice(1)) {
        if (movie.AvgRating > maxGrade[0] && !(movie.uuid in moviesUuid)) {
            // Search for the already selected movie with the worse average rating
            const worstSelectedMovie = topRatedMovies.find(selectedMovie => selectedMovie.AvgRating === maxGrade[0]);

            if (worstSelectedMovie != undefined) { // If defined, means that 
                const indexWorse = topRatedMovies.indexOf(worstSelectedMovie);
                topRatedMovies[indexWorse] = movie;
            } else { // If undefined, means that we haven't arleardy selectd 5 movies, so we juste add the movie
                topRatedMovies.push(movie);
            }

            // Set the first value to the one of the movie we juste added to the list, and sort the grades : the first element is the worst grade
            maxGrade[0] = movie.AvgRating;
            maxGrade.sort();
        }
    }

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(topRatedMovies)
    }
}