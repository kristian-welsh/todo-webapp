const MongoConnection = require('./MongoConnection');

class MongoTaskGateway {
	constructor(connection) {
		this.connection = connection;
	}
	// perform storage in prommise so we can attach a callback that knows it stored correctly
	// then clauses attatched to the returned promise are executed after the data is stored and connection closed.
	store(task) {
		return this.connection.establish()
		.then(data => data.insertOne(task))
		.finally(() => this.connection.disband());
	}
	// returns a promise that will resolve with the results of the query
	retrieveAll() {
		return this.connection.establish()
		.then(data => data.find({}).toArray())
		.finally(results => {
			this.connection.disband();
			return results;
		});
	}
}

module.exports = MongoTaskGateway;