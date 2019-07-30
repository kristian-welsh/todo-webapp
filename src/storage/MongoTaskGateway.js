const MongoConnection = require('./MongoConnection');
const ObjectID = require('mongodb').ObjectID;

class MongoTaskGateway {
	constructor(connection) {
		this.connection = connection;
	}
	// perform storage in prommise so we can attach a callback that knows it stored correctly
	// then clauses attatched to the returned promise are executed after the data is stored and connection closed.
	// todo: check successful in object returned from insertOne
	async store(task) {
		let collection = await this.connection.establish();
		let result = await collection.insertOne(task);
		await this.connection.disband();
		return result.insertedId;
	}
	// returns a promise that will resolve with the results of the query
	async retrieveAll() {
		let collection = await this.connection.establish();
		let result = await collection.find({}).toArray();
		await this.connection.disband();
		return result;
	}
	// returns a promise that will resolve with the results of the query
	async retrieve(id) {
		let collection = await this.connection.establish();
		let result = await collection.findOne( {"_id": ObjectID(id)} );
		await this.connection.disband();
		return result;
	}
	async delete(id) {
		let collection = await this.connection.establish();
		await collection.deleteOne( {"_id": ObjectID(id)} );
		await this.connection.disband();
	}
}

module.exports = MongoTaskGateway;
