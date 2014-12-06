function Hero() {
	base(this, Actor, arguments);

	this.animate_frames = new Array();
	for(var direction_key in Hero.directions) {
		var direction = Hero.directions[direction_key];
		this.animate_frames[direction] = new Array();

		this.animate_frames[direction]["stand"] = new Array();
		for(var i = 0; i < 4; i++) {
			this.animate_frames[direction]["stand"][i] = new Bitmap("Hero/up_stand_" + i + ".png");
		}
		this.animate_frames[direction]["walk"] = new Array();
		for(var i = 0; i < 8; i++) {
			this.animate_frames[direction]["walk"][i] = new Bitmap("Hero/up_walk_" + i + ".png");
		}
	}

	this.direction = "up";
	this.state = "walk";

	this.image = this.animate_frames["up"]["stand"][0];
	this.scale = 0.8;

	this.animate_count = 0;
	this.animate_interval = 1 / 6;
	this.frame_count = 0;
}

Hero.directions = ["up"];
Hero.states = ["stand", "walk"];

Hero.prototype.update = function(dt) {
	var self = this.self;

	self.animate_count += dt;
	if(self.animate_count >= self.animate_interval) {
		self.animate_count -= self.animate_interval;
		self.frame_count = (++self.frame_count) % self.animate_frames[self.direction][self.state].length;
	}
}

Hero.prototype.render = function(ctx) {
	var self = this.self;

	//console.log(self.frame_count);
	self.image = self.animate_frames[self.direction][self.state][self.frame_count];

	self.super.render.call(self, ctx);
}