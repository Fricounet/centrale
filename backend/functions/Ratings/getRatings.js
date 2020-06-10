const DynamoDB = require('aws-sdk/clients/dynamodb');

module.exports.handle = async event => {
    const search = event.multiValueQueryStringParameters;
    if (search.movie == undefined && search.user == undefined) {
        throw new Error('Il manque une id dans le header');
    }

    const dynamoDb = new DynamoDB.DocumentClient();
    const listRatings = await dynamoDb.query({
        TableName: process.env.tableName,
        KeyConditionExpression: '#type = :type',
        ExpressionAttributeNames: {
            '#type': 'type'
        },
        ExpressionAttributeValues: {
            ':type': 'rating',
        },
    }).promise();

    const id = search.movie != undefined ? search.movie[0] : search.user[0];
    const ratings = listRatings.Items.filter(rating => {
        return rating.uuid.includes(id);
    });

    return {
        statusCode: 200,
        headers:{
            'Access-Control-Allow-Origin':'*',
        },
        body: JSON.stringify({ Ratings: ratings })
    }
}
