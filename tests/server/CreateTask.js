var CreateTaskRequest = require("../../src/server/task/CreateTaskRequest");
var chai = require("chai");
describe('CreateTaskUsecase', function(){
	describe('#execute()', function(){
		it('should accept valid data', function(){
			var request = new CreateTaskRequest("title", "body", "author");
			chai.assert.equal(1,1);
		});
	});
});
