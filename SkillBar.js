function SkillBar(unit) {
	this.self = this;

	this.unit = unit;
}

SkillBar.Gap = 5;

SkillBar.prototype.render = function(ctx, x, y, width, height) {
	var self = this.self;

	for(var i = 0; i < 4; i++) {
		if(self.unit.skills[i] == null) {
			ctx.fillStyle = "#707070";
			ctx.fillRect(x + (height + SkillBar.Gap) * i, y, height, height);
		} else {
			ctx.drawImage(self.unit.skills[i].icon, x + (height + SkillBar.Gap) * i, y, height, height);
			if(self.unit.skills[i].CD_count != 0) {
				ctx.fillStyle = "#707070";
				ctx.globalAlpha = 0.7;
				ctx.fillRect(x + (height + SkillBar.Gap) * i, y, height, height);
				ctx.globalAlpha = 1;

				ctx.fillStyle = "#FFFFFF";
				ctx.font = "400 " + 12 + "px 微软雅黑";
				ctx.textAlign = "center";
				ctx.textBaseline = "middle";
				ctx.fillText(self.unit.skills[i].CD_count, x + (height + SkillBar.Gap) * i + height / 2, y + height / 2);
			}
		}
	}
}