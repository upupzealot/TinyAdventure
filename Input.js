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
		var rect = canvas.getBoundingClientRect(); 
		mouse.x = evt.clientX - rect.left;
		mouse.y = evt.clientY - rect.top;
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
		var rect = canvas.getBoundingClientRect(); 
		mouse.x = evt.clientX - rect.left;
		mouse.y = evt.clientY - rect.top;
		current_scene.onclicked();
	}, 
false);

addEventListener("keydown", 
	function(evt) {
		print(evt.which);
	},
false);