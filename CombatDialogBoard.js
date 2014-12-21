function CombatDialogBoard() {
	base(this, DialogBoard, []);

	this.buffer_top = 85;
	this.buffer_bottom = 85;
	this.buffer.height = this.height_max - this.image.top - this.image.bottom - this.buffer_top - this.buffer_bottom;
	this.buffer_context = this.buffer.getContext("2d");

	this.object = null;

	this.bubbles = null;
	this.y_offset = 0;
	this.y_delay = 0;
	this.pop_state = "pop";
	this.pop_count = 0;
	this.delay_count = 0;
	this.show_over = false;
	this.button = null;

	//this.avator0 = new NinePatch("AvatarFrame.png", 24, 24, 23, 23);
}

CombatDialogBoard.prototype.addButton = function() {
	var self = this.self;

	self.button.active = false;
	self.button.contains = function(point) {
		var dx = Math.abs(point.x - this.x);
		var dy = Math.abs(point.y - this.y);
		return dx <= this.width / 2 && dy <= this.height / 2;
	}
	self.button.onClicked = function(point) {
		this.active = false;
		self.scene.render_map();
		self.hide();
	}
	self.scene.addActor(self.button, self.x, self.y + self.height_max / 2 - self.image.bottom - self.buffer_bottom - self.button.height / 2);
}

CombatDialogBoard.prototype.onShow = function(dt) {
	var self = this.self;

	if(self.button == null) {
		self.button = new GameButton("确  定");
		self.addButton();
	}
}

CombatDialogBoard.DelayInterval = 0.5;

CombatDialogBoard.prototype.update_on_show = function(dt) {
	var self = this.self;

	if(self.pop_state == "pop") {
		if(self.pop_count >= self.bubbles.length) {
			return;
		}

		self.y_offset += self.bubbles[self.pop_count].height + CombatDialogBoard.BubbleGap;
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
		if(self.delay_count >= CombatDialogBoard.DelayInterval) {
			self.delay_count = 0;
			self.pop_state = "pop";
		}
	}
}

CombatDialogBoard.BubbleGap = 10;

CombatDialogBoard.prototype.render_on_show = function(ctx) {
	var self = this.self;

	var top = self.y - self.height_max / 2 + self.image.top;
	var left = self.x - self.width_max / 2 + self.image.left;
	var width = self.width_max - self.image.left - self.image.right;
	var height = self.height_max - self.image.top - self.image.bottom;
	self.object.unit1.object.avatar.render(ctx, left, top, width, Avatar.size, "left");

	self.object.unit0.object.avatar.render(ctx, left, top + height - Avatar.size, width, Avatar.size, "right");

	self.buffer_context.clearRect(0, 0, self.buffer.width, self.buffer.height);

	var y_offset = 0;
	for(var i = 0; i < self.bubbles.length; i++) {
		self.buffer_context.drawImage(self.bubbles[i].buffer, 0, y_offset + self.buffer.height - self.y_delay);
		y_offset += self.bubbles[i].height + CombatDialogBoard.BubbleGap;
	}

	if(self.show_over) {
		self.button.active = true;
	}

	ctx.drawImage(self.buffer, left + self.buffer_left, top + self.buffer_top);
}