const VIEWER = {
	username: "viewer",
	email: `viewer${( new Date().getTime() + Math.floor( Math.random() * 100000 ) ).toString( 16 )}@todo.com`,
	password: 'Test123!',
	role: 'VIEWER'
};

const WRITER = {
	username: 'writer',
	email: `writer${( new Date().getTime() + Math.floor( Math.random() * 100000 ) ).toString( 16 )}@todo.com`,
	password: 'Test123!',
	role: 'WRITER'
};

const TODO = {
	title: 'Test ToDo',
	description: 'Test ToDo description',
	status: 'TODO',
}

module.exports = {
	VIEWER,
	WRITER,
	TODO
}
