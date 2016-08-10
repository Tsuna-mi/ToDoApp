//console.log ("hola")
//$(h1).css(color,red);

//Trigger que detecta que cambia la url para el formato del menú
$(window).on('load', function(e){	
	var url = window.location.pathname;
	//console.log(url);
	if(url==='/tasks'){
		$('.menu li.completed').addClass('inactive');
		$('.menu li.tasks').removeClass('inactive');	
	}else if(url==='/completed'){		
		$('.menu li.tasks').addClass('inactive');
		$('.menu li.completed').removeClass('inactive');
	}    
});

//Para el click en un elemento de menú
$('.menu li').click(function () {    
    $(this).toggleClass('inactive').siblings().toggleClass('inactive');
});

// AJAX
// Para el botón DELETE -- Mét. delete
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
		$('.alert').fadeIn().fadeOut(3000);
		//window.location = '/tasks';
		//en este caso no redirijimos desde el método delete del servidor,
		//como hemos hecho la operación con AJAX, porque no es un método por
		//defecto, es mejor recargar la página desde el lado cliente, 
		//cuando la operación haya terminado. Opción más sencilla
	})
	//console.log("continue doing things....")
})

// Para el botón Done (1 task) -- Mét. put
$(".tasks li a.done").on("click", function(e) {
	e.preventDefault(); 
	var url = $(this).attr("href");	
	console.log(this);
	console.log(url);
	var $self = $(this); // guardamos en self el elemento actual
	
	$.ajax({
		url: url,
		type: 'put' //corresponde al método definito en app.js al acceder a la url /tasks
	})
	.done(function() {
		$self.parent().parent().remove(); //borramos el elemento del DOM
	})
})

// Para el botón All Done (all task) -- Mét. put
$("#complete-all").on("click", function(e) {
	e.preventDefault();
	//console.log(this);
	var url = $(this).attr("href");	
	//console.log(url);
	var $self = $(this); // guardamos en self el elemento actual
	
	$.ajax({
		url: url,
		type: 'put' //corresponde al método definito en app.js al acceder a la url /tasks
	})
	.done(function() {
		$self.closest('ul').remove(); //borramos el elemento del DOM
	})
});

