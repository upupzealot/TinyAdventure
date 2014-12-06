var mouse = {x : 0, y : 0};
var current_scene = null;
var canvas = document.getElementById('main_canvas');

addEventListener("mousemove", 
	function(evt) {
		var rect = canvas.getBoundingClientRect(); 
		mouse.x = evt.clientX - rect.left;
		mouse.y = evt.clientY - rect.top;
	}, 
false);

addEventListener("touchmove", 
	function(evt) {
		event.preventDefault();
		var rect = canvas.getBoundingClientRect(); 
		mouse.x = evt.touches[0].clientX - rect.left;
		mouse.y = evt.touches[0].clientY - rect.top;
	}, 
false);

addEventListener("click", 
	function(evt) {
		var rect = canvas.getBoundingClientRect();
		mouse.x = evt.clientX - rect.left;
		mouse.y = evt.clientY - rect.top;
		current_scene.onclicked();
	}, 
false);

addEventListener("touchend", 
	function(evt) {
		event.preventDefault();
		var rect = canvas.getBoundingClientRect(); 
		mouse.x = evt.touches[0].clientX - rect.left;
		mouse.y = evt.touches[0].clientY - rect.top;
		current_scene.onclicked();
	}, 
false);

addEventListener("keydown", 
	function(evt) {
		console.log(evt.which);
	},
false);
