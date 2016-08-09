console.log("Hello from main.js")

$(".tasks li a").on("click", function(e) {
	e.preventDefault();
	console.log(this);
	var url = $(this).attr("href");
	console.log(url);
	var $self = $(this);

	$.ajax({
		url: url,
		type: 'delete'
	})
	.done(function(msg) {
		console.log(msg)
		//console.log("the task has been removed!!");
		$self.parent().remove();
		//window.location = '/tasks';
	})

	console.log("continue doing things....")

})