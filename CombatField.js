function CombatField(unit0, unit1) {
	this.self = this;

	this.unit0 = unit0;
	this.unit1 = unit1;

	this.turn = 0;

	this.records = null;
	this.winner = null;
	this.loser = null;
}

CombatField.prototype.Calculate = function() {
	var self = this.self;

	self.records = new Array();
	while(!self.isFinished()) {
		self.records.push(self.unit0.name + "攻击了" + self.unit1.name + "，造成了" + self.unit0.atk + "点伤害。");
		self.unit1.HP -= self.unit0.atk;
		self.unit1.HP = Math.max(0, self.unit1.HP);
		if(self.isFinished()) {
			break;
		}
		self.records.push(self.unit1.name + "攻击了" + self.unit0.name + "，造成了" + self.unit1.atk + "点伤害。");
		self.unit0.HP -= self.unit1.atk;
		self.unit0.HP = Math.max(0, self.unit0.HP);
		self.turn++;
	}

	if((self.unit0.HP <= 0 && self.unit1.HP <= 0) || self.turn >= 25) {
		self.winner = null;
		self.loser = null;
	} else if (self.unit0.HP <= 0) {
		self.winner = self.unit1;
		self.loser = self.unit0;
		self.loser.object.onLose();
	} else if (self.unit1.HP <= 0) {
		self.winner = self.unit0;
		self.loser = self.unit1;
		self.loser.object.onLose();
	}
}

CombatField.prototype.isFinished = function() {
	var self = this.self;

	return self.unit0.HP <= 0 || self.unit1.HP <= 0 || self.turn >= 25;
}