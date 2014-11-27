function Bubble(size, delay, ring_color) {
	Actor.call(this);
	this.color = "#FF4040";

	this.delay = delay;
	this.animate_count = 0;

	this.size0 = 0;
	this.size1 = size;
	this.size = 0;
	this.size_interval = 0.6;

	this.label = "";
	this.url = "http://www.baidu.com";

	return this;
}

Bubble.prototype = new Actor();

Bubble.prototype.update = function(dt) {
	this.animate_count += dt;
	
}

Bubble.prototype.render = function(ctx) {
	var size_process = (this.animate_count - this.delay) / this.size_interval;
	size_process = Math.max(0, Math.min(size_process, 1));
	size_process = Math.easeOutBack(0, 1, size_process);

	this.size = this.size0 * (1 - size_process) + this.size1 * size_process;

	var x = 1 * (1 - size_process) + 0.3 * size_process;
	this.color = "rgba(255, 255, 255, " + x + ")";
	if(this.contains(mouse)) {
		this.color = "rgba(255, 255, 127, " + x + ")";
	}

	Actor.prototype.render.call(this, ctx);

	var text_interval = 1;
	var text_delay = 0.6;
	if(this.animate_count - this.delay - text_delay > this.size_interval) {
		var font_size = 30;

		var text_height = font_size;
		var text_width = font_size * this.label.length;

		var text_progress = (this.animate_count - this.delay - text_delay - this.size_interval) / text_interval;
		text_progress = Math.max(0, Math.min(text_progress, 1));
		//text_progress = Math.easeOutBack(0, 1, text_progress);
		text_progress = Math.easeOutElastic(0, 1, text_progress);
		var text_scale_x = 0.5 * (1 - text_progress) + 1 * text_progress;
		var text_scale_y = 2 * (1 - text_progress) + 1 * text_progress;

		ctx.save();

		ctx.translate(this.x, this.y);
		ctx.scale(text_scale_x, text_scale_y);

		ctx.font = font_size + "px 黑体";
		ctx.fillStyle = "rgba(255, 255, 255, " + text_progress * 0.5 + ")";
		ctx.fillText(this.label, -text_width / 2, text_height / 2 - 5);

		ctx.restore();
	}
}

Bubble.prototype.onclicked = function() {
	window.location.href=this.url;
}