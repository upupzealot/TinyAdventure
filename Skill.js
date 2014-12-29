function Skill(caster) {
	this.self = this;

	this.caster = caster;
	this.target = caster.target;
	this.name = "技能";

	this.CD = 0;
	this.CD_count = 0;
}


Skill.prototype.cast = function() {
	
}

Skill.prototype.enterTurn = function() {
	var self = this.self;

	self.CD_count--;
	self.CD_count = Math.max(0, self.CD_count);
}
