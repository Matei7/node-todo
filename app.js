const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const {
	logErrorMiddleware,
	returnErrorMiddleware,
} = require( './src/middlewares/errors' );
const app = express();
const {
	authRoutes,
	todoRoutes,
} = require( './src/routes' );

app.use( bodyParser.json() );
app.use( logErrorMiddleware );
app.use( returnErrorMiddleware );
app.use( authRoutes );
app.use( todoRoutes );


module.exports = app;
