function Scene() {
	var width = 600;
	this.getWidth = function () {
		return width;
	}
	var height = 400;
	this.getHeight = function () {
		return height;
	}
	var color = "#000000";
	//var color = "#80FFFF";

	var canvas;
	var ctx;

	var actors = new Array();

	this.init = function(document) {
		width = document.body.clientWidth;
		height = document.body.clientHeight;

		canvas = document.getElementById('main_canvas');
		canvas.width = width;
		canvas.height = height;

		ctx = canvas.getContext('2d');

		setInterval(this.act, 0);
	}

	var dt = 0;
    var timemark = new Date().getTime();
	function update(dt) {
		
	}

	Scene.prototype.render = function(ctx) {
		ctx.fillStyle = color;
		ctx.fillRect(0, 0, width, height);

		ctx.fillStyle = '#FFFFFF';
		ctx.fillText("mouse position:(" + mouse.x + "," + mouse.y + ")", 0, 10);
	}

	Scene.prototype.act = function() {
		var current_time = new Date().getTime();
		dt = (current_time - timemark) / 1000;
		timemark = current_time;
		update(dt);
		for (var i = 0; i < actors.length; i++) {
			actors[i].update(dt);
		};
		render(ctx);
		for (var i = 0; i < actors.length; i++) {
			actors[i].render(ctx);
		};
	}

	this.addActor = function() {
		if(arguments.length == 1) {
			var actor = arguments[0];
			actors.push(actor);
			actor.scene = this;
		} else if(arguments.length == 3) {
			var actor = arguments[0];
			actors.push(actor);
			actor.scene = this;
			actor.x = arguments[1];
			actor.y = arguments[2];
		}
	}

	current_scene = this;
	this.onclicked = function() {
		for (var i = 0; i < actors.length; i++) {
			if(actors[i].contains(mouse)) {
				actors[i].onclicked();
			}
		};
	}
}