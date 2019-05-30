const express = require('express');
const hbs = require('express-handlebars');
const MongoConnection = require('../storage/MongoConnection');
const MongoTaskGateway = require('../storage/MongoTaskGateway');
const CreateTask = require('../task/CreateTask');

// application setup
const dbConnection = new MongoConnection("tasks");
const mongoGateway = new MongoTaskGateway(dbConnection);
const createTask = new CreateTask(mongoGateway);

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
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded to req.body

// serve requests
app.get('/', (req, res) => {
	// in the future call applicaiton code based on req, then from
	// response, build the view data in a viewmodel and pass here
	var viewData = {title: 'Index', message: 'Hello, world!'};
	res.render('index', viewData);
});
app.post('/task/create', (req, res) => {
	var requestModel = formToJson(req.body);
	console.log(requestModel);
	const responseModel = createTask.execute(requestModel);
	// todo: view model & 
	
	var viewData = {title: 'Index', message: 'Hello, world!'};
	res.render('index', viewData);
});

function formToJson(formBody) {
	var json = {
		title: formBody.title,
		body: formBody.body,
		author: formBody.author,
	};
	return json;
}

// start server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

