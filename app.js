var express = require('express')
var jade = require('jade')
var bodyParser = require('body-parser')
//se usa para cuando enviamos datos por post
var app = express();

// _variable notación de variable privada 
var _tasks = [
	{
		id: 1,
		name: "my first task",
		completed: false
	},
	{
		id: 2,
		name: "another task",
		completed: false
	},
	{
		id: 3,
		name: "and another task one more time",
		completed: false
	}
];
var counter = 100;

app.set('views', __dirname + '/views');	//para jade
app.set('view engine', 'jade');

//middleware that parse application format: x-www-form-urlencoded
//urlencoded método para codif. los datos pasados por url
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/tasks', function(req,res) {
	res.render('tasks', {
		title: "--- List tasks ---",
		tasks: _tasks
	});
})

//como mandamos datos al servidor desde un formulario, usamos el método POST
//para el mismo endpoint ('/tasks'). También podríamos pasar datos por params o por query
app.post('/tasks', function(req,res) {
	if ( !req.body || !req.body.name ) res.send ("error!");
	var nameTask = req.body.name;
	var newTask = {
		id : ++counter,
		name: nameTask,
		completed: false
	}
	_tasks.push(newTask);
	res.redirect('/tasks')
	//cuando terminamos de hacer cosas, redirijimos de nuevo a la página	
})

app.listen(3000, function() {
	console.log("Listening on port 3000");
})