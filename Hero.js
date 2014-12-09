function Hero() {
	base(this, Actor, arguments);

	this.animate_frames = new Array();
	for(var direction_key in Hero.directions) {
		var direction = Hero.directions[direction_key];
		this.animate_frames[direction] = new Array();

		this.animate_frames[direction]["stand"] = new Array();
		for(var i = 0; i < 4; i++) {
			this.animate_frames[direction]["stand"][i] = new Bitmap("Hero/" + direction + "_stand_" + i + ".png");
		}
		this.animate_frames[direction]["walk"] = new Array();
		for(var i = 0; i < 8; i++) {
			this.animate_frames[direction]["walk"][i] = new Bitmap("Hero/" + direction + "_walk_" + i + ".png");
		}
	}

	this.direction = "up";
	this.state = "stand";

	this.image = this.animate_frames["up"]["stand"][0];
	this.scale = 0.8;

	this.animate_count = 0;
	this.animate_interval = 1 / 16;
	this.frame_count = 0;

	this.step_interval = this.animate_interval * 8;
	this.step_begin_position = {x : 0, y : 0};
	this.step_progress = 0;
	this.step_offset = {x : 0, y : 0};
}

Hero.directions = ["up", "down", "left", "right"];
Hero.states = ["stand", "walk"];

Hero.prototype.update = function(dt) {
	var self = this.self;

	self.animate_count += dt;
	if(self.animate_count >= self.animate_interval) {
		self.animate_count -= self.animate_interval;
		self.frame_count++;
		if(self.state == "walk") {
			if(self.frame_count == 8) {
				self.state = "stand";
				self.frame_count = 0;
				self.animate_count = 0;

				self.scene.flip(self.direction);
				self.step_progress = 0;
			} else {
				self.frame_count = self.frame_count % self.animate_frames[self.direction][self.state].length;
				self.step_progress = (self.frame_count * self.animate_interval + self.animate_count) / (self.animate_interval * 8);
			}
			switch (self.direction) {
				case "up": 
					self.step_offset.y = self.step_progress * 80;
					break;
				case "left" : 
					self.step_offset.x = self.step_progress * 80;
					break;
				case "right" : 
					self.step_offset.x = self.step_progress * -80;
					break;
			}
		} else {
			self.frame_count = self.frame_count % self.animate_frames[self.direction][self.state].length;
		}
	}
}

Hero.prototype.render = function(ctx) {
	var self = this.self;

	self.image = self.animate_frames[self.direction][self.state][self.frame_count];

	self.super.render.call(self, ctx);
}

Hero.prototype.contains = function() {
	return true;
}

Hero.prototype.onClicked = function() {
	var self = this.self;

	if(self.state == "stand") {
		self.step_begin_position.x = self.x;
		self.step_begin_position.y = self.y;

		self.direction = self.getClickDirection();

		self.state = "walk";
		self.frame_count = 0;
		animate_count = 0;
	}
}

Hero.prototype.getClickDirection = function () {
	var self = this.self;

	var up_point = {x : self.x, y : self.y - 80};
	var left_point = {x : self.x - 80, y : self.y};
	var right_point = {x : self.x + 80, y : self.y};

	var d_up = (mouse.x - up_point.x) * (mouse.x - up_point.x) + (mouse.y - up_point.y) * (mouse.y - up_point.y);
	var d_left = (mouse.x - left_point.x) * (mouse.x - left_point.x) + (mouse.y - left_point.y) * (mouse.y - left_point.y);
	var d_right = (mouse.x - right_point.x) * (mouse.x - right_point.x) + (mouse.y - right_point.y) * (mouse.y - right_point.y);

	if(d_up < d_left && d_up < d_right) {
		return "up";
	} else if (d_left < d_right) {
		return "left";
	} else {
		return "right";
	}
}

Hero.prototype.onKeyDown = function(keycode) {
	var self = this.self;

	if(keycode == 87 || keycode == 38) {
		self.direction = "up";
	}

	if(keycode == 65 || keycode == 37) {
		self.direction = "left";
	}

	if(keycode == 68 || keycode == 39) {
		self.direction = "right";
	}
}