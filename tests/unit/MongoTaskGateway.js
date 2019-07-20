const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;

const path = "../../src/storage/";
const MongoTaskGateway = require(path + "MongoTaskGateway");

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
			find: sinon.stub(),
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
});
