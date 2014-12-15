function CombatField(unit0, unit1) {
	this.self = this;

	this.unit0 = unit0;
	this.unit1 = unit1;

	this.turn = 0;
}

CombatField.prototype.Calculate = function() {
	var self = this.self;

	var records = new Array();
	var record_num = 0;
	while(!self.isFinished()) {
		records[record_num] = self.unit0.name + "攻击了" + self.unit1.name + "，造成了" + self.unit0.atk + "点伤害。"
		self.unit1.HP -= self.unit0.atk;
		self.unit1.HP = Math.max(0, self.unit1.HP);
		record_num++;
		records[record_num] = self.unit1.name + "攻击了" + self.unit0.name + "，造成了" + self.unit1.atk + "点伤害。"
		self.unit0.HP -= self.unit1.atk;
		self.unit0.HP = Math.max(0, self.unit0.HP);
		record_num++;
		self.turn++;
	}

	return records;
}

CombatField.prototype.isFinished = function() {
	var self = this.self;

	return self.unit0.HP <= 0 || self.unit1.HP <= 0 || self.turn >= 25;
}