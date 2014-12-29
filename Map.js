function Map() {
	base(this, Scene, arguments);

	this.buffer = document.createElement("canvas");
	this.buffer.width = this.width + 80 * 2;
	this.buffer.height = this.height + 80 * 2;
	this.buffer_context = this.buffer.getContext("2d");

	Bitmap.load("Bush_Small.png");
	Bitmap.load("Slate.png");
	Bitmap.load("Grass.png");
	Bitmap.load("Box.png");
	Bitmap.load("Enemy.png");
	Bitmap.load("AvatarFrame.png");
	Bitmap.load("BarFrame.png");
	Bitmap.load("BarFill.png");
	Bitmap.load("Bubble_filled.png");
	Bitmap.load("TextBubble.png");
	Bitmap.load("Button.png");
	Bitmap.load("TripleStrike.png");
}

Map.prototype.start = function() {
	var self = this.self;

	this.tiles = new Array();
	for(var i = 0; i < 5; i++) {
		this.tiles[i] = new Array();
		for(var j = 0; j < 9; j++) {
			if(Math.random() * 100 < 10) {
				this.tiles[i][j] = new Tile("Bush_Small");
			} else if(Math.random() * 100 < 5) {
				this.tiles[i][j] = new Tile("Slate");
			} else {
				this.tiles[i][j] = new Tile("Grass");
			}
		}
	}

	this.tiles[2][4] = new Tile("Grass");
	this.tiles[2][4].setObject(new Enemy());

	self.render_map();

	this.hero = new Hero();
	this.hero.x = 2 * 80 + 40;
	this.hero.y = 6 * 80 + 10;
	this.addActor(this.hero);
	this.tiles[2][7] = new Tile("Grass");

	self.render_map();

	this.dialog_board = new CombatDialogBoard();
	this.dialog_board.x = this.width / 2;
	this.dialog_board.y = this.height / 2;
	this.addActor(this.dialog_board);
	//this.dialog_board.addButton();
}

Map.prototype.render_map = function() {
	var self = this.self;

	for(var i = 0; i < 5; i++) {
		for(var j = 0; j < 9; j++) {
			self.tiles[i][j].render(self.buffer_context, 80 + i * 80, 80 + j * 80);
		}
	}

	for(var i = 0; i < 5; i++) {
		self.tiles[i][7].render(self.buffer_context, 80 + i * 80, 0);
	}
	for(var j = 0; j < 9; j++) {
		self.tiles[4][j].render(self.buffer_context, 0, 80 + j * 80);
	}
	for(var j = 0; j < 9; j++) {
		self.tiles[0][j].render(self.buffer_context,  480, 80 + j * 80);
	}
}

Map.prototype.flip_up = function(){
	var self = this.self;

	var new_line = new Array();
	for(var i = 0; i < 5; i++) {
		if(Math.random() * 100 < 10) {
			new_line[i] = new Tile("Bush_Small");
		} else if(Math.random() * 100 < 5) {
			new_line[i] = new Tile("Slate");
		} else {
			new_line[i] = new Tile("Grass");
			if(Math.random() * 100 < 5) {
				new_line[i].setObject(new Enemy());
			}
		}
	}
	for(var i = 0; i < 5; i++) {
		for(var j = 8; j >= 0; j--) {
			self.tiles[i][j] = self.tiles[i][j - 1];
		}
	}
	for(var i = 0; i < 5; i++) {
		self.tiles[i][0] = new_line[i];
	}
}

Map.prototype.flip = function(direction) {
	var self = this.self;

	switch (direction) {
		case "up": 
			self.flip_up();
			self.render_map();
			break;
		case "left" : 
			var right = new Array();
			for(var j = 0; j < 9; j++) {
				right[j] = self.tiles[4][j];
			}
			for(var i = 4; i >= 1; i--) {
				for(var j = 0; j < 9; j++) {
					self.tiles[i][j] = self.tiles[i - 1][j];
				}
			}
			for(var j = 0; j < 9; j++) {
				self.tiles[0][j] = right[j];
			}
			self.render_map();
			break;
		case "right" : 
			var left = new Array();
			for(var j = 0; j < 9; j++) {
				left[j] = self.tiles[0][j];
			}
			for(var i = 0; i < 4; i++) {
				for(var j = 0; j < 9; j++) {
					self.tiles[i][j] = self.tiles[i + 1][j];
				}
			}
			for(var j = 0; j < 9; j++) {
				self.tiles[4][j] = left[j];
			}
			self.render_map();
			break;
	}
}

Map.prototype.render = function(ctx) {
	var self = this.self;
	ctx.drawImage(this.buffer, -80 + self.hero.step_offset.x, -80 * 2 + self.hero.step_offset.y);
};