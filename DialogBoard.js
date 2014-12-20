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

	this.state = "hide";
	this.tween_count = 0;
	this.tween_interval = 0.3;

	this.object = null;

	this.bubbles = null;
	this.y_offset = 0;
	this.y_delay = 0;
	this.pop_state = "pop";
	this.pop_count = 0;
	this.delay_count = 0;
	this.show_over = false;
	this.button = new GameButton("确  定");

	this.result = null;
}

DialogBoard.prototype.addButton = function() {
	var self = this.self;

	self.button.active = false;
	self.button.contains = function(point) {
		var dx = Math.abs(point.x - this.x);
		var dy = Math.abs(point.y - this.y);
		return dx <= this.width / 2 && dy <= this.height / 2;
	}
	self.button.onClicked = function(point) {
		this.active = false;
		self.hide();
	}
	self.scene.addActor(self.button, self.x, self.y + self.height_max / 2 - self.image.bottom - self.button.height / 2);
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

			self.object.Calculate();
			
			if(self.object.winner.campus == "player") {
				self.result = "win";
			} else if(self.object.winner == null) {
				self.result = null;
			} else {
				self.result = "lose";
			}
			console.log(self.result);
			
			self.bubbles = new Array();
			for(var i = 0; i < self.object.records.length; i++) {
				self.bubbles.push(new TextBubble(self.object.records[i], self.buffer.width));
				self.bubbles[i].render_self();
			}
			self.pop_count = 0;
			self.pop_state = "pop";
			self.show_over = false;
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
			self.scene.render_map();
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

DialogBoard.DelayInterval = 0.5;

DialogBoard.prototype.update_on_show = function(dt) {
	var self = this.self;

	if(self.pop_state == "pop") {
		if(self.pop_count >= self.bubbles.length) {
			return;
		}

		self.y_offset += self.bubbles[self.pop_count].height + DialogBoard.BubbleGap;
		self.pop_count++;
		if(self.pop_count == self.bubbles.length) {
			self.y_offset += self.button.height;
		}
		self.pop_state = "showing";
	} else if (self.pop_state == "showing") {
		if(self.y_delay <= self.y_offset) {
			self.y_delay += 150 * dt;
			self.y_delay = Math.min(self.y_offset, self.y_delay);

			if(self.y_delay >= self.y_offset) {
				if(self.pop_count == self.bubbles.length) {
					self.show_over = true;
				}
				self.pop_state = "delay";
			}
		}
	} else if (self.pop_state == "delay") {
		self.delay_count += dt;
		if(self.delay_count >= DialogBoard.DelayInterval) {
			self.delay_count = 0;
			self.pop_state = "pop";
		}
	}
}

DialogBoard.BubbleGap = 10;

DialogBoard.prototype.render = function(ctx) {
	var self = this.self;

	self.image.render(ctx, self.x - self.width / 2, self.y - self.height / 2, self.width, self.height);
	if(self.state == "show") {
		self.render_on_show(ctx);
	}
}

DialogBoard.prototype.render_on_show = function(ctx) {
	var self = this.self;

	self.buffer_context.clearRect(0, 0, self.buffer.width, self.buffer.height);

	var y_offset = 0;
	for(var i = 0; i < self.bubbles.length; i++) {
		self.buffer_context.drawImage(self.bubbles[i].buffer, 0, y_offset + self.buffer.height - self.y_delay);
		y_offset += self.bubbles[i].height + DialogBoard.BubbleGap;
	}

	if(self.show_over) {
		self.button.active = true;
		if(self.result == "win") {
			//console.log("win");
		}
	}

	ctx.drawImage(self.buffer, self.x - self.buffer.width / 2, self.y - self.buffer.height / 2);
}