const createMovie = require('./Movies/createMovie');
const createUser = require('./Users/createUser')

module.exports.handle = async event => {
    //const data = JSON.parse(event.body);
    if (!process.env.tableName) {
        throw new Error('env.tableName must be defined');
    }

    for (i=0; i<10; i++) {
        await createMovie.handle();
        await createUser.handle();
    }
    return {
        statusCode: 200,
        headers:{
            'Access-Control-Allow-Origin':'*',
        },
        body: JSON.stringify("success"),
    }
}

