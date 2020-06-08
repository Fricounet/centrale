const uuid = require('uuid');
const DynamoDB = require('aws-sdk/clients/dynamodb');

module.exports.handle = async event => {
    //const data = JSON.parse(event.body);
    if (!process.env.tableName) {
        throw new Error('env.tableName must be defined');
    }
    const dynamoDb = new DynamoDB.DocumentClient();

    for (i=0; i<10; i++) {
        const movie = {
            type: 'items',
            uuid: uuid.v1(),
            titre: `test ${i}`,
        }

        await dynamoDb.put({
            TableName: process.env.tableName,
            Item: movie,
        }).promise();
    }
    return {
        statusCode: 200,
        body: JSON.stringify("success"),
    }
}

