var mouse = {x : 0, y : 0};
var current_scene = null;
var canvas = document.getElementById('main_canvas');

addEventListener("mousemove", 
	function(evt) {
		PointConvert(evt);
	}, 
false);

addEventListener("touchmove", 
	function(evt) {
		event.preventDefault();
		PointConvert(evt.touches[0]);
	}, 
false);

addEventListener("click", 
	function(evt) {
		PointConvert(evt);
		current_scene.onclicked();
	}, 
false);

addEventListener("touchend", 
	function(evt) {
		event.preventDefault();
		PointConvert(evt.touches[0]);
		current_scene.onclicked();
	}, 
false);

addEventListener("keydown", 
	function(evt) {
		console.log(evt.which);
	},
false);

function PointConvert(point_event) {
	var rect = canvas.getBoundingClientRect();
	var x = point_event.clientX - rect.left;
	var y = point_event.clientY - rect.top;

	if(	x >= current_scene.clip_x && 
		x <= current_scene.clip_x + current_scene.view_width && 
		y >= current_scene.clip_y && 
		y <= current_scene.clip_y + current_scene.view_height) {

		mouse.x = (x - current_scene.clip_x) / current_scene.scale >> 0;
		mouse.y = (y - current_scene.clip_y) / current_scene.scale >> 0;
	}
}
