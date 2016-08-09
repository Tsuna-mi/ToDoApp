var express = require('express')
var jade = require('jade')
var bodyParser = require('body-parser')
//se usa para cuando enviamos datos por post
var app = express();

var publicFolder = __dirname + '/public';

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

console.log (publicFolder);
app.use( express.static(publicFolder) )

app.get('/tasks', function(req,res) {
	res.render('tasks', {
		title: "ToDo List",
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

//OTRO EJEMPLO DE DELETE POR PARAMS
// app.delete('task/:taskId', function(req,res){
// 	var idToRemove = req.params.taskId;
// 	//para probar esto lo podemos hacer con postman
// 	res.send("'/task/:taskId' => id to remove = " + idToRemove);
// })

app.delete('/tasks', function(req,res) {
	console.log("tareas antes de borrar:");
	console.log(_tasks);  //consola del servidor
	var idToRemove = req.query.id;
	_tasks = _tasks.filter(function(item,i) {
		return item.id !== parseInt(idToRemove,10);
				//tenemos que parsear este valor que nos ha llegado como cadena
	})
	// console.log ("task to remove" + idToRemove);
	console.log("tareas después de borrar:");
	console.log(_tasks);  
	//para probar esto lo podemos hacer con postman
	res.send("'/tasks' => id to remove = " + idToRemove);
	// res.redirect('/tasks')
})

app.listen(3000, function() {
	console.log("Listening on port 3000");
})