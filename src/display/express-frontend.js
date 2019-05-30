const express = require('express');
const hbs = require('express-handlebars');
const MongoConnection = require('../storage/MongoConnection');
const MongoTaskGateway = require('../storage/MongoTaskGateway');
const CreateTask = require('../task/CreateTask');
const ListTasks = require('../task/ListTasks');
const Controller = require('./Controller');

// application setup
const dbConnection = new MongoConnection("tasks");
const mongoGateway = new MongoTaskGateway(dbConnection);
const createTask = new CreateTask(mongoGateway);
const listTasks = new ListTasks(mongoGateway);
const controller = new Controller(createTask, listTasks);

// frontend setup
const app = express();
const port = 3000;

// view engine setup
const hbsOptions = {
	extname: 'hbs',
	defaultLayout: 'layout',
	layoutsDir: __dirname + '/views/layouts/',
};
app.engine('hbs', hbs(hbsOptions));
app.set('views', __dirname + '/views/');
app.set('view engine', 'hbs');

// middleware setup
// for parsing application/x-www-form-urlencoded to req.body
app.use(express.urlencoded({ extended: true }));

// serve requests
app.get('/', (req, res) => {
	var viewData = {title: 'Index', message: 'Hello, world!', tasks:[]};
	res.render('index', viewData);
});
app.post('/task/create', (req, res) => {
	var viewData = {title: 'Index', message: 'Hello, world!', tasks:[]};
	controller.createTask(req.body);
	res.redirect(303, '../list');
});
app.get('/list', (req, res) => {
	var viewData = {title: 'Index', message: 'Hello, world!', tasks:[]};
	controller.listTasks()
	.then(tasks => {
		viewData.tasks = tasks;
		res.render('list', viewData);
	});
});

// start server
app.listen(port, () => console.log('Todo webapp running'));

