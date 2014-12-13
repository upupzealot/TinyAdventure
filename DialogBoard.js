function DialogBoard() {
	base(this, Actor, arguments);

	//this.image = new NinePatch("Bubble.png", 24, 24, 23, 23);
	this.image = new NinePatch("Bubble_filled.png", 24, 24, 23, 23);
	this.active = false;

	this.width_min = 46;
	this.height_min = 48;

	this.width_max = 180;
	this.height_max = 180;

	this.width = 46;
	this.height = 48;

	this.state = "hide";
	this.tween_count = 0;
	this.tween_interval = 0.5;
}

DialogBoard.prototype.show = function() {
	var self = this.self;

	self.active = true;
	self.state = "showing";
}

DialogBoard.prototype.hide = function() {
	var self = this.self;

	self.state = "hiding";
}

DialogBoard.prototype.update = function(dt) {
	var self = this.self;

	if(self.state == "showing") {
		self.tween_count += dt;
		if(self.tween_count >= self.tween_interval) {
			self.tween_count = 0;
			self.state = "show";
			return;
		}
		var process = self.tween_count / self.tween_interval;
		self.width = Math.easeOutBack(self.width_min, self.width_max, process);
		self.height = Math.easeOutBack(self.height_min, self.height_max, process);
	}

	if(self.state == "hiding") {
		self.tween_count += dt;
		if(self.tween_count >= self.tween_interval) {
			self.tween_count = 0;
			self.state = "hide";
			self.active = false;
			self.scene.hero.stopped = false;
			return;
		}
		var process = self.tween_count / self.tween_interval;
		process = 1 - process;
		self.width = Math.easeOutBack(self.width_min, self.width_max, process);
		self.height = Math.easeOutBack(self.height_min, self.height_max, process);
	}
}

DialogBoard.prototype.render = function(ctx) {
	var self = this.self;

	self.image.render(ctx, self.x - self.width / 2, self.y - self.height / 2, self.width, self.height);
}

DialogBoard.prototype.contains = function(point) {
	var self = this.self;

	var dx = Math.abs(point.x - self.x);
	var dy = Math.abs(point.y - self.y);
	return dx <= self.width / 2 && dy <= self.height / 2;
}

DialogBoard.prototype.onClicked = function(point) {
	var self = this.self;

	self.hide();
}