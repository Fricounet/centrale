const DynamoDB = require('aws-sdk/clients/dynamodb');

module.exports.handle = async event => {
    //const data = JSON.parse(event.body);
    if (!process.env.tableName) {
        throw new Error('env.tableName must be defined');
    }

    // Get count of movies
    const dynamoDb = new DynamoDB.DocumentClient();
    const params = {
        TableName: process.env.tableName,
        KeyConditionExpression: '#type = :type',
        ExpressionAttributeNames: {
            '#type': 'type'
        },
        ExpressionAttributeValues: {
            ':type': 'items',
        },
    }
    const result = await dynamoDb.query(params).promise();
    const count = result.Count

    const movie = {
        type: 'items',
        uuid:  `${count + 1}`,
        titre: `test ${count + 1}`,
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

