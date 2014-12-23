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

Bar.TextBlur = 1;
Bar.prototype.render = function(ctx) {
	var self = this.self;
	
	if(self.side == "left") {
		ctx.fillStyle = "#664422";
		ctx.fillRect(self.x, self.y, self.width, self.height);
		ctx.fillStyle = "yellow";
		ctx.fillRect(self.x, self.y, self.delay_length >> 0, self.height);
		ctx.drawImage(self.image, 0, 0, self.image.width, self.image.height, self.x, self.y, self.bar_length, self.height);
	} else if(self.side == "right") {
		ctx.fillStyle = "#664422";
		ctx.fillRect(self.x, self.y, self.width, self.height);
		ctx.fillStyle = "yellow";
		ctx.fillRect(self.x + self.width - (self.delay_length + 0.5 >> 0), self.y, (self.delay_length + 0.5 >> 0), self.height);
		ctx.drawImage(self.image, 0, 0, self.image.width, self.image.height, self.x + self.width - self.bar_length, self.y, self.bar_length, self.height);
	}

	ctx.font = "400 " + 12 + "px 微软雅黑";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	var text = (self.delay_length / self.width * self.value_max >> 0) + " / " + self.value_max;
	ctx.fillStyle = "black";
	for(var i = -Bar.TextBlur; i <= Bar.TextBlur; i++) {
		for(var j = -Bar.TextBlur; j <= Bar.TextBlur; j++) {
			ctx.fillText(text, self.x + self.width / 2 + i, self.y + self.height / 2 + j);
		}
	}
	ctx.fillStyle = "white";
	ctx.fillText(text, self.x + self.width / 2, self.y + self.height / 2);
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