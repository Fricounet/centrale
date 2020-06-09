const DynamoDB = require('aws-sdk/clients/dynamodb');
const listMovies = require('./listMovies');

module.exports.handle = async event => {
    //const data = JSON.parse(event.body);
    if (!process.env.tableName) {
        throw new Error('env.tableName must be defined');
    }

    // Get count of movies
    const moviesList = await listMovies.handle();
    const count = moviesList.body.Count;

    // Create movie
    const dynamoDb = new DynamoDB.DocumentClient();
    const movie = {
        type: 'movies',
        uuid:  `${count + 1}`,
        titre: `test movie ${count + 1}`,
    }

    await dynamoDb.put({
        TableName: process.env.tableName,
        Item: movie,
    }).promise();

    return {
        statusCode: 200,
        headers:{
            'Access-Control-Allow-Origin':'*',
        },
        body: movie,
    }
}

