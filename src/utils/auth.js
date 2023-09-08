require( 'dotenv' ).config();
const bcrypt = require( 'bcrypt' );
const jwt = require( 'jsonwebtoken' );
const {Api500Error} = require( '../utils/error' );
const {JWT_SECRET, JWT_EXPIRATION} = process.env;

const getSalt = async () => {
	return await bcrypt.genSalt( 10 );
};

const generateToken = async ( value, salt ) => {
	return await bcrypt.hash( value, salt );
};
const encryptPassword = async password => {
	const salt = await getSalt(),
		token = await generateToken( password, salt );

	return {
		token,
		salt
	}
};

const comparePassword = async ( password, token ) => {
	const passwordMatches = await bcrypt.compare( password, token );
	if ( ! passwordMatches ) {
		throw new Api500Error( `Password doesn't match` );
	}
};

const generateJWT = async ( userId, role ) => {
	return jwt.sign( {
		userId,
		role
	}, JWT_SECRET, {
		expiresIn: JWT_EXPIRATION
	} );
};

const verifyJWT = async token => {
	return jwt.verify( token, JWT_SECRET );
};

module.exports = {
	encryptPassword,
	comparePassword,
	generateJWT,
	verifyJWT
}
