const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const dbUrl = 'mongodb://localhost:27017';
const dbName = 'todo-webapp';
const dbClient = new MongoClient(dbUrl);

class MongoTaskGateway {
	constructor() {
		
	}
	// perform storage in prommise so we can attach a callback that knows it stored correctly
	store(task) {
		return new Promise(resolve => {
			dbClient.connect(err => {
				const collection = dbClient.db(dbName).collection('documents');
				collection.insertMany([task], (err, result) => {
					dbClient.close();
					resolve();
					// later do error handling here by calling another promise arcument switching on err
				});
			});
		});
	}
	// returns a promise that will resolve with the results of the query
	retrieveAll() {
		return new Promise(resolve => {
			dbClient.connect(err => {
				const collection = dbClient.db(dbName).collection('documents');
				collection.find({}).toArray((err, docs) => {
					dbClient.close();
					resolve(docs);
				});
			});
		});
	}
}

//new MongoTaskGateway().store({title: "freddy"}).then(() => console.log("freddy inserted"));
//new MongoTaskGateway().retrieveAll().then(tasks => console.log(tasks));

module.exports = MongoTaskGateway; 