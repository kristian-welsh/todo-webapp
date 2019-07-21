const chai = require("chai");
const sinon = require("sinon");
const ObjectID = require('mongodb').ObjectID;
const expect = chai.expect;

const path = "../../src/storage/";
const MongoTaskGateway = require(path + "MongoTaskGateway");

const taskid = '123456789ABC';//must be 12 digits for dependency on ObjectID
const hashedTaskid = ObjectID(taskid);// object representing an id, use deep equal

let connection;
let data;
let findResults;
let gateway;

function assert_connection_established_and_disbanded_correctly() {
	chai.assert(connection.establish.calledOnce);
	chai.assert(connection.disband.calledOnce);
	chai.assert(connection.disband.calledAfter(connection.establish));
}

describe('MongoTaskGateway', function(){
	beforeEach(() => {
		connection = {
			establish: sinon.stub(),
			disband: sinon.spy(),
		};
		data = {
			insertOne: sinon.stub(),
			deleteOne: sinon.stub(),
			find: sinon.stub(),
			findOne: sinon.stub(),
		};
		findResults = {
			toArray: () => ['findResults array'],
		};
		connection.establish.returns(Promise.resolve(data));
		data.insertOne.returns({ insertedId: "testId" });
		gateway = new MongoTaskGateway(connection);
	});

	describe('#store()', function(){
		it('connects and disconnects from the database cleanly', async function() {
			let task = {title: "title", body: "body", author: "author"};
			await gateway.store(task);
			assert_connection_established_and_disbanded_correctly();
		});

		it('stores a task', async function() {
			let task = {title: "title", body: "body", author: "author"};
			await gateway.store(task);
			sinon.assert.calledWith(data.insertOne, task);
		});

		it('returns the tasks id', async function() {
			let task = {title: "title", body: "body", author: "author"};
			let id = await gateway.store(task);
			chai.assert.equal("testId", id);
		});
	});

	describe('#retrieveAll()', function(){
		it('connects and disconnects from the database cleanly', async function() {
			data.find.returns(findResults);
			await gateway.retrieveAll();
			assert_connection_established_and_disbanded_correctly();
		});

		it('retrieves tasks', async function() {
			data.find.returns(findResults);
			let result = await gateway.retrieveAll();
			expect(result).to.deep.equal(findResults.toArray());
		});
	});

	describe('#retrieve(id)', function() {
		it('connects and disconnects from the database cleanly', async function() {
			await gateway.retrieve(taskid);
			assert_connection_established_and_disbanded_correctly();
		});

		it('finds the task using the specified id', async function() {
			data.findOne.returnsArg(0);// make the database search return the search parameter
			let result = await gateway.retrieve(taskid);
			expect(result._id).to.deep.equal(hashedTaskid);
		});
	});

	describe('#delete(id)', function() {
		it('connects and disconnects from the database cleanly', async function() {
			await gateway.delete(taskid);
			assert_connection_established_and_disbanded_correctly();
		});

		it('deletes a task', async function() {
			await gateway.delete(taskid);
			chai.assert(data.deleteOne.calledOnce);
		});
	});
});
