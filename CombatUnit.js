function CombatUnit(hp, atk) {
	this.self = this;

	this.HP_max = hp;
	this.HP = this.HP_max;
	this.atk = atk;
	this.target = null;

	this.skills = new Array();
}

CombatUnit.prototype.setTarget = function(target) {
	var self = this.self;

	self.target = target;
	for(var i = 0; i < 4; i++) {
		if(self.skills[i] != null) {
			return self.skills[i].target = self.target;
		}
	}
	return new Attack(self);
}

CombatUnit.prototype.getSkill = function() {
	var self = this.self;

	for(var i = 0; i < 4; i++) {
		if(self.skills[i] != null && self.skills[i].CD_count == 0) {
			return self.skills[i];
		}
	}
	return new Attack(self);
}

CombatUnit.prototype.enterTurn = function() {
	var self = this.self;

	for(var i = 0; i < 4; i++) {
		if(self.skills[i] != null) {
			self.skills[i].enterTurn();
		}
	}

}