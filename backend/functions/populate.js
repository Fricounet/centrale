const uuid = require('uuid');
const DynamoDB = require('aws-sdk/clients/dynamodb');
const createMovie = require('./Movies/createMovie')

module.exports.handle = async event => {
    //const data = JSON.parse(event.body);
    if (!process.env.tableName) {
        throw new Error('env.tableName must be defined');
    }
    console.log(createMovie.handle())
    for (i=0; i<10; i++) {
        await createMovie.handle();
    }
    return {
        statusCode: 200,
        headers:{
            'Access-Control-Allow-Origin':'*',
        },
        body: "success",
    }
}

