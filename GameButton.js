function GameButton(text) {
	base(this, Actor, []);

	this.self = this;

	this.text = text;

	this.image = document.createElement("canvas");
	this.buffer_context = this.image.getContext("2d");
	this.buffer_context.font = "600 " + GameButton.FontSize + "px 微软雅黑";

	this.skin = new NinePatch("Button.png", 23, 23, 23, 23);
	this.init();
}

GameButton.FontSize = 16;
GameButton.LineHeight = GameButton.FontSize;
GameButton.prototype.init = function() {
	var self = this.self;

	self.width = self.buffer_context.measureText(self.text).width + self.skin.left + self.skin.right;
	self.image.width = self.width;
	self.height = GameButton.LineHeight + 5 + self.skin.top + self.skin.bottom;
	self.image.height = self.height;

	self.buffer_context = self.image.getContext("2d");
	self.buffer_context.font = "600 " + GameButton.FontSize + "px 微软雅黑";
	self.buffer_context.textAlign = "left";
	self.buffer_context.textBaseline = "top";
	self.buffer_context.fillStyle = "#FFFFFF";

	self.render_self();
}

GameButton.prototype.render_self = function() {
	var self = this.self;

	self.skin.render(self.buffer_context, 0, 0, self.width, self.height);
	//self.buffer_context.fillRect(0, 0, self.width, self.height);
	self.buffer_context.fillText(self.text, self.skin.left, self.skin.top);
}