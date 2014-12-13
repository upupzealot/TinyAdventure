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

	this.active = true;
}

Actor.prototype = {
	update:function(dt) {
		
	},

	render:function(ctx) {
		var self = this.self;
		if(self.scale == 1) {
			ctx.drawImage(self.image, self.x - self.image.width / 2, self.y - self.image.height / 2);
		} else {
			ctx.save();
				ctx.translate(self.x, self.y);
				ctx.scale(self.scale, self.scale);

				if(self.image == null) {ctx.restore();;return;}
				ctx.drawImage(self.image, -self.image.width / 2, -self.image.height / 2);

				ctx.restore();
		}
	},

	contains:function(point) {
		return false;
	},

	onClicked:function() {
		
	},

	onKeyDown:function(keycode) {

	}
};
