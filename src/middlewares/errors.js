const {BaseError} = require( '../utils/error' );

const logger = require( '../utils/logger' );

const logErrorMiddleware = ( err, req, res, next ) => {
	logger.error( err );
	next( err );
}

const returnErrorMiddleware = ( err, req, res, next ) => {
	res.status( err.statusCode || 500 ).send( err.message )
}

function isOperationalError( error ) {
	return error instanceof BaseError ? error.isOperational : false
}

module.exports = {
	isOperationalError,
	logErrorMiddleware,
	returnErrorMiddleware,
}
