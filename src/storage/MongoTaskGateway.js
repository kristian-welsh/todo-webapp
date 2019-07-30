const MongoConnection = require('./MongoConnection');
const ObjectID = require('mongodb').ObjectID;

// todo: check for operation successes based on db report, throw promise errors as appropriate
class MongoTaskGateway {
	constructor(connection) {
		this.connection = connection;
	}
	
	// Wraps db code in a connection to a database, passing the data collection.
	// Returns a promise that will resolve with the results of the operation
	async _dbOpp(operation) {
		let collection = await this.connection.establish();
		let result = operation(collection);
		await this.connection.disband();
		return result;
	}
	
	store(task) {
		return this._dbOpp(async data => (await data.insertOne(task)).insertedId);
	}
	retrieveAll() {
		return this._dbOpp(async data => (await data.find( { } )).toArray());
	}
	retrieve(id) {
		return this._dbOpp(async data => await data.findOne( {"_id": ObjectID(id)} ));
	}
	delete(id) {
		return this._dbOpp(async data => await data.deleteOne( {"_id": ObjectID(id)} ));
	}
}

module.exports = MongoTaskGateway;
