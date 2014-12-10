function Map() {
	base(this, Scene, arguments);

	this.buffer = document.createElement("canvas");
	this.buffer.width = this.width + 80 * 2;
	this.buffer.height = this.height + 80;
	this.buffer_context = this.buffer.getContext("2d");

	Bitmap.load("Bush_Small.png");
	Bitmap.load("Slate.png");
	Bitmap.load("Tile.png");

	this.hero = new Hero();
	this.hero.x = 2 * 80 + 40;
	this.hero.y = 6 * 80 + 10;

	this.addActor(this.hero);
}

Map.prototype.start = function() {
	var self = this.self;

	self.buffer_context.save();
	self.buffer_context.translate(80, 80);
	for(var i = 0; i < 5; i++) {
		for(var j = 0; j < 8; j++) {
			var file_name = null;
			if(Math.random() * 100 < 10) {
				self.buffer_context.drawImage(Bitmap.pool["Bush_Small.png"], i * 80, j * 80);
			} else if(Math.random() * 100 < 5) {
				self.buffer_context.drawImage(Bitmap.pool["Slate.png"], i * 80, j * 80);
			} else {
				self.buffer_context.drawImage(Bitmap.pool["Tile.png"], i * 80, j * 80);
			}
		}
	}
	self.buffer_context.restore();

	self.buffer_context.drawImage(self.buffer, 80, 640, 400, 80, 80, 0, 400, 80);
	self.buffer_context.drawImage(self.buffer, 80, 80, 80, 640, 480, 80, 80, 640);
	self.buffer_context.drawImage(self.buffer, 400, 80, 80, 640, 0, 80, 80, 640);
}

Map.prototype.flip = function(direction) {
	var self = this.self;

	var current_time = new Date().getTime();
	switch (direction) {
		case "up": 
			self.buffer_context.drawImage(self.buffer, 80, 0, self.width, self.height, 80, 80, self.width, self.height);
			self.buffer_context.drawImage(self.buffer, 80, self.height, self.width, 80, 80, 0, self.width, 80);
			break;
		case "left" : 
			self.buffer_context.drawImage(self.buffer, 80, 0);
			self.buffer_context.drawImage(self.buffer, 80, 0, 80, 640, 480, 0, 80, 640);
			self.buffer_context.drawImage(self.buffer, 400, 0, 80, 640, 0, 0, 80, 640);
			break;
		case "right" : 
			self.buffer_context.drawImage(self.buffer, -80, 0);
			self.buffer_context.drawImage(self.buffer, 80, 0, 80, 640, 480, 0, 80, 640);
			self.buffer_context.drawImage(self.buffer, 400, 0, 80, 640, 0, 0, 80, 640);
			break;
	}
	Screen.flip_cost = new Date().getTime() - current_time;
}

Map.prototype.render = function(ctx) {
	var self = this.self;
	//ctx.drawImage(this.buffer, 80, 0, 400, 640, 0, 0, 400, 640);
	ctx.drawImage(this.buffer, -80 + self.hero.step_offset.x, -80 + self.hero.step_offset.y);
};