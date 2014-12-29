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

	this.unit = unit;
	this.hp_bar = null;
	this.skill_bar = new SkillBar(unit);

	if(side == "left") {
		var x = this.x + Avatar.size;
		var y = this.y + this.bar_frame.inset.top;
		var width = this.width - Avatar.size - this.bar_frame.inset.right;
		var height = Avatar.bar_height - this.bar_frame.inset.top - this.bar_frame.inset.bottom;
		this.hp_bar = new Bar(this.unit.HP, this.unit.HP_max, x, y, width, height, this.side);
	} else if(side == "right") {
		var width = this.width - Avatar.size - this.bar_frame.inset.left;
		var x = this.x + this.bar_frame.inset.left;
		var y = this.y + this.bar_frame.inset.top;
		var height = Avatar.bar_height - this.bar_frame.inset.top - this.bar_frame.inset.bottom;
		this.hp_bar = new Bar(this.unit.HP, this.unit.HP_max, x, y, width, height, this.side);
	}
	this.delay_length = this.bar_length_max * this.unit.HP / this.unit.HP_max;
}

Avatar.size = 75;
Avatar.inset = 9;
Avatar.bar_height = 28;

Avatar.prototype.render = function(ctx) {
	var self = this.self;

	if(self.side == "left") {
		self.hp_bar.render(ctx);
		self.bar_frame.render(ctx, self.x + Avatar.size / 2, self.y, self.width - Avatar.size / 2, Avatar.bar_height);

		ctx.drawImage(self.unit.object.avatar_image, self.x + Avatar.inset, self.y + Avatar.inset);
		self.avatar_frame.render(ctx, self.x, self.y, Avatar.size, Avatar.size);
		self.skill_bar.render(ctx, self.x + Avatar.size + SkillBar.Gap, self.y + Avatar.bar_height + SkillBar.Gap, self.hp_bar.width, Avatar.size - Avatar.bar_height - SkillBar.Gap * 2);
	} else if(self.side == "right") {
		self.hp_bar.render(ctx);
		self.bar_frame.render(ctx, self.x, self.y, self.width - Avatar.size / 2, Avatar.bar_height);

		ctx.drawImage(self.unit.object.avatar_image, self.x + self.width - Avatar.size + Avatar.inset, self.y + Avatar.inset);
		self.avatar_frame.render(ctx, self.x + self.width - Avatar.size, self.y, Avatar.size, Avatar.size);
		var h = Avatar.size - Avatar.bar_height - SkillBar.Gap * 2;
		self.skill_bar.render(ctx, self.x + self.hp_bar.width + self.bar_frame.inset.left - h * 4 - SkillBar.Gap * 4, self.y + Avatar.bar_height + SkillBar.Gap, self.hp_bar.width, h);
	}
}

Avatar.prototype.update = function(dt) {
	var self = this.self;

	self.hp_bar.value = self.unit.HP;
	self.hp_bar.value_max = self.unit.HP_max;
	self.hp_bar.update(dt);
}