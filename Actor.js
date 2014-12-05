function Actor(image) {
	this.self = null;
	this.scene = null;
	this.x = 0;
	this.y = 0;
	this.size = 50;
	this.color = "#FF0000";
	if(image != null) {
		this.image = image;
	} else {
		this.image = new Bitmap();
	}
}

Actor.prototype = {
	update:function(dt) {
		
	},

	render:function(ctx) {
		//ctx.fillStyle = this.color;
		//ctx.beginPath();
		//ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
		//ctx.closePath();
		//ctx.fill();
		ctx.drawImage(this.image, this.x - this.image.width / 2, this.y - this.image.height / 2);
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
