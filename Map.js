function Map() {
	base(this, Scene, arguments);

	for(var i = 0; i < 5; i++) {
		for(var j = 0; j < 8; j++) {
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
			actor.isDirty = true;
			this.addActor(actor);
		}
	}

	var hero = new Hero();
	hero.x = 2 * 80 + 40;
	hero.y = 6 * 80 + 10;

	this.addActor(hero);
}

Map.prototype.render = function() {};