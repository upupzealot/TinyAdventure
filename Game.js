function Game() {};

Game.FPS = new FPS();

Game.current_scene = null;

Game.running = false;
Game.stopped = true;

Game.start = function() {
	Game.running = true;
}

Game.stop = function() {
	Game.running = false;
	Game.stopped = true;
}

Game.time_mark = 0;
Game.dt = 0;
Game.act = function() {
	if(!Bitmap.LoadedAll()) {
		return;
	}

	if(!Game.running) {
		return;
	} else {
		if(Game.stopped) {
			Game.current_scene.start();
			Game.stopped = false;
		}

		var current_time = new Date().getTime();
		if(Game.time_mark == 0) {
			Game.time_mark = current_time;
			return;
		}
		Game.dt = (current_time - Game.time_mark) / 1000;
		Game.time_mark = current_time;
		Game.dt = Math.min(0.2, Game.dt);
		Game.FPS.update(Game.dt);

		Game.current_scene.update(Game.dt);
		for (var i = 0; i < Game.current_scene.actors.length; i++) {
			if(Game.current_scene.actors[i].active) {
				Game.current_scene.actors[i].update(Game.dt);
			}
		};
		
		if(Game.current_scene.repaint) {
			Game.current_scene.render(Screen.ctx);
		}
		for (var i = 0; i <  Game.current_scene.actors.length; i++) {
			if(Game.current_scene.actors[i].active && Game.current_scene.actors[i].repaint) {
				Game.current_scene.actors[i].render(Screen.ctx);
			}
		};

		Screen.ctx.font = "10px sans-serif";
		Screen.ctx.fillStyle = '#707070';
		Screen.ctx.fillRect(0, 0, 160, 50);
		Screen.ctx.fillStyle = '#FFFFFF';
		Screen.ctx.textAlign = "start";
		Screen.ctx.textBaseline = "alphabetic";
		Screen.ctx.fillText("mouse position:(" + mouse.x + "," + mouse.y + ")", 0, 10);
		Screen.ctx.fillText("fps:" + Game.FPS.fps, 0, 25);
		Screen.ctx.fillText("active:" + Game.current_scene.dialog_board.active, 0, 40);
	}
}

Game.init = function(document) {
	Screen.width = document.body.clientWidth;
	Screen.height = document.body.clientHeight;
	Screen.canvas = document.getElementById("main_canvas");
	Screen.canvas.width = Screen.width;
	Screen.canvas.height = Screen.height;
	Screen.ctx = Screen.canvas.getContext("2d");
	Screen.ctx.save();

	Screen.ctx.fillStyle = '#000000';
	Screen.ctx.fillRect(0, 0, Screen.width, Screen.height);

	setInterval(Game.act, 0);
}

Game.setScene = function(scene) {
	if(scene == Game.current_scene) {
		return;
	}

	Game.current_scene = scene;

	Screen.scale = Math.min(Screen.width / scene.width, Screen.height / scene.height);
	Screen.view_width = scene.width * Screen.scale >> 0;
	Screen.view_height = scene.height * Screen.scale >> 0;

	Screen.clip_x = (Screen.canvas.width - Screen.view_width) / 2 >> 0;
	Screen.clip_y = (Screen.canvas.height - Screen.view_height) / 2 >> 0;

	Screen.ctx.restore();
	Screen.ctx.rect(Screen.clip_x, Screen.clip_y, Screen.view_width, Screen.view_height);
	Screen.ctx.clip();
	Screen.ctx.translate(Screen.clip_x, Screen.clip_y);
	Screen.ctx.scale(Screen.scale, Screen.scale);
}
