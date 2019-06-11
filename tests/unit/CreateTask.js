var chai = require("chai");
var sinon = require("sinon");

var path = "../../src/task/";
var CreateTask = require(path + "CreateTask");
var TaskGateway = require(path + "TaskGateway");

describe('CreateTaskUsecase', function(){
	describe('#execute()', function(){
		it('should persist tasks', function(){
			// arrange
			var expectedTask = {
				title: "title",
				body: "body",
				author: "author"
			};
			var request = {
				title: "title",
				body: "body",
				author: "author",
			};
			var gateway = new TaskGateway();
			var feature = new CreateTask(gateway);
			var mock = sinon.mock(gateway);
			mock.expects('store').once().withArgs(expectedTask);
			
			// act
			var response = feature.execute(request);
			
			// assert
			mock.restore();
			mock.verify();
		});
	});
});
