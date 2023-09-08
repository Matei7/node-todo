const {todoService} = require( '../services' );
const handleAsync = require( '../utils/handleAsync' );
const logger = require( '../utils/logger' );

const createTodo = handleAsync( async ( req, res ) => {
	const {title, description, status} = req.body;
	const todo = await todoService.createTodo( {
		title,
		description,
		status
	} );
	logger.info( `Todo ${todo.title} created!` );
	res.status( 201 ).send( todo );
} );

const listAllTodos = handleAsync( async ( req, res ) => {
	const result = await todoService.getAllTodos();
	res.send( result );
} );

const getTodoById = handleAsync( async ( req, res ) => {
	const {id} = req.params;
	const result = await todoService.getTodoById( id );
	res.send( result );
} );

const updateTodoById = handleAsync( async ( req, res ) => {
	const {id} = req.params;
	const {title, description, status} = req.body;
	const result = await todoService.updateTodoById( id, {
		title,
		description,
		status
	} );
	res.send( result );
} );

const deleteTodoById = handleAsync( async ( req, res ) => {
	const {id} = req.params;
	const result = await todoService.deleteTodoById( id );
	res.send( result );
} );

module.exports = {
	createTodo,
	listAllTodos,
	getTodoById,
	updateTodoById,
	deleteTodoById
}
