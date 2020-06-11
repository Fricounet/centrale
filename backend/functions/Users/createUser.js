const DynamoDB = require('aws-sdk/clients/dynamodb');

module.exports.handle = async event => {
    const data = JSON.parse(event.body);
    if (!process.env.tableName) {
        throw new Error('env.tableName must be defined');
    }

    const dynamoDb = new DynamoDB.DocumentClient();
    const user = {
        ...data,
        uuid: data.lastname.toLowerCase().replace(/[^a-z0-9]/g, "") + "_" + data.firstname.toLowerCase().replace(/[^a-z0-9]/g, ""),
        type: "user"
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

