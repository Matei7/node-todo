const {generateJWT, encryptPassword, comparePassword} = require( '../utils/auth' );
const logger = require( '../utils/logger' );
const {Api500Error, BaseError} = require( '../utils/error' );
const {UserDA} = require( '../data-access' )


const checkDuplicateEmail = async ( email ) => {
	try {
		const user = await UserDA.findUserByEmail( email )
		if ( user ) {
			throw new BaseError( 'Email already in use' )
		}
	} catch ( error ) {
		logger.error( `Failed checking for email. ${error}` )
		throw new Api500Error( error )
	}
}

const loginUser = async ( {
	email,
	password
} ) => {
	try {
		const user = await UserDA.findUserByEmail( email );
		await comparePassword( password, user.token );
		const token = generateJWT( user._id, user.role );

		logger.info( `User ${user.name} logged in!` );
		return token;
	} catch ( error ) {
		logger.error( `Failed logging in user: ${email}` );
		throw new Api500Error( 'Emai or password not matching.' );
	}
};
const registerUser = async ( {email, password, username, role} ) => {
	try {
		await checkDuplicateEmail( email )
		const encryptedPassword = await encryptPassword( password );
		const user = await UserDA.insertUser( {
			email,
			username,
			role,
			...encryptedPassword
		} );

		logger.info( `User ${user.username} registered!` );
		return user;
	} catch ( error ) {
		logger.error( `Failed registering user: ${email}` );
		throw new Api500Error( error.message );
	}
};

module.exports = {
	loginUser,
	registerUser,
}
