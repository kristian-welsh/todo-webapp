const MongoConnection = require('./storage/MongoConnection');
var taskdb = new MongoConnection("tasks");
taskdb.drop();
