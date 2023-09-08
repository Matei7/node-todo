const {TodoDA} = require( '../data-access' );
const {Api500Error} = require( '../utils/error' );
const logger = require( '../utils/logger' );
const getAllTodos = async () => {
	try {
		return await TodoDA.findAll();
	} catch ( e ) {
		logger.error( e );

		throw new Api500Error( 'Failed searching todos' );
	}
};

const getTodoById = async ( id ) => {
	try {
		const todo = await TodoDA.findById( id );
		if ( ! todo ) {
			logger.error( `Todo with id ${id} not found` );

			throw new BaseError( 'Todo not found' );
		}
		return todo;
	} catch ( e ) {
		logger.error( e );

		throw new Api500Error( `Failed searching todo by id: ${id}` );
	}
};

const createTodo = async ( todoData ) => {
	try {
		const todo = await TodoDA.insertTodo( todoData );
		const {_id, title, description, status} = todo;
		return {
			_id,
			title,
			description,
			status,
		};
	} catch ( e ) {
		logger.error( e );

		throw new Api500Error( e.message );
	}
}

const updateTodo = async ( id, todoData ) => {
	try {
		const todo = await TodoDA.updateTodo( id, todoData );
		const {_id, title, description, status} = todo;
		return {
			_id,
			title,
			description,
			status,
		};
	} catch ( e ) {
		logger.error( e );

		throw new Api500Error( e.message );
	}
}

const deleteTodo = async ( id ) => {
	try {
		return await TodoDA.deleteTodo( id );
	} catch ( e ) {
		logger.error( e );

		throw new Api500Error( e.message );
	}
};

module.exports = {
	getAllTodos,
	createTodo,
	getTodoById,
	updateTodo,
	deleteTodo,
}
