function Map() {
	base(this, Scene, arguments);

	this.buffer = document.createElement("canvas");
	this.buffer.width = this.width;
	this.buffer.height = this.height;
	this.buffer_context = this.buffer.getContext("2d");

	Bitmap.load("Bush_Small.png");
	Bitmap.load("Slate.png");
	Bitmap.load("Tile.png");

	var hero = new Hero();
	hero.x = 2 * 80 + 40;
	hero.y = 6 * 80 + 10;

	this.addActor(hero);
}

Map.prototype.start = function() {
	for(var i = 0; i < 5; i++) {
		for(var j = 0; j < 8; j++) {
			var file_name = null;
			if(Math.random() * 100 < 10) {
				this.buffer_context.drawImage(Bitmap.pool["Bush_Small.png"], i * 80, j * 80);
			} else if(Math.random() * 100 < 5) {
				this.buffer_context.drawImage(Bitmap.pool["Slate.png"], i * 80, j * 80);
			} else {
				this.buffer_context.drawImage(Bitmap.pool["Tile.png"], i * 80, j * 80);
			}
			//var Tile = new Bitmap(file_name);
			//btx.drawImage(Tile, i * 80, j * 80);

			/*
			var actor = null;
			if(Math.random() * 100 < 10) {
				actor = new Actor(new Bitmap("Bush_Small.png"));
			} else if(Math.random() * 100 < 5) {
				actor = new Actor(new Bitmap("Slate.png"));
			} else {
				actor = new Actor(new Bitmap("Tile.png"));
			}
			actor.x = i * 80 + 40;
			actor.y = j * 80 + 40;
			this.addActor(actor);
			*/
		}
	}
}

Map.prototype.render = function(ctx) {
	ctx.drawImage(this.buffer, 0, 0);
};