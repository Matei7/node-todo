const Joi = require( '@hapi/joi' );

module.exports = {
	create: Joi.object( {
		title: Joi.string().required(),
		description: Joi.string().required(),
		status: Joi.string().valid( 'TODO', 'IN_PROGRESS', 'DONE' ).required(),
	} ),
	update: Joi.object( {
		title: Joi.string(),
		description: Joi.string(),
		status: Joi.string().valid( 'TODO', 'IN_PROGRESS', 'DONE' ).required(),
	} ),
}
