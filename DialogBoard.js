function DialogBoard() {
	base(this, Actor, arguments);

	//this.image = new NinePatch("Bubble.png", 24, 24, 23, 23);
	this.image = new NinePatch("Bubble_filled.png", 24, 24, 23, 23);
	this.active = false;

	this.width_min = 46;
	this.height_min = 48;

	this.width_max = 300;
	this.height_max = 400;

	this.width = 46;
	this.height = 48;

	this.buffer = document.createElement("canvas");
	this.buffer.width = this.width_max - this.image.left - this.image.right;
	this.buffer.height = this.height_max - this.image.top - this.image.bottom;
	this.buffer_context = this.buffer.getContext("2d");
	this.buffer_context.font = "600 " + TextBubble.FontSize + "px 微软雅黑";

	this.state = "hide";
	this.tween_count = 0;
	this.tween_interval = 0.3;

	this.object = null;

	this.bubbles = null;
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

			var combat_records = self.object.Calculate();
			self.bubbles = new Array();
			for(var i = 0; i < combat_records.length; i++) {
				self.bubbles.push(new TextBubble(combat_records[i], self.buffer.width));
				self.bubbles[i].render_self();
			}
			console.log(self.bubbles);

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
	if(self.state == "show") {
		self.buffer_context.clearRect(0, 0, self.buffer.width, self.buffer.height);

		var y_offset = 0;
		for(var i = 0; i < self.bubbles.length; i++) {
			self.buffer_context.drawImage(self.bubbles[i].buffer, 0, y_offset);
			y_offset += self.bubbles[i].height;
		}

		ctx.drawImage(self.buffer, self.x - self.buffer.width / 2, self.y - self.buffer.height / 2);
	}
}

DialogBoard.prototype.contains = function(point) {
	var self = this.self;

	var dx = Math.abs(point.x - self.x);
	var dy = Math.abs(point.y - self.y);
	return self.state == "show" && dx <= self.width / 2 && dy <= self.height / 2;
}

DialogBoard.prototype.onClicked = function(point) {
	var self = this.self;

	self.hide();
}