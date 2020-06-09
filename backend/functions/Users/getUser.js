const DynamoDB = require('aws-sdk/clients/dynamodb');

module.exports.handle = async event => {
    if (!process.env.tableName) {
        throw new Error('env.tableName must be defined');
    }

    const dynamoDb = new DynamoDB.DocumentClient();
    const result = await dynamoDb.get({
        TableName: process.env.tableName,
        Key: {
            type: 'utilisateurs',
            uuid: event.pathParameters.id,
        },
    }).promise();

    if (result.Item) {
        return {
            statusCode: 200,
            headers:{
                'Access-Control-Allow-Origin':'*',
            },
            body: JSON.stringify(result.Item.uuid),
        }
    } else {
        return {
            statusCode: 404,
            headers:{
                'Access-Control-Allow-Origin':'*',
            },
            body: JSON.stringify('Not found'),
        }
    }
}

