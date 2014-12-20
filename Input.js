var mouse = {x : 0, y : 0};
var mouse_raw = {x : 0, y : 0};

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
		if(PointConvert(evt)) {
			Game.current_scene.onClicked();
		}
	}, 
false);

addEventListener("touchstart", 
	function(evt) {
		event.preventDefault();
		if(PointConvert(evt.touches[0])) {
			Game.current_scene.onClicked();
		}
	}, 
false);

addEventListener("keydown", 
	function(evt) {
		Game.current_scene.onKeyDown(evt.which);
	},
false);

function PointConvert(point_event) {
	if (Screen.canvas == null) {
		return;
	};

	var rect = Screen.canvas.getBoundingClientRect();
	var x = point_event.clientX - rect.left;
	var y = point_event.clientY - rect.top;
	mouse_raw.x = x;
	mouse_raw.y = y;

	var contains = x >= Screen.clip_x && 
		x <= Screen.clip_x + Screen.view_width && 
		y >= Screen.clip_y && 
		y <= Screen.clip_y + Screen.view_height;

	if(contains) {
		mouse.x = (x - Screen.clip_x) / Screen.scale >> 0;
		mouse.y = (y - Screen.clip_y) / Screen.scale >> 0;
	}

	return contains;
}
