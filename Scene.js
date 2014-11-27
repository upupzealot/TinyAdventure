var mouse = {x : 0, y : 0};

function Scene(width, height) {
	this.self = this;

	this.width = width;
	this.height = height;

	this.view_width = width;
	this.view_height = height;

	var canvas = null;
	var ctx = null;


	var dt = 0;
	this.time_mark = 0;

	this.actors = new Array();

	this.color = '707070';
}

Scene.prototype = {
	init:function(document) {
		var self = this.self;

		canvas = document.getElementById('main_canvas');
		canvas.width = document.body.clientWidth;
		canvas.height = document.body.clientHeight;

		ctx = canvas.getContext('2d');

		ctx.fillStyle = '000000';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		var scale = Math.min(canvas.width / self.width, canvas.height / self.height);
		self.view_width = Math.floor(self.width * scale);
		self.view_height = Math.floor(self.height * scale);

		var clip_x = Math.floor((canvas.width - self.view_width) / 2);
		var clip_y = Math.floor((canvas.height - self.view_height) / 2);

		ctx.rect(clip_x, clip_y, self.view_width, self.view_height);
		ctx.clip();
		ctx.translate(clip_x, clip_y);
		ctx.scale(scale, scale);
	},

	act:function() {
		var self = this.self;
		var current_time = new Date().getTime();
		dt = (current_time - self.timemark) / 1000;
		self.timemark = current_time;

		self.update(dt);
		for (var i = 0; i < self.actors.length; i++) {
			self.actors[i].update(dt);
		};
		self.render(ctx);
		for (var i = 0; i <  self.actors.length; i++) {
			 self.actors[i].render(ctx);
		};
	},

	update:function(dt) {
		//var self = this.self;
		//print(self.actors.length);
	},

	render:function(ctx) {
		var self = this.self;
		ctx.fillStyle = self.color;
		ctx.fillRect(0, 0, self.width, self.height);

		ctx.fillStyle = '#FFFFFF';
		ctx.fillText("mouse position:(" + mouse.x + "," + mouse.y + ")", 0, 10);
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
}