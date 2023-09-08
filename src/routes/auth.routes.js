const express = require( 'express' );
const router = express.Router();
const {authControllers} = require( '../controllers' );
const validator = require( '../middlewares/validator' );
const {authValidators} = require( '../validators' );

router.post( '/login', validator( authValidators.login ), authControllers.login )
router.post( '/register', validator( authValidators.register ), authControllers.register )

module.exports = router;
