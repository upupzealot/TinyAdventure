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

	this.stopped = false;

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

	this.combat_unit = new CombatUnit(150, 12);
	this.combat_unit.object = this;
	this.combat_unit.campus = "player";
	this.combat_unit.name = "你";
	this.combat_unit.skills.push(new TripleStrike(this.combat_unit));
	this.avatar_image = new Bitmap("Avatars/Hero.png");
}

Hero.prototype.onLose = function() {
	var self = this.self;

	self.combat_unit.HP = self.combat_unit.HP_max;
}

Hero.prototype.step = function(direction) {
	var self = this.self;

	self.direction = direction;
	var front_tile;
	switch (direction) {
		case "up": 
			front_tile = self.scene.tiles[2][6];
			break;
		case "left" : 
			front_tile = self.scene.tiles[1][7];
			break;
		case "right" : 
			front_tile = self.scene.tiles[3][7];
			break;
	}

	if(front_tile.physics == "solid") {
		return;
	}

	if(front_tile.object != null) {
		self.CombatWith(front_tile.object);
		return;
	}

	self.state = "walk";
	self.frame_count = 0;
	animate_count = 0;
}

Hero.prototype.CombatWith = function(enemy) {
	var self = this.self;

	self.scene.dialog_board.show(new CombatCalculator(self.combat_unit, enemy.combat_unit));
	self.stopped = true;
}

Hero.directions = ["up", "down", "left", "right"];
Hero.states = ["stand", "walk"];

Hero.prototype.update = function(dt) {
	var self = this.self;

	if(self.stopped) {
		return;
	}

	self.animate_count += dt;
	if(self.animate_count >= self.animate_interval) {
		self.animate_count -= self.animate_interval;
		self.frame_count++;
		if(self.state == "walk") {
			if(self.frame_count == 8) {
				self.frame_count = 0;
				self.animate_count = 0;

				self.scene.flip(self.direction);
				self.step_progress = 0;
				self.step_offset.x = 0;
				self.step_offset.y = 0;

				if(self.direction == "up") {
					self.state = "stand";
				} else {
					self.state = "stand";
					self.step("up");
				}
			} else {
				self.frame_count = self.frame_count % self.animate_frames[self.direction][self.state].length;
				self.step_progress = (self.frame_count * self.animate_interval + self.animate_count) / (self.animate_interval * 8);
				self.step_progress = Math.min(1, self.step_progress);
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

	if(self.stopped) {
		return;
	}

	if(self.state == "stand") {
		self.step_begin_position.x = self.x;
		self.step_begin_position.y = self.y;

		self.step(self.getClickDirection());
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