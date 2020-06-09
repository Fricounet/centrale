const DynamoDB = require('aws-sdk/clients/dynamodb');
const listUsers = require('./listUsers');

module.exports.handle = async event => {
    //const data = JSON.parse(event.body);
    if (!process.env.tableName) {
        throw new Error('env.tableName must be defined');
    }

    // Get count of users
    const usersList = await listUsers.handle();
    const count = JSON.parse(usersList.body).Count;

    // Create user
    const dynamoDb = new DynamoDB.DocumentClient();
    const user = {
        type: 'users',
        uuid:  `${count + 1}`,
        name: `test user ${count + 1}`,
    }

    await dynamoDb.put({
        TableName: process.env.tableName,
        Item: user,
    }).promise();

    return {
        statusCode: 200,
        headers:{
            'Access-Control-Allow-Origin':'*',
        },
        body: JSON.stringify(user),
    }
}

