function CombatDialogBoard() {
	base(this, DialogBoard, []);

	this.buffer_top = 85;
	this.buffer_bottom = 85;
	this.buffer.height = this.height_max - this.image.top - this.image.bottom - this.buffer_top - this.buffer_bottom;
	this.buffer_context = this.buffer.getContext("2d");

	this.calculator = null;

	this.bubbles = new Array();
	this.y_offset = 0;
	this.y_delay = 0;
	this.pop_state = "dalay";
	this.pop_count = 0;
	this.delay_count = 0;
	this.show_over = false;
	this.button = null;

	this.avatar0 = null;
	this.avatar1 = null;
}

CombatDialogBoard.prototype.addButton = function() {
	var self = this.self;

	self.button.active = false;
	self.button.contains = function(point) {
		var dx = Math.abs(point.x - this.x);
		var dy = Math.abs(point.y - this.y);
		return dx <= this.image.width / 2 && dy <= this.image.height / 2;
	}
	self.button.onClicked = function(point) {
		self.calculator.loser.object.onLose();

		self.reset();
	}
	self.scene.addActor(self.button, self.x, self.y + self.height_max / 2 - self.image.bottom - self.buffer_bottom - self.button.height / 2);
}

CombatDialogBoard.prototype.show = function(object) {
	var self = this.self;

	DialogBoard.prototype.show.call(self, object);
	self.calculator = object;
}

CombatDialogBoard.prototype.reset = function() {
	var self = this.self;
	
	self.bubbles = new Array();
	self.y_offset = 0;
	self.y_delay = 0;
	self.pop_state = "dalay";
	self.pop_count = 0;
	self.delay_count = 0;
	self.show_over = false;

	self.button.active = false;

		
	self.scene.render_map();
	self.hide();
	self.scene.repaint = true;
}

CombatDialogBoard.prototype.onShow = function() {
	var self = this.self;
	var top = self.y - self.height_max / 2 + self.image.top;
	var left = self.x - self.width_max / 2 + self.image.left;
	var width = self.width_max - self.image.left - self.image.right;
	var height = self.height_max - self.image.top - self.image.bottom;
	self.avatar0 = new Avatar(self.calculator.unit0, "right", left, top + height - Avatar.size, width, Avatar.size);
	self.avatar1 = new Avatar(self.calculator.unit1, "left", left, top, width, Avatar.size);

	self.pop_count = 0;
	self.pop_state = "delay";
	self.show_over = false;

	if(self.button == null) {
		self.button = new GameButton("确  定");
		self.addButton();
	}

	self.scene.repaint = false;
}

CombatDialogBoard.prototype.onEnterRecord = function(record) {
	//record.dst.HP -= record.damage;
}

CombatDialogBoard.DelayInterval = 0.5;

CombatDialogBoard.prototype.update_on_show = function(dt) {
	var self = this.self;

	self.avatar0.update(dt);
	self.avatar1.update(dt);

	if(self.pop_state == "pop") {
		if(self.calculator.isFinished) {
			if(!self.show_over) {
				self.onShowOver();
				self.show_over = true;
			}
			return;
		}

		var record = self.calculator.Calculate();
		var bubble = new TextBubble(record.text, self.buffer.width);
		self.bubbles.push(bubble);
		bubble.render_self();
		self.y_offset += bubble.height + CombatDialogBoard.BubbleGap;
		self.onEnterRecord(record);
		self.pop_count++;
		if(self.calculator.isFinished) {
			self.y_offset += self.button.height;
			console.log(self.y_offset + "," + self.y_delay);
		}
		self.pop_state = "showing";
	} else if (self.pop_state == "showing") {
		if(self.y_delay <= self.y_offset) {
			self.y_delay += 150 * dt;
			self.y_delay = Math.min(self.y_offset, self.y_delay);

			if(self.y_delay >= self.y_offset) {
				if(self.calculator.isFinished) {
					if(!self.show_over) {
						self.onShowOver();
						self.show_over = true;
					}
					
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
	self.avatar1.render(ctx);

	self.avatar0.render(ctx);

	self.buffer_context.clearRect(0, 0, self.buffer.width, self.buffer.height);

	var height_count = 0;
	for(var i = 0; i < self.bubbles.length; i++) {
		var y = height_count + self.buffer.height - self.y_delay;
		if(y < self.buffer.height && y + self.bubbles[i].height > 0) {
			self.buffer_context.drawImage(self.bubbles[i].buffer, 0, y);
		}
		height_count += self.bubbles[i].height + CombatDialogBoard.BubbleGap;
	}

	ctx.drawImage(self.buffer, left + self.buffer_left, top + self.buffer_top);
}

CombatDialogBoard.prototype.onShowOver = function(ctx) {
	var self = this.self;

	self.button.active = true;
}