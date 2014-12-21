function DialogBoard() {
	base(this, Actor, arguments);

	this.image = new NinePatch("Bubble_filled.png", 24, 24, 23, 23);
	this.active = false;

	this.width_min = 46;
	this.height_min = 48;

	this.width_max = 300;
	this.height_max = 500;

	this.width = 46;
	this.height = 48;

	this.buffer = document.createElement("canvas");
	this.buffer_top = 0;
	this.buffer_bottom = 0;
	this.buffer_left = 0;
	this.buffer_right = 0;
	this.buffer.width = this.width_max - this.image.left - this.image.right - this.buffer_left - this.buffer_right;
	this.buffer.height = this.height_max - this.image.top - this.image.bottom - this.buffer_top - this.buffer_bottom;
	this.buffer_context = this.buffer.getContext("2d");

	this.state = "hide";
	this.tween_count = 0;
	this.tween_interval = 0.3;
}

DialogBoard.prototype.show = function(object) {
	var self = this.self;

	self.object = object;
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
			self.onShow();

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

	if(self.state == "show") {
		self.update_on_show(dt);
	}
}

DialogBoard.prototype.onShow = function() {

}

DialogBoard.prototype.update_on_show = function(dt) {

}

DialogBoard.prototype.render = function(ctx) {
	var self = this.self;

	self.image.render(ctx, self.x - self.width / 2, self.y - self.height / 2, self.width, self.height);
	if(self.state == "show") {
		self.render_on_show(ctx);
	}
}

DialogBoard.prototype.render_on_show = function(ctx) {
	
}