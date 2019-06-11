// imports
const MongoConnection = require('./storage/MongoConnection');
const MongoTaskGateway = require('./storage/MongoTaskGateway');

const CreateTask = require('./task/CreateTask');
const ListTasks = require('./task/ListTasks');

const Controller = require('./display/Controller');
const Router = require('./display/Router');
const WebServer = require('./display/WebServer');

// application setup
const mongoConnection = new MongoConnection("tasks");
const mongoTaskGateway = new MongoTaskGateway(mongoConnection);

const createTask = new CreateTask(mongoTaskGateway);
const listTasks = new ListTasks(mongoTaskGateway);

const controller = new Controller(createTask, listTasks);
const presenter = new Presenter();
const router = new Router(controller, presenter);
const server = new WebServer(router.router);

// start server
server.start();