function Actor(image) {
	this.self = this;
	this.scene = null;
	this.x = 0;
	this.y = 0;
	this.scale = 1;
	this.alpha = 1;
	if(image != null) {
		this.image = image;
	} else {
		this.image = new Bitmap();
	}

	this.active = true;
	this.repaint = true;
}

Actor.prototype = {
	update:function(dt) {
		
	},

	render:function(ctx) {
		var self = this.self;
		if(self.scale == 1) {
			if(self.alpha == 1) {
				ctx.drawImage(self.image, self.x - self.image.width / 2, self.y - self.image.height / 2);
			} else {
				ctx.globalAlpha = self.alpha;
				ctx.drawImage(self.image, self.x - self.image.width / 2, self.y - self.image.height / 2);
				ctx.globalAlpha = 1;
			}
		} else {
			ctx.save();

				ctx.translate(self.x, self.y);
				ctx.scale(self.scale, self.scale);

				if(self.image == null) {ctx.restore();return;}

				if(self.alpha == 1) {
					ctx.drawImage(self.image, -self.image.width / 2, -self.image.height / 2);
				} else {
					ctx.globalAlpha = self.alpha;
					ctx.drawImage(self.image, -self.image.width / 2, -self.image.height / 2);
					ctx.globalAlpha = 1;
				}

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
