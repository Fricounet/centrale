const searchMoviesByCriteria = require('./searchMoviesByCriteria');
const searchMoviesByName = require('./searchMoviesByName');

module.exports.handle = async event => {
    const search = event.multiValueQueryStringParameters;
    const listMoviesByCriteria = search.type != undefined ? await searchMoviesByCriteria.handle(search.type) : [];
    const listMoviesByName = search.query != undefined ? await searchMoviesByName.handle(search.query[0].toLowerCase().split('_')) : [];

    if (listMoviesByName.length === 0) {
        return {
            statusCode: 200,
            headers:{
                'Access-Control-Allow-Origin':'*',
            },
            body: JSON.stringify({ Movies: listMoviesByCriteria })
        }
    } else if (listMoviesByCriteria.length === 0) {
        return {
            statusCode: 200,
            headers:{
                'Access-Control-Allow-Origin':'*',
            },
            body: JSON.stringify({ Movies: listMoviesByName })
        }
    } else {
    const listMovies = listMoviesByName.filter(movie => {
        return (listMoviesByCriteria.map(elem => {
            return elem.uuid == movie.uuid
        })).includes(true)
    });
    return {
        statusCode: 200,
        headers:{
            'Access-Control-Allow-Origin':'*',
        },
        body: JSON.stringify({ Movies: listMovies })
    }}
}