function Actor(image) {
	this.self = this;
	this.scene = null;
	this.x = 0;
	this.y = 0;
	this.scale = 1;
	this.color = "#FF0000";
	if(image != null) {
		this.image = image;
	} else {
		this.image = new Bitmap();
	}

	this.isDirty = true;
}

Actor.prototype = {
	update:function(dt) {
		
	},

	render:function(ctx) {
		var self = this.self;
		//if(this.isDirty) {

			//this.isDirty = false;
		//}
		if(self.scale == 1) {
			ctx.drawImage(this.image, this.x - this.image.width / 2, this.y - this.image.height / 2);
		} else {
			ctx.save();
				ctx.translate(self.x, self.y);
				ctx.scale(self.scale, self.scale);

				ctx.drawImage(this.image, -this.image.width / 2, -this.image.height / 2);

				ctx.restore();
		}
	},

	contains:function(mouse) {
		return (mouse.x - this.x) * (mouse.x - this.x) + (mouse.y - this.y) * (mouse.y - this.y) < this.size * this.size;
	},

	onclicked:function() {
		console.log("clicked");
	}
};

Actor.creat = function() {
	var actor = new Actor();
	actor.self = actor;
	return actor;
};
