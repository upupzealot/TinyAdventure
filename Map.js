function Map() {
	base(this, Scene, arguments);

	this.buffer = document.createElement("canvas");
	this.buffer.width = this.width + 80 * 2;
	this.buffer.height = this.height + 80;
	this.buffer_context = this.buffer.getContext("2d");

	Bitmap.load("Bush_Small.png");
	Bitmap.load("Slate.png");
	Bitmap.load("Grass.png");
	Bitmap.load("Box.png");
	Bitmap.load("Enemy.png");
	//Bitmap.load("Bubble.png");
	Bitmap.load("Bubble_filled.png");
	Bitmap.load("TextBubble.png");
	Bitmap.load("Button.png");
}

Map.prototype.start = function() {
	var self = this.self;

	this.tiles = new Array();
	for(var i = 0; i < 5; i++) {
		this.tiles[i] = new Array();
		for(var j = 0; j < 8; j++) {
			if(Math.random() * 100 < 10) {
				this.tiles[i][j] = new Tile("Bush_Small");
			} else if(Math.random() * 100 < 5) {
				this.tiles[i][j] = new Tile("Slate");
			} else {
				this.tiles[i][j] = new Tile("Grass");
			}
		}
	}

	this.tiles[2][3].setObject(new Enemy());

	var current_time = new Date().getTime();
	self.render_map();
	Screen.flip_cost = new Date().getTime() - current_time;

	this.hero = new Hero();
	this.hero.x = 2 * 80 + 40;
	this.hero.y = 6 * 80 + 10;
	this.addActor(this.hero);

	this.dialog_board = new DialogBoard();
	this.dialog_board.x = this.width / 2;
	this.dialog_board.y = this.height / 2;
	this.addActor(this.dialog_board);
	this.dialog_board.addButton();
}

Map.prototype.render_map = function() {
	var self = this.self;

	for(var i = 0; i < 5; i++) {
		for(var j = 0; j < 8; j++) {
			self.tiles[i][j].render(self.buffer_context, 80 + i * 80, 80 + j * 80);
		}
	}

	for(var i = 0; i < 5; i++) {
		self.tiles[i][7].render(self.buffer_context, 80 + i * 80, 0);
	}
	for(var j = 0; j < 8; j++) {
		self.tiles[4][j].render(self.buffer_context, 0, 80 + j * 80);
	}
	for(var j = 0; j < 8; j++) {
		self.tiles[0][j].render(self.buffer_context,  480, 80 + j * 80);
	}
}

Map.prototype.flip = function(direction) {
	var self = this.self;

	var current_time = new Date().getTime();
	switch (direction) {
		case "up": 
			var bottom = new Array();
			for(var i = 0; i < 5; i++) {
				bottom[i] = self.tiles[i][7];
			}
			for(var i = 0; i < 5; i++) {
				for(var j = 7; j >= 0; j--) {
					self.tiles[i][j] = self.tiles[i][j - 1];
				}
			}
			for(var i = 0; i < 5; i++) {
				self.tiles[i][0] = bottom[i];
			}
			self.render_map();
			break;
		case "left" : 
			var right = new Array();
			for(var j = 0; j < 8; j++) {
				right[j] = self.tiles[4][j];
			}
			for(var i = 4; i >= 1; i--) {
				for(var j = 0; j < 8; j++) {
					self.tiles[i][j] = self.tiles[i - 1][j];
				}
			}
			for(var j = 0; j < 8; j++) {
				self.tiles[0][j] = right[j];
			}
			self.render_map();
			break;
		case "right" : 
			var left = new Array();
			for(var j = 0; j < 8; j++) {
				left[j] = self.tiles[0][j];
			}
			for(var i = 0; i < 4; i++) {
				for(var j = 0; j < 8; j++) {
					self.tiles[i][j] = self.tiles[i + 1][j];
				}
			}
			for(var j = 0; j < 8; j++) {
				self.tiles[4][j] = left[j];
			}
			self.render_map();
			break;
	}
	Screen.flip_cost = new Date().getTime() - current_time;
}

Map.prototype.render = function(ctx) {
	var self = this.self;
	ctx.drawImage(this.buffer, -80 + self.hero.step_offset.x, -80 + self.hero.step_offset.y);
};