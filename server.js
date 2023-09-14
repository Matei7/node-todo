const dotenv = require( 'dotenv' );
dotenv.config();
const {PORT} = process.env;
const logger = require( './src/utils/logger' );
const {BaseError} = require( './src/utils/error' );
const {isOperationalError} = require( './src/middlewares/errors' );
const dbConnect = require( './config/db' );
dbConnect();

const app = require( './app' );

process.on( 'uncaughtException', ( error ) => {
	logger.error( error )

	if ( ! isOperationalError( error ) ) {
		process.exit( 1 )
	}
} )

process.on( 'unhandledRejection', ( error ) => {
	throw new BaseError( error.message, 500 )
} )
app.listen( PORT, () => {
	console.log( `Server is listening on port ${PORT}` );
} );

module.exports = app;

