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

app.use( authRoutes );
app.use( todoRoutes );
app.use( logErrorMiddleware );
app.use( returnErrorMiddleware );


module.exports = app;
