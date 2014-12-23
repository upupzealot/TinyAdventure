function Avatar(unit, side,  x, y, width, height) {
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
	
	this.unit = unit;
	this.hp_bar = null;
	if(this.side == "left") {
		var x = this.x + Avatar.size;
		var y = this.y + this.bar_frame.inset.top;
		var width = this.bar_length_max * this.unit.HP / this.unit.HP_max;
		var height = Avatar.bar_height - this.bar_frame.inset.top - this.bar_frame.inset.bottom;
		this.hp_bar = new Bar(this.unit.HP, this.unit.HP_max, x, y, width, height, this.side);
	} else if(this.side == "right") {
		var width = this.bar_length_max * this.unit.HP / this.unit.HP_max;
		var x = this.x + this.bar_frame.inset.left + this.bar_length_max - width;
		var y = this.y + this.bar_frame.inset.top;
		var height = Avatar.bar_height - this.bar_frame.inset.top - this.bar_frame.inset.bottom;
		this.hp_bar = new Bar(this.unit.HP, this.unit.HP_max, x, y, width, height, this.side);
	}
	this.delay_length = this.bar_length_max * this.unit.HP / this.unit.HP_max;
}

Avatar.size = 75;
Avatar.inset = 9;
Avatar.bar_height = 35;

Avatar.prototype.render = function(ctx) {
	var self = this.self;

	if(self.side == "left") {
		self.hp_bar.render(ctx);
		self.bar_frame.render(ctx, self.x + Avatar.size / 2, self.y, self.width - Avatar.size / 2, Avatar.bar_height);

		ctx.drawImage(self.unit.object.avatar_image, self.x + Avatar.inset, self.y + Avatar.inset);
		self.avatar_frame.render(ctx, self.x, self.y, Avatar.size, Avatar.size);
	} else if(self.side == "right") {
		self.hp_bar.render(ctx);
		self.bar_frame.render(ctx, self.x, self.y, self.width - Avatar.size / 2, Avatar.bar_height);

		ctx.drawImage(self.unit.object.avatar_image, self.x + self.width - Avatar.size + Avatar.inset, self.y + Avatar.inset);
		self.avatar_frame.render(ctx, self.x + self.width - Avatar.size, self.y, Avatar.size, Avatar.size);
	}
}

Avatar.prototype.update = function(dt) {
	var self = this.self;

	self.hp_bar.value = self.unit.HP;
	self.hp_bar.value_max = self.unit.HP_max;
	self.hp_bar.update(dt);
}