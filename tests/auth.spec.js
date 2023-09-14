const expect = require( 'chai' ).expect;

const request = require( 'supertest' );
const app = require( '../server' );
const { VIEWER, WRITER } = require( './config' );

const registration = ( user, done ) => {
	request( app )
		.post( '/register' )
		.set( 'Accept', 'application/json' )
		.set( 'Content-Type', 'application/json' )
		.send( user )
		.expect( 201 )
		.expect( 'Content-Type', /json/ )
		.expect( response => {
			expect( response.body ).not.to.be.empty;
			expect( response.body ).to.be.an( 'object' );
		} )
		.end( done );
};

const login = ( user, done ) => {
	request( app ).post( '/login' )
	              .set( 'Accept', 'application/json' )
	              .set( 'Content-Type', 'application/json' )
	              .send( {
		              email: user.email,
		              password: user.password
	              } )
	              .expect( 200 )
	              .expect( 'Content-Type', /json/ )
	              .expect( response => {
		              expect( response.body ).not.to.be.empty;
		              expect( response.body ).to.be.an( 'object' );
		              expect( response.body ).to.have.property( 'token' );
	              } )
	              .end( done );
};

describe( 'Register API', () => {
	it( 'Viewer registration success', done => {
		registration( VIEWER, done );
	} );
	it( 'Writer registration success', done => {
		registration( WRITER, done );
	} );
	it( 'Duplicate registration', done => {
		request( app )
			.post( '/register' )
			.set( 'Accept', 'application/json' )
			.set( 'Content-Type', 'application/json' )
			.send( VIEWER )
			.expect( 500 )
			.expect('Content-Type', /html/ )
			.expect( response => {
				expect( response.text ).to.be.a( 'string' );
				expect( response.text ).to.be.equal( 'Error: Email already in use' );
			} )
			.end( done )
	} )
} );

describe( 'Login API', () => {
	it( 'Viewer login success', done => {
		login( VIEWER, done );
	} );
	it( 'Writer login success', done => {
		login( WRITER, done );
	} );
	it( 'Invalid login', done => {
		request( app )
			.post( '/login' )
			.set( 'Accept', 'application/json' )
			.set( 'Content-Type', 'application/json' )
			.send( {
				email: 'random@test.com',
				password: 'Test123!'
			} )
			.expect( 500 )
			.expect('Content-Type', /html/ )
			.expect( response => {
				expect( response.text ).to.be.a( 'string' );
				expect( response.text ).to.be.equal( 'Email or password not matching.' );
			} )
			.end( done )
	} );

} );
