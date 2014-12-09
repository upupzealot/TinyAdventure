var mouse = {x : 0, y : 0};

function Scene(width, height) {
	this.self = this;

	this.width = width;
	this.height = height;

	var buffer = null;
	var buffer_ctx = null;

	this.actors = new Array();

	this.color = "#707070";
	this.background = null;
}

Scene.prototype = {
	onClicked:function() {
		var self = this.self;
		for (var i = 0; i < self.actors.length; i++) {
			if(self.actors[i].contains(mouse)) {
				self.actors[i].onClicked();
			}
		};
	},

	onKeyDown:function(keycode) {
		var self = this.self;
		for (var i = 0; i < self.actors.length; i++) {
			self.actors[i].onKeyDown(keycode);
		};
	},

	start:function() {},

	update:function(dt) {
		
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
