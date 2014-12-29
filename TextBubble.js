function TextBubble(text, width) {
	this.self = this;

	this.text = text;
	this.width = width;

	this.buffer = document.createElement("canvas");

	this.skin = new NinePatch("TextBubble.png", 13, 13, 13, 13);
	this.init();
}

TextBubble.FontSize = 16;
TextBubble.LineHeight = TextBubble.FontSize;
TextBubble.LineGap = 5;
TextBubble.prototype.init = function() {
	var self = this.self;

	self.buffer_context = self.buffer.getContext("2d");
	self.buffer_context.font = "600 " + TextBubble.FontSize + "px 微软雅黑";
	var content = self.buffer_context.wrapColorText(self.text, self.width - self.skin.left - self.skin.right);
	self.height = content.lines.length * (TextBubble.LineHeight + TextBubble.LineGap);
	self.height += self.skin.top + self.skin.bottom;

	self.buffer.width = self.width;
	self.buffer.height = self.height;

	self.buffer_context = self.buffer.getContext("2d");
	self.buffer_context.font = "600 " + TextBubble.FontSize + "px 微软雅黑";
	self.buffer_context.textAlign = "left";
	self.buffer_context.textBaseline = "top";
	self.color = "#443311";
	self.buffer_context.fillStyle = self.color;


	self.skin.render(self.buffer_context, 0, 0, self.width, self.height);
	var x = self.skin.left;
	var y = self.skin.top;
	for(var j = 0; j < content.lines.length; j++) {
		for(var i = 0; i < content.lines[j].length; i++) {
			if(content.marks[j][i] != null && content.marks[j][i] != "null") {
				if(content.marks[j][i] == "/") {
					self.buffer_context.fillStyle = self.color;
				} else {
					self.buffer_context.fillStyle = content.marks[j][i];
				}
			}
			self.buffer_context.fillText(content.lines[j][i], x, y);
			x += self.buffer_context.measureText(content.lines[j][i]).width;
		}
		y += TextBubble.LineHeight + TextBubble.LineGap;
		x = self.skin.left;
	}
}