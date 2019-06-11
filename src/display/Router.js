const express = require('express');
const router = express.Router();
const Presenter = require('./Presenter');

class Router {
	constructor(controller, presenter) {
		this.router = express.Router();

		// import middleware
		this.router.use((req, res, next) => {
			console.log(`Serving ${req.url} to ${req.ip}`);
			next();
		});

		//serve requests
		this.router.get('/', async (req, res) => {
			var responseModel = await controller.listTasks();
			var viewModel = presenter.createViewModel({title: 'Todo'}, responseModel);
			res.render('index', viewModel);
		});
		this.router.post('/task/create', async (req, res) => {
			await controller.createTask(req);
			res.redirect(303, '/');
		});
	}
}

module.exports = Router;