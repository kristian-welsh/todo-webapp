const MongoConnection = require('./MongoConnection');
const ObjectID = require('mongodb').ObjectID;

class MongoTaskGateway {
	constructor(connection) {
		this.connection = connection;
	}
	// perform storage in prommise so we can attach a callback that knows it stored correctly
	// then clauses attatched to the returned promise are executed after the data is stored and connection closed.
	store(task) {
		return this.connection.establish()
		.then(data => data.insertOne(task))//todo: check successful in object returned from insertOne
		.finally(() => this.connection.disband())
		.then((report) => report.insertedId);
	}
	// returns a promise that will resolve with the results of the query
	retrieveAll() {
		return this.connection.establish()
		.then(data => data.find({}).toArray())
		.finally(() => this.connection.disband());
	}
	// returns a promise that will resolve with the results of the query
	retrieve(id) {
		return this.connection.establish()
		.then(data => data.findOne( {"_id": ObjectID(id)} ))
		.finally(() => this.connection.disband());
	}
	async delete(id) {
		let collection = await this.connection.establish();
		await collection.deleteOne( {"_id": ObjectID(id)} );
		await this.connection.disband();
	}
}

module.exports = MongoTaskGateway;
