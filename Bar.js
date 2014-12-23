function Bar(value, value_max, x, y, width, height, side) {
	this.self = this;

	this.value = value;
	this.value_max = value_max;

	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;

	this.side = side;

	this.image = new Bitmap("BarFill.png");

	this.bar_length = this.width * this.value / this.value_max;
	this.delay_length = this.bar_length;
}

Bar.prototype.render = function(ctx) {
	var self = this.self;
	ctx.fillStyle = "yellow";
	if(self.side == "left") {
		ctx.fillRect(self.x, self.y, self.delay_length >> 0, self.height);
		ctx.drawImage(self.image, 0, 0, self.image.width, self.image.height, self.x, self.y, self.bar_length, self.height);
	} else if(self.side == "right") {
		ctx.fillRect(self.x + self.width - (self.delay_length + 0.5 >> 0), self.y, (self.delay_length + 0.5 >> 0), self.height);
		ctx.drawImage(self.image, 0, 0, self.image.width, self.image.height, self.x + self.width - self.bar_length, self.y, self.bar_length, self.height);
	}
	
}

Bar.prototype.update = function(dt) {
	var self = this.self;

	self.bar_length = self.width * self.value / self.value_max;

	if(self.delay_length < self.bar_length) {
		self.delay_length = self.bar_length;
	} else if(self.delay_length > self.bar_length) {
		self.delay_length -= dt * 50;
		self.delay_length = Math.max(self.bar_length, self.delay_length);
	}
}