function FPS() {
	this.self = this;
	this.time_count = 0;
	this.frame_count = 0;
	this.fps = 0;
}
	
FPS.prototype = {
	update:function(dt) {
		var self = this.self;
		self.time_count += dt;
		self.frame_count++;
		if(self.time_count >= 1) {
			self.fps = self.frame_count / self.time_count >> 0;
			self.frame_count = 0;
			self.time_count = 0;
		}
	}
};
