import knex from 'knex';

const db = knex({
	client: 'mysql',
	connection: {
		host: '127.0.0.1',
		user: 'root',
		database: 'todo-manager'
	}
});

module.exports = db;