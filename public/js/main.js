//console.log ("hola")
//$(h1).css(color,red);
$(".tasks li a.delete").on("click", function(e) {
	e.preventDefault(); //para evitar que nos recarge la página
	//console.log(this);
	var url = $(this).attr("href");
	//console.log(url);
	var $self = $(this); // guardamos en self el elemento actual	
	

	$.ajax({
		url: url,
		type: 'delete' //corresponde al método definito en app.js al acceder a la url /tasks
	})
	.done(function(msg) {
		console.log(msg)
		//console.log("the task has been removed!!");
		$self.parent().parent().remove(); //borramos el elemento del DOM
		//window.location = '/tasks';
		//en este caso no redirijimos desde el método delete del servidor,
		//como hemos hecho la operación con AJAX, porque no es un método por
		//defecto, es mejor recargar la página desde el lado cliente, 
		//cuando la operación haya terminado. Opción más sencilla
	})

	//console.log("continue doing things....")

})

$(".tasks li a.add").on("click", function(e) {
	e.preventDefault(); 
	var url = $(this).attr("href");	
	console.log(this);
	console.log(url);
	var $self = $(this); // guardamos en self el elemento actual	
	
	$.ajax({
		url: url,
		type: 'PUT' //corresponde al método definito en app.js al acceder a la url /tasks
	})
	.done(function() {				
		$self.parent().parent().remove(); //borramos el elemento del DOM				
	})
})