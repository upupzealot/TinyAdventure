function NinePatch(filename, top, bottom, left, right) {
	this.self = this;

	this.image = new Bitmap(filename);

	this.top = top;
	this.bottom = bottom;
	this.left = left;
	this.right = right;

	this.inset = new Array();
}

NinePatch.prototype.render = function(ctx, left, top, width, height) {
	var self = this.self;

	ctx.drawImage(self.image, 0, 0, self.left, self.top, left, top, self.left, self.top);
	ctx.drawImage(self.image, self.left, 0, self.image.width - self.left - self.right, self.top, left + self.left, top, width - self.left - self.right, self.top);
	ctx.drawImage(self.image, self.image.width - self.right, 0, self.right, self.top, left + width - self.right, top, self.right, self.top);

	ctx.drawImage(self.image, 0, self.top, self.left, self.image.height - self.top - self.bottom, left, top + self.top, self.left, height - self.top - self.bottom);
	ctx.drawImage(self.image, self.left, self.top, self.image.width - self.left - self.right, self.image.height - self.top - self.bottom, left + self.left, top + self.top, width - self.left - self.right, height - self.top - self.bottom);
	ctx.drawImage(self.image, self.image.width - self.right, self.top, self.right, self.image.height - self.top - self.bottom, left + width - self.right, top + self.top, self.right, height - self.top - self.bottom);

	ctx.drawImage(self.image, 0, self.image.height - self.bottom, self.left, self.bottom, left, top + height - self.bottom, self.left, self.bottom);
	ctx.drawImage(self.image, self.left, self.image.height - self.bottom, self.image.width - self.left - self.right, self.bottom, left + self.left, top + height - self.bottom, width - self.left - self.right, self.bottom);
	ctx.drawImage(self.image, self.image.width - self.right, self.image.height - self.bottom, self.right, self.bottom, left + width - self.right, top + height - self.bottom, self.right, self.bottom);
}

NinePatch.prototype.center_render = function(ctx, left, top, width, height) {
	var self = this.self;

	//ctx.drawImage(self.image, 0, 0, self.left, self.top, left, top, self.left, self.top);
	//ctx.drawImage(self.image, self.left, 0, self.image.width - self.left - self.right, self.top, left + self.left, top, width - self.left - self.right, self.top);
	//ctx.drawImage(self.image, self.image.width - self.right, 0, self.right, self.top, left + width - self.right, top, self.right, self.top);

	//ctx.drawImage(self.image, 0, self.top, self.left, self.image.height - self.top - self.bottom, left, top + self.top, self.left, height - self.top - self.bottom);
	ctx.drawImage(self.image, self.left, self.top, self.image.width - self.left - self.right, self.image.height - self.top - self.bottom, left + self.left, top + self.top, width - self.left - self.right, height - self.top - self.bottom);
	//ctx.drawImage(self.image, self.image.width - self.right, self.top, self.right, self.image.height - self.top - self.bottom, left + width - self.right, top + self.top, self.right, height - self.top - self.bottom);

	//ctx.drawImage(self.image, 0, self.image.height - self.bottom, self.left, self.bottom, left, top + height - self.bottom, self.left, self.bottom);
	//ctx.drawImage(self.image, self.left, self.image.height - self.bottom, self.image.width - self.left - self.right, self.bottom, left + self.left, top + height - self.bottom, width - self.left - self.right, self.bottom);
	//ctx.drawImage(self.image, self.image.width - self.right, self.image.height - self.bottom, self.right, self.bottom, left + width - self.right, top + height - self.bottom, self.right, self.bottom);
}