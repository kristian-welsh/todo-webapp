const express = require('express');
const router = express.Router();
const Presenter = require('./Presenter');

class Router {
	constructor(controller, presenter) {
		this.router = express.Router();

		// import middleware
		this.router.use((req, res, next) => {
			console.log(`Serving ${req.method} ${req.url} to ${req.ip}`);
			next();
		});

		//serve requests
		this.router.get('/', async (req, res) => {
			var responseModel = await controller.listTasks();
			var viewModel = presenter.createViewModel({title: 'Todo'}, responseModel);
			res.render('index', viewModel);
		});
		
		//rest
		//creates a task and responds with apropriate status code and the new id
		this.router.post('/api/task', async (req, res) => {
			try {
				var taskId = await controller.createTask(req);
				console.log("taskId: " + taskId);
				res.status(201).send({id: taskId});
			} catch (e) {
				res.body = e;
				res.sendStatus(500);
			}
		});
		
		// respond with the html representation of a single task
		this.router.get('/api/task/:id/html', async (req, res) => {
			var task = await controller.showTask(req.params.id);
			var viewModel = await presenter.presentTask(task);
			res.status(201).send({html: viewModel});
		});

		this.router.delete('/api/task/:id', async (req, res) => {
			try {
				await controller.deleteTask(req.params.id);
				res.status(200).send({ });
			} catch (e) {
				res.status(500).send({e});
			}
		});
	}
}

module.exports = Router;
