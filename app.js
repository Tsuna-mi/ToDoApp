var express = require('express')
var jade = require('jade')
var bodyParser = require('body-parser')
//se usa para cuando enviamos datos por post
var app = express();
app.locals.moment = require('moment');

var publicFolder = __dirname + '/public';

// _variable notación de variable privada 
var _tasks = [
	{
		id: 'a',
		name: "my first task",
		completed: false
	},
	{
		id: 'b',
		name: "another task",
		completed: false
	},
	{
		id: 'c',
		name: "and another task one more time",
		completed: false
	}
];
var counter = 0;

app.set('views', __dirname + '/views');	//para jade
app.set('view engine', 'jade');

//middleware that parse application format: x-www-form-urlencoded
//urlencoded método para codif. los datos pasados por url
app.use(bodyParser.urlencoded({ extended: false }))

//console.log (publicFolder);
app.use( express.static(publicFolder) )

app.get('/tasks', function(req,res) {
	var tasksToDo = _tasks.filter(function(item){
		return item.completed === false;
	})
	res.render('tasks', {
		//currentUrl: req.url,
		title: "ToDo List",
		tasks: tasksToDo
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
		creationDate: new Date(),
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
	//console.log("tareas antes de borrar:");
	//console.log(_tasks);  //consola del servidor
	var idToRemove = req.query.id;
	_tasks = _tasks.filter(function(item,i) {
		return item.id !== parseInt(idToRemove,10);
				//tenemos que parsear este valor que nos ha llegado como cadena
	})
	// console.log ("task to remove" + idToRemove);
	//console.log("tareas después de borrar:");
	//console.log(_tasks);  
	//para probar esto lo podemos hacer con postman
	res.send("'/tasks' => id to remove = " + idToRemove);
	// res.redirect('/tasks')
})

app.put('/tasks', function(req, res){
	console.log("query id ");
	console.log(req.query.id);
	if (!!req.query.id){
		var taskId = parseInt(req.query.id);
		console.log (taskId);
		_tasks.forEach(function(item){
			if(item.id === taskId){
				item.completed = true;
				item.completedDate = new Date();
			}
		});
	}else{
		console.log("aqui");
		_tasks.forEach(function(item){
			item.completed = true;
			item.completedDate = new Date();		
		});
	}
	
	res.send();
});

app.get('/completed', function(req,res) {
	var completedTasks = _tasks.filter(function(item){
		return item.completed === true;
	})
	res.render('completed', {
		//currentUrl: req.url,
		title: "Completed Tasks",
		tasks: completedTasks,

	});
})

app.listen(3000, function() {
	console.log("Listening on port 3000");
})