function TextBubble(text, width) {
	this.self = this;

	this.text = text;
	this.width = width;

	this.buffer = document.createElement("canvas");
	this.buffer.width = width;
	this.buffer_context = this.buffer.getContext("2d");
	this.buffer_context.font = "600 " + TextBubble.FontSize + "px 微软雅黑";
	this.buffer_context.textAlign = "left";
	this.buffer_context.textBaseline = "top";
	this.init();
}

TextBubble.FontSize = 20;
TextBubble.LineHeight = 20;
TextBubble.LineGap = 5;
TextBubble.prototype.init = function() {
	var self = this.self;

	self.lines = self.buffer_context.wrapText(self.text, self.width);
	if(self.lines.length == 1) {
		self.height = TextBubble.LineHeight;
	} else {
		self.height = TextBubble.LineHeight * self.lines.length + TextBubble.LineGap * self.lines.length;
	}
}

TextBubble.prototype.render_self = function() {
	var self = this.self;

	for(var i = 0; i < self.lines.length; i++) {
		if(i == 0) {
			self.buffer_context.fillText(self.lines[i], 0, 0);
		} else {
			self.buffer_context.fillText(self.lines[i], 0, (TextBubble.LineHeight + TextBubble.LineGap) * i);
		}
	}
}

