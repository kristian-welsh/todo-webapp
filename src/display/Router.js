const express = require('express');
const router = express.Router();

class Router {
	constructor(controller) {
		this.router = express.Router();

		// import middleware
		this.router.use((req, res, next) => {
			console.log(`Serving ${req.url} to ${req.ip}`);
			next();
		});

		//serve requests
		this.router.get('/', async (req, res) => {
			var viewData = {title: 'Todo', tasks:[]};
			viewData.tasks = await controller.listTasks();
			res.render('index', viewData);
		});
		this.router.post('/task/create', async (req, res) => {
			await controller.createTask(req);
			res.redirect(303, '/');
		});
	}
}

module.exports = Router;