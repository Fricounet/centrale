const DynamoDB = require('aws-sdk/clients/dynamodb');

module.exports.handle = async event => {
    const data = JSON.parse(event.body);
    if (!process.env.tableName) {
        throw new Error('env.tableName must be defined');
    }

    // Create movie
    const dynamoDb = new DynamoDB.DocumentClient();
    const movie = {
        ...data,
        uuid: data.title.toLowerCase().replace(/[^a-zA-Z0-9]/g, ""),
        type: "movie"
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
        body: JSON.stringify(movie),
    }
}

