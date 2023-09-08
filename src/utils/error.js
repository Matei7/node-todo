const {httpStatus} = require( '../../constants' );

class BaseError extends Error {
	constructor( message, statusCode, isOperational = true ) {
		super( message );
		this.statusCode = statusCode;
		this.isOperational = isOperational;
		Error.captureStackTrace( this, this.constructor );
	}
}

class Api404Error extends BaseError {
	constructor( message, statusCode = httpStatus.NOT_FOUND, isOperational = true ) {
		super( message, statusCode, isOperational );
	}
}

class Api400Error extends BaseError {
	constructor( message, statusCode = httpStatus.BAD_REQUEST, isOperational = true ) {
		super( message, statusCode, isOperational );
	}
}

class Api500Error extends BaseError {
	constructor( message, statusCode = httpStatus.INTERNAL_SERVER_ERROR, isOperational = false ) {
		super( message, statusCode, isOperational );
	}
}

module.exports = {
	BaseError,
	Api404Error,
	Api400Error,
	Api500Error
};
