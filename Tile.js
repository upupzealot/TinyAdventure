function Tile(name) {
	this.self = this;

	this.pattern = new Bitmap(name + ".png");

	if(name == "Bush_Small") {
		this.physics = "solid";
	} else {
		this.physics = "free";
	}

	this.object = null;
}

Tile.prototype.render = function(ctx, offset_x, offset_y) {
	var self = this.self;

	ctx.drawImage(self.pattern, offset_x, offset_y);
	if(self.object != null) {
		ctx.drawImage(self.object.pattern, offset_x, offset_y);
	}
}