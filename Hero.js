function Hero() {
	base(this, Actor, arguments);

	this.frames = new Array();
	for(var i = 0; i < 4; i++) {
		frames[i] = new Bitmap("bs_" + (i + 1) + ".png");
	}

	this.image = frames[0];
	this.scale = 0.8;
}