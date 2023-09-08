const mongoose = require( 'mongoose' );

const TodoSchema = new mongoose.Schema( {
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	status: {
		type: String,
		enum: [ 'TODO', 'IN_PROGRESS', 'DONE' ],
	}
} );

module.exports = mongoose.model( 'Todo', TodoSchema );
