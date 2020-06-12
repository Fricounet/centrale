const DynamoDB = require('aws-sdk/clients/dynamodb');

module.exports.handle = async event => {
    const data = JSON.parse(event.body);
    if (!process.env.tableName) {
        throw new Error('env.tableName must be defined');
    }

    // Create movie
    const dynamoDb = new DynamoDB.DocumentClient();
    const rating = {
        rating: data.rating,
        uuid: data.movieId + ':' + data.userId,
        type: "rating"
    }

    await dynamoDb.put({
        TableName: process.env.tableName,
        Item: rating,
    }).promise();

    return {
        statusCode: 200,
        headers:{
            'Access-Control-Allow-Origin':'*',
        },
        body: JSON.stringify(rating),
    }
}

