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

function assert_called_once_with_equal_arg(spy, arg) {
	expect(spy.calledOnce);
	expect(spy.firstCall.args[0]).to.deep.equal(arg);
}

describe('MongoTaskGateway', () => {
	beforeEach(() => {
		connection = {
			establish: sinon.stub(),
			disband: sinon.spy(),
		};
		data = {
			insertOne: sinon.stub(),
			find: sinon.stub(),
			findOne: sinon.stub(),
			deleteOne: sinon.spy(),
		};
		findResults = {
			toArray: () => ['findResults array'],
		};
		connection.establish.returns(Promise.resolve(data));
		data.insertOne.returns({ insertedId: "testId" });
		gateway = new MongoTaskGateway(connection);
	});

	describe('#store()', () =>{
		it('connects and disconnects from the database cleanly', async () => {
			let task = {title: "title", body: "body", author: "author"};
			await gateway.store(task);
			assert_connection_established_and_disbanded_correctly();
		});

		it('stores a task', async () => {
			let task = {title: "title", body: "body", author: "author"};
			await gateway.store(task);
			sinon.assert.calledWith(data.insertOne, task);
		});

		it('returns the tasks id', async () => {
			let task = {title: "title", body: "body", author: "author"};
			let id = await gateway.store(task);
			chai.assert.equal("testId", id);
		});
	});

	describe('#retrieveAll()', () =>{
		it('connects and disconnects from the database cleanly', async () => {
			data.find.returns(findResults);
			await gateway.retrieveAll();
			assert_connection_established_and_disbanded_correctly();
		});

		it('retrieves tasks', async () => {
			data.find.returns(findResults);
			let result = await gateway.retrieveAll();
			expect(result).to.deep.equal(findResults.toArray());
		});
	});

	describe('#retrieve(id)', () => {
		it('connects and disconnects from the database cleanly', async () => {
			await gateway.retrieve(taskid);
			assert_connection_established_and_disbanded_correctly();
		});

		it('finds the task using the specified id', async () => {
			await gateway.retrieve(taskid);
			assert_called_once_with_equal_arg(data.findOne, { "_id": hashedTaskid });
		});
	});

	describe('#delete(id)', () => {
		it('connects and disconnects from the database cleanly', async () => {
			await gateway.delete(taskid);
			assert_connection_established_and_disbanded_correctly();
		});

		it('deletes a task', async () => {
			await gateway.delete(taskid);
			assert_called_once_with_equal_arg(data.deleteOne, { "_id": hashedTaskid });
		});
	});
});
