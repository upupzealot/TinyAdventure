var mouse = {x : 0, y : 0};

function Scene(width, height) {
	this.self = this;
	current_scene = this;

	this.width = width;
	this.height = height;

	this.view_width = width;
	this.view_height = height;
	this.clip_x = 0;
	this.clip_y = 0;
	this.scale = 1;

	var ctx = null;
	var buffer = null;
	var btx = null;

	var dt = 0;
	this.time_mark = 0;
	this.fps = new FPS();

	this.actors = new Array();

	this.color = "#707070";
}

Scene.prototype = {
	init:function(document) {
		var self = this.self;

		canvas = document.getElementById("main_canvas");
		canvas.width = document.body.clientWidth;
		canvas.height = document.body.clientHeight;
		ctx = canvas.getContext("2d");

		ctx.fillStyle = '#000000';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		self.scale = Math.min(canvas.width / self.width, canvas.height / self.height);
		self.view_width = self.width * self.scale >> 0;
		self.view_height = self.height * self.scale >> 0;

		buffer = document.createElement("canvas");
		buffer.width = self.width;
		buffer.height = self.height;
		btx = buffer.getContext("2d");

		self.clip_x = (canvas.width - self.view_width) / 2 >> 0;
		self.clip_y = (canvas.height - self.view_height) / 2 >> 0;

		ctx.rect(self.clip_x, self.clip_y, self.view_width, self.view_height);
		ctx.translate(self.clip_x, self.clip_y);
		ctx.scale(self.scale, self.scale);
	},
	
	onclicked:function() {
		var self = this.self;
		for (var i = 0; i < self.actors.length; i++) {
			if(self.actors[i].contains(mouse)) {
				self.actors[i].onclicked();
			}
		};
	},

	act:function() {
		var self = this.self;

		var current_time = new Date().getTime();
		if(self.time_mark == 0) {
			self.time_mark = current_time;
		}
		dt = (current_time - self.time_mark) / 1000;
		self.time_mark = current_time;

		self.fps.update(dt);
		self.update(dt);
		for (var i = 0; i < self.actors.length; i++) {
			self.actors[i].update(dt);
		};
		//self.render(btx);
		for (var i = 0; i <  self.actors.length; i++) {
			 //self.actors[i].render(btx);
			 self.actors[i].render(ctx);
		};
		ctx.drawImage(buffer, 0, 0);

		ctx.fillStyle = '#707070';
		ctx.fillRect(0, 0, 160, 40);
		ctx.fillStyle = '#FFFFFF';
		ctx.fillText("mouse position:(" + mouse.x + "," + mouse.y + ")", 0, 10);
		ctx.fillText("fps:" + self.fps.fps, 0, 30);
	},

	update:function(dt) {
		//var self = this.self;
		//console.log(self.actors.length);
	},

	render:function(ctx) {
		var self = this.self;
		ctx.fillStyle = self.color;
		ctx.fillRect(0, 0, self.width, self.height);
	},

	addActor:function() {
		var self = this.self;
		if(arguments.length == 1) {
			var actor = arguments[0];
			self.actors.push(actor);
			actor.scene = self;
		} else if(arguments.length == 3) {
			var actor = arguments[0];
			self.actors.push(actor);
			actor.scene = self;
			actor.x = arguments[1];
			actor.y = arguments[2];
		}
	}
};
