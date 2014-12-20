function Enemy() {
	this.self = this;

	this.pattern = new Bitmap("Enemy.png");

	this.combat_unit = new CombatUnit();
	this.combat_unit.name = "Enemy";
	this.combat_unit.object = this;

	this.tile = null;
}

Enemy.prototype.onLose = function() {
	var self = this.self;

	self.tile.object = null;
}