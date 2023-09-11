const express = require( 'express' );
const router = express.Router();
const {todoControllers} = require( '../controllers' );
const checkPermissions = require( "../middlewares/checkPermission" );
const validator = require( '../middlewares/validator' );
const {todoValidators} = require( '../validators' );

router.get( '/todos', checkPermissions( ['WRITER', 'VIEWER'] ), todoControllers.listAllTodos );
router.get( '/todos/:id', checkPermissions( ['WRITER', 'VIEWER'] ), todoControllers.getTodoById );
router.post( '/todos', checkPermissions( 'WRITER' ), validator( todoValidators.create ), todoControllers.createTodo );
router.put( '/todos/:id', checkPermissions( 'WRITER' ), validator( todoValidators.update ), todoControllers.updateTodoById );
router.delete( '/todos/:id', checkPermissions( 'WRITER' ), todoControllers.deleteTodoById );

module.exports = router;
