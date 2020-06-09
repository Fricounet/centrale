const json = require('../data.json');
const DynamoDB = require('aws-sdk/clients/dynamodb');

module.exports.handle = async event => {
    if (!process.env.tableName) {
        throw new Error('env.tableName must be defined');
    }

    data = json[process.env.tableName]
    const dynamoDb = new DynamoDB.DocumentClient();

    // Build the batches
    const batches = [];
    let current_batch = [];
    let item_count = 0;

    await data.map(item => {
        current_batch.push(item);
        item_count++;

        // If we've added 25 items, add the current batch to the batches array and reset it
        if(item_count%25 == 0) {
            batches.push(current_batch);
            current_batch = [];
        }
    });

    // Add the last batch if it has records and is not equal to 25
    if(current_batch.length > 0 && current_batch.length != 25) batches.push(current_batch);

    batches.map(async item => {
        const params = {
            RequestItems: {
                [process.env.tableName]: item
            }
        }
        await dynamoDb.batchWrite(params, (err, data) => {
            if (err) console.log(err, err.stack);
            else     console.log(data)}).promise();
    })

    return {
        statusCode: 200,
        headers:{
            'Access-Control-Allow-Origin':'*',
        },
        body: JSON.stringify("success"),
    }
}
