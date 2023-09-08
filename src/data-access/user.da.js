const {UserModel} = require( '../models' );


/**
 * Method to insert a user
 * @param userData
 * @returns {Promise<HydratedDocument<unknown, {}, {}>[]>}
 */
const insertUser = async ( userData ) => {
	return await UserModel.create( {...userData} )
}


/**
 * Method to find a user by email
 *
 * @param email
 * @returns {Promise<Query<Document<unknown, {}, unknown> & unknown extends {_id?: infer U} ? IfAny<U, {_id: Types.ObjectId}, Required<{_id: U}>> : {_id: Types.ObjectId}, Document<unknown, {}, unknown> & unknown extends {_id?: infer U} ? IfAny<U, {_id: Types.ObjectId}, Required<{_id: U}>> : {_id: Types.ObjectId}, {}, unknown, "findOne"> & {}>}
 */
const findByEmail = async ( email ) => {
	return await UserModel.findOne( {email} ).clone();
}

module.exports = {
	insertUser,
	findUserByEmail: findByEmail
}
