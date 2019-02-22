
function errors(err, req, res, next){
    const error = process.env.APP_DEBUG ? require('serialize-error')(err) : { message: 'An error occurred' };
    const status = err.statusCode || 500;

    //respond to client
    res.status(status).json({ error });

    logger.log("errors", error);
}

module.exports = errors;