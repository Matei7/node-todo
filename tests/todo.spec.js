const expect = require( 'chai' ).expect;

const request = require( 'supertest' );
const app = require( '../server' );
const {VIEWER, WRITER, TODO} = require( './config' );


describe( 'ToDo API', () => {
	before( async () => {
		/**
		 * Login as a viewer
		 */
		const viewerResponse = await request( app ).post( '/login' )
		                                           .set( 'Accept', 'application/json' )
		                                           .set( 'Content-Type', 'application/json' )
		                                           .send( {
			                                           email: VIEWER.email,
			                                           password: VIEWER.password
		                                           } );

		VIEWER.token = viewerResponse.body.token;
		/**
		 * Login as a writer
		 */
		const writerResponse = await request( app ).post( '/login' )
		                                           .set( 'Accept', 'application/json' )
		                                           .set( 'Content-Type', 'application/json' )
		                                           .send( {
			                                           email: WRITER.email,
			                                           password: WRITER.password
		                                           } )
		WRITER.token = writerResponse.body.token;
	} );
	it( 'Tokens should be defined', async () => {
		expect( VIEWER.token ).to.be.a( 'string' );
		expect( WRITER.token ).to.be.a( 'string' );
	} );
	it( 'Viewer should not be able to create a ToDo', done => {
		request( app )
			.post( '/todos' )
			.set( 'Accept', 'application/json' )
			.set( 'Content-Type', 'application/json' )
			.set( 'Authorization', `Bearer ${VIEWER.token}` )
			.send( TODO )
			.expect( 403 )
			.expect( 'Content-Type', /html/ )
			.expect( response => {
				expect( response.text ).to.be.a( 'string' );
				expect( response.text ).to.be.equal( 'You do not have permission to access this resource' );
			} )
			.end( done );
	} );
	it( 'Writer should be able to create a ToDo', done => {
		console.log( 'WRITER.token', WRITER.token );
		request( app )
			.post( '/todos' )
			.set( 'Accept', 'application/json' )
			.set( 'Content-Type', 'application/json' )
			.set( 'Authorization', `Bearer ${WRITER.token}` )
			.send( TODO )
			.expect( 201 )
			.expect( 'Content-Type', /json/ )
			.expect( response => {
				expect( response.body ).not.to.be.empty;
				expect( response.body ).to.be.an( 'object' );
				expect( response.body ).to.have.property( 'title' );
				expect( response.body.title ).to.be.equal( TODO.title );
				expect( response.body ).to.have.property( 'description' );
				expect( response.body.description ).to.be.equal( TODO.description );
				expect( response.body ).to.have.property( 'status' );
				expect( response.body.status ).to.be.equal( TODO.status );
			} )
			.end( done );
	} );
	it( 'Writer should be able to get all ToDos', done => {
		request( app )
			.get( '/todos' )
			.set( 'Accept', 'application/json' )
			.set( 'Content-Type', 'application/json' )
			.set( 'Authorization', `Bearer ${WRITER.token}` )
			.expect( 200 )
			.expect( 'Content-Type', /json/ )
			.expect( response => {
				expect( response.body ).not.to.be.empty;
				expect( response.body ).to.be.an( 'array' );
			} )
			.end( done );
	} )
	it( 'Viewer should be able to get all ToDos', done => {
		request( app )
			.get( '/todos' )
			.set( 'Accept', 'application/json' )
			.set( 'Content-Type', 'application/json' )
			.set( 'Authorization', `Bearer ${VIEWER.token}` )
			.expect( 200 )
			.expect( 'Content-Type', /json/ )
			.expect( response => {
				expect( response.body ).not.to.be.empty;
				expect( response.body ).to.be.an( 'array' );
			} )
			.end( done );
	} )
} );
