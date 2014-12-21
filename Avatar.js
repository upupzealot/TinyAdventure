function Avatar(object) {
	this.self = this;

	this.avatar_frame = new NinePatch("AvatarFrame.png", 24, 24, 23, 23);

	this.bar_frame = new NinePatch("BarFrame.png", 8, 8, 12, 12);
	this.bar_frame.inset.top = 6; this.bar_frame.inset.bottom = 6;
	this.bar_frame.inset.left = 7; this.bar_frame.inset.right = 7;
	this.bar_fill = new Bitmap("BarFill.png");

	
	this.object = object;
}

Avatar.size = 75;
Avatar.inset = 9;
Avatar.bar_height = 35;

Avatar.prototype.render = function(ctx, x, y, width, height, side) {
	var self = this.self;

	if(side == "left") {
		var	bar_length_max = width - Avatar.size - self.bar_frame.inset.right;
		var bar_length = bar_length_max * self.object.HP / self.object.HP_max;
		ctx.drawImage(self.bar_fill, 0, 0, self.bar_fill.width, self.bar_fill.height, x + Avatar.size, y + self.bar_frame.inset.top, bar_length, Avatar.bar_height - self.bar_frame.inset.top - self.bar_frame.inset.bottom);
		self.bar_frame.render(ctx, x + Avatar.size / 2, y, width - Avatar.size / 2, Avatar.bar_height);

		ctx.drawImage(self.object.object.avatar_image, x + Avatar.inset, y + Avatar.inset);
		self.avatar_frame.render(ctx, x, y, Avatar.size, Avatar.size);
	} else if(side == "right") {
		var	bar_length_max = width - Avatar.size - self.bar_frame.inset.left;
		var bar_length = bar_length_max * self.object.HP / self.object.HP_max;
		ctx.drawImage(self.bar_fill, 0, 0, self.bar_fill.width, self.bar_fill.height, x + self.bar_frame.inset.left + bar_length_max - bar_length, y + self.bar_frame.inset.top, bar_length, Avatar.bar_height - self.bar_frame.inset.top - self.bar_frame.inset.bottom);
		self.bar_frame.render(ctx, x, y, width - Avatar.size / 2, Avatar.bar_height);

		ctx.drawImage(self.object.object.avatar_image, x + width - Avatar.size + Avatar.inset, y + Avatar.inset);
		self.avatar_frame.render(ctx, x + width - Avatar.size, y, Avatar.size, Avatar.size);
	}
}