function CombatUnit(hp, atk) {
	this.self = this;

	this.HP_max = hp;
	this.HP = this.HP_max;
	this.atk = atk;
	this.target = null;

	if(arguments.length == 2) {
		this.HP = arguments[0];
		this.atk = arguments[1];
	}
}

CombatUnit.prototype.getSkill = function() {
	var self = this.self;

	return new Attack(self);
}