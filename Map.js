function Map() {
	base(this, Scene, arguments);

	for(var i = 0; i < 5; i++) {
		for(var j = 0; j < 8; j++) {
			var actor = new Actor(new Bitmap("Tile.png"));
			actor.x = i * 80 + 40;
			actor.y = j * 80 + 40;
			this.addActor(actor);
		}
	}
}

//Map.prototype.render = function() {};