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
	this.color = "#443311";
	this.buffer_context.fillStyle = this.color;
	//this.colors = new Array();

	this.skin = new NinePatch("TextBubble.png", 13, 13, 13, 13);
	this.init();
}

TextBubble.FontSize = 16;
TextBubble.LineHeight = TextBubble.FontSize;
TextBubble.LineGap = 5;
TextBubble.prototype.init = function() {
	var self = this.self;

	var content = self.buffer_context.wrapColorText(self.text, self.width - self.skin.left - self.skin.right);
	self.height = content.lines.length * (TextBubble.LineHeight + TextBubble.LineGap);
	self.height += self.skin.top + self.skin.bottom;
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