const express = require('express');
const router = express.Router();
const Presenter = require('./Presenter');

class Router {
	constructor(controller, presenter) {
		this.router = express.Router();

		// import middleware
		this.router.use((req, res, next) => {
			console.log(`Router serving ${req.method} ${req.url} to ${req.ip}`);
			next();
		});

		//serve requests
		this.router.get('/', async (req, res) => {
			try {
				let requestModel = {...req.body, ...req.params};
				var responseModel = await controller.handleRequest('list', requestModel);
				var viewModel = presenter.createViewModel({title: 'Todo'}, responseModel);
				res.render('index', viewModel);
			} catch (e) {
				console.log(e);
				res.status(500).send({error: e});
			}
		});

		//rest
		//creates a task and responds with apropriate status code and the new id
		this.router.post('/api/task', async (req, res) => {
			try {
				let requestModel = {...req.body, ...req.params};
				let responseModel = await controller.handleRequest('create', requestModel);
				
				res.status(201).send(responseModel);
			} catch (e) {
				console.log(e);
				res.status(500).send({error: e});
			}
		});

		// respond with the html representation of a single task
		this.router.get('/api/task/:id/html', async (req, res) => {
			try {
				let requestModel = {...req.body, ...req.params};
				let responseModel = await controller.handleRequest('show', requestModel);
				let viewModel = { html: await presenter.presentTask(responseModel.task) };
				res.status(201).send(viewModel);
			} catch (e) {
				console.log(e);
				res.status(500).send({error: e});
			}
		});

		this.router.delete('/api/task/:id', async (req, res) => {
			try {
				let requestModel = {...req.body, ...req.params};
				let responseModel = await controller.handleRequest('delete', requestModel);
				
				res.status(200).send({ });
			} catch (e) {
				console.log(e);
				res.status(500).send({error: e});
			}
		});
	}
}

module.exports = Router;
