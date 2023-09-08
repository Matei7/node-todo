const {Api400Error} = require( '../utils/error' )
const logger = require( '../utils/logger' )

const {verifyJWT} = require( '../utils/auth' );
module.exports = permission => async ( req, res, next ) => {
	const {authorization} = req.headers,
		token = authorization?.split( ' ' )?.[ 1 ] || '';

	if ( ! token ) {
		logger.error( 'Token is required to access this resource' )
		next( new Api400Error( 'Token is required to access this resource' ) )
	} else {
		const {role, userId} = await verifyJWT( token );

		if ( role !== permission ) {
			logger.error( `User ${userId} tried to access a resource without permission` )
			next( new Api400Error( 'You do not have permission to access this resource' ) )
		} else {
			next()
		}
	}
}
