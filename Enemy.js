function Enemy() {
	this.self = this;

	this.pattern = new Bitmap("Enemy.png");

	this.combat_unit = new CombatUnit(100, 10);
	this.combat_unit.name = "Enemy";
	this.combat_unit.object = this;
	this.avatar_image = new Bitmap("Avatars/Enemy.png");

	this.tile = null;
}

Enemy.prototype.onLose = function() {
	var self = this.self;

	self.tile.object = null;
}