function TripleStrike() {
	base(this, Skill, arguments);
	this.name = "三连击";
	this.icon = new Bitmap("TripleStrike.png");
	this.CD = 3;
}

TripleStrike.prototype.cast = function() {
	var self = this.self;
	self.target.HP -= self.caster.atk * 3;
	self.target.HP = Math.max(0, self.target.HP);
	return new CombatRecord(self.caster, self.target, self.name, self.caster.atk * 3);
}