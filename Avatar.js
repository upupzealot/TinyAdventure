function Avatar(object, side,  x, y, width, height) {
	this.self = this;

	this.avatar_frame = new NinePatch("AvatarFrame.png", 24, 24, 23, 23);

	this.bar_frame = new NinePatch("BarFrame.png", 8, 8, 12, 12);
	this.bar_frame.inset.top = 6; this.bar_frame.inset.bottom = 6;
	this.bar_frame.inset.left = 7; this.bar_frame.inset.right = 7;
	this.bar_fill = new Bitmap("BarFill.png");

	this.side = side;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;

	this.bar_length_max = 0;
	if(side == "left") {
		this.bar_length_max = this.width - Avatar.size - this.bar_frame.inset.right;
	} else if(side == "right") {
		this.bar_length_max = this.width - Avatar.size - this.bar_frame.inset.left;
	}
	
	this.object = object;
	this.delay_length = this.bar_length_max * this.object.HP / this.object.HP_max;
}

Avatar.size = 75;
Avatar.inset = 9;
Avatar.bar_height = 35;

Avatar.prototype.render = function(ctx) {
	var self = this.self;

	if(self.side == "left") {
		var bar_length = self.bar_length_max * self.object.HP / self.object.HP_max;
		
		ctx.fillStyle = "yellow";
		ctx.fillRect(self.x + Avatar.size, self.y + self.bar_frame.inset.top, self.delay_length >> 0, Avatar.bar_height - self.bar_frame.inset.top - self.bar_frame.inset.bottom);
		ctx.drawImage(self.bar_fill, 0, 0, self.bar_fill.width, self.bar_fill.height, self.x + Avatar.size, self.y + self.bar_frame.inset.top, bar_length, Avatar.bar_height - self.bar_frame.inset.top - self.bar_frame.inset.bottom);
		self.bar_frame.render(ctx, self.x + Avatar.size / 2, self.y, self.width - Avatar.size / 2, Avatar.bar_height);

		ctx.drawImage(self.object.object.avatar_image, self.x + Avatar.inset, self.y + Avatar.inset);
		self.avatar_frame.render(ctx, self.x, self.y, Avatar.size, Avatar.size);
	} else if(self.side == "right") {
		var bar_length = self.bar_length_max * self.object.HP / self.object.HP_max;

		ctx.fillStyle = "yellow";
		ctx.fillRect(self.x + self.bar_frame.inset.left + self.bar_length_max - (self.delay_length >> 0), self.y + self.bar_frame.inset.top, self.delay_length >> 0, Avatar.bar_height - self.bar_frame.inset.top - self.bar_frame.inset.bottom);
		ctx.drawImage(self.bar_fill, 0, 0, self.bar_fill.width, self.bar_fill.height, self.x + self.bar_frame.inset.left + self.bar_length_max - bar_length, self.y + self.bar_frame.inset.top, bar_length, Avatar.bar_height - self.bar_frame.inset.top - self.bar_frame.inset.bottom);
		self.bar_frame.render(ctx, self.x, self.y, self.width - Avatar.size / 2, Avatar.bar_height);

		ctx.drawImage(self.object.object.avatar_image, self.x + self.width - Avatar.size + Avatar.inset, self.y + Avatar.inset);
		self.avatar_frame.render(ctx, self.x + self.width - Avatar.size, self.y, Avatar.size, Avatar.size);
	}
}

Avatar.prototype.update = function(dt) {
	var self = this.self;

	var	bar_length_max;
	var bar_length;
	if(self.side == "left") {
		bar_length_max = self.width - Avatar.size - self.bar_frame.inset.right;
		bar_length = bar_length_max * self.object.HP / self.object.HP_max;
	} else if(self.side == "right") {
		bar_length_max = self.width - Avatar.size - self.bar_frame.inset.left;
		bar_length = bar_length_max * self.object.HP / self.object.HP_max;
	}

	if(self.delay_length < bar_length) {
		self.delay_length = bar_length;
	} else if(self.delay_length > bar_length) {
		self.delay_length -= dt * 50;
		self.delay_length = Math.max(bar_length, self.delay_length);
	}
}