function CombatCalculator(unit0, unit1) {
	this.self = this;

	this.unit0 = unit0;
	this.unit1 = unit1;

	this.turn_owner = unit0;
	this.turn_target = unit1;
	this.turn = 0;

	this.records = new Array();
	this.winner = null;
	this.loser = null;
	this.isFinished = false;
}

CombatCalculator.prototype.Calculate = function() {
	var self = this.self;

	if(self.isFinished) {
		return;
	}

	var actor = self.turn_owner;
	var enemy = self.turn_target;

	var record = new CombatRecord(actor, enemy, "攻击", actor.atk)
	self.records.push(record);
	enemy.HP -= actor.atk;
	enemy.HP = Math.max(0, enemy.HP);
	self.turn += 0.5;

	self.checkFinished();

	self.turn_owner = enemy;
	self.turn_target = actor;

	return record;
}

CombatCalculator.prototype.checkFinished = function() {
	var self = this.self;

	if((self.unit0.HP <= 0 && self.unit1.HP <= 0) || self.turn >= 25) {
		self.winner = null;
		self.loser = null;
		self.isFinished = true;
	} else if (self.unit0.HP <= 0) {
		self.winner = self.unit1;
		self.loser = self.unit0;
		self.isFinished = true;
	} else if (self.unit1.HP <= 0) {
		self.winner = self.unit0;
		self.loser = self.unit1;
		self.isFinished = true;
	}
	return self.isFinished;
}