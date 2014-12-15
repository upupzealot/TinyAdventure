function Enemy() {
	this.pattern = new Bitmap("Enemy.png");

	this.combat_unit = new CombatUnit();
	this.combat_unit.name = "Enemy";
}