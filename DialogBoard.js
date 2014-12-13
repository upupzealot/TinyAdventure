function DialogBoard() {
	base(this, Actor, arguments);

	//this.image = new NinePatch("Bubble.png", 24, 24, 23, 23);
	this.image = new NinePatch("Bubble_filled.png", 24, 24, 23, 23);
	this.active = false;
	this.width = 180;
	this.height = 180;
}

DialogBoard.prototype.show = function() {
	var self = this.self;

	self.active = true;
}

DialogBoard.prototype.hide = function() {
	var self = this.self;

	self.active = false;
	self.scene.hero.stopped = false;
}

//DialogBoard.prototype.update = function(dt) {
//
//}

DialogBoard.prototype.render = function(ctx) {
	var self = this.self;

	self.image.render(ctx, self.x - self.width / 2, self.y - self.height / 2, self.width, self.height);
}

DialogBoard.prototype.contains = function(point) {
	var self = this.self;

	var dx = Math.abs(point.x - self.x);
	var dy = Math.abs(point.y - self.y);
	return dx <= self.width / 2 && dy <= self.height / 2;
}

DialogBoard.prototype.onClicked = function(point) {
	var self = this.self;

	self.hide();
}