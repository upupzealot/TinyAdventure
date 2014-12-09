var mouse = {x : 0, y : 0};

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
		Game.current_scene.onClicked();
	}, 
false);

addEventListener("touchend", 
	function(evt) {
		event.preventDefault();
		PointConvert(evt.touches[0]);
		Game.current_scene.onClicked();
	}, 
false);

addEventListener("keydown", 
	function(evt) {
		Game.current_scene.onKeyDown(evt.which);
	},
false);

function PointConvert(point_event) {
	var rect = Screen.canvas.getBoundingClientRect();
	var x = point_event.clientX - rect.left;
	var y = point_event.clientY - rect.top;

	if(	x >= Screen.clip_x && 
		x <= Screen.clip_x + Screen.view_width && 
		y >= Screen.clip_y && 
		y <= Screen.clip_y + Screen.view_height) {

		mouse.x = (x - Screen.clip_x) / Screen.scale >> 0;
		mouse.y = (y - Screen.clip_y) / Screen.scale >> 0;
	}
}
