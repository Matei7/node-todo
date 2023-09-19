const {authServices} = require( '../services' );
const handleAsync = require( '../utils/handleAsync' );
const logger = require( '../utils/logger' );


const register = handleAsync( async ( req, res, next ) => {
	const {username, email, password, role} = req.body;
	const user = await authServices.registerUser( {
		username,
		email,
		password,
		role
	} );

	logger.info( `User ${user.username} created!` );
	res.status( 201 ).send( user );
} )

const login = handleAsync( async ( req, res, next ) => {
	const {email, password} = req.body;
	const token = await authServices.loginUser( {email, password} );

	res.status( 200 ).send( {
		token
	} )
} );

module.exports = {
	register,
	login
};
