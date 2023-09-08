const {TodoModel} = require( '../models' );

const findAll = async () => {
	return await TodoModel.find( {} );
}

const findById = async ( {id: _id} ) => {
	return await TodoModel.findById( _id )
}

const insertTodo = async ( todoData ) => {
	return await TodoModel.create( {...todoData} )
};

const updateTodo = async ( {id: _id}, todoData ) => {
	return await TodoModel.updateOne( {_id}, {...todoData} )
};

const deleteTodo = async ( {id: _id} ) => {
	return await TodoModel.deleteOne( {_id} )
};

module.exports = {
	findAllTodo: findAll,
	findTodoById: findById,
	insertTodo,
	updateTodo,
	deleteTodo
};
