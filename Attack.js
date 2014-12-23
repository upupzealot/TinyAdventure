function Attack() {
	base(this, Skill, arguments);
	this.name = "攻击";
}

Attack.prototype.cast = function() {
	var self = this.self;
	self.target.HP -= self.caster.atk;
	self.target.HP = Math.max(0, self.target.HP);
	return new CombatRecord(self.caster, self.target, self.name, self.caster.atk);
}