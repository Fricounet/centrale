const DynamoDB = require('aws-sdk/clients/dynamodb');

module.exports.handle = async event => {
    const data = JSON.parse(event.body);
    if (!process.env.tableName) {
        throw new Error('env.tableName must be defined');
    }

    // Create movie
    const dynamoDb = new DynamoDB.DocumentClient();
    const rating = {
        ...data,
        uuid: data.movie_id + '^' + data.user_id,
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

