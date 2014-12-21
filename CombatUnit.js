function CombatUnit(hp, atk) {
	this.HP_max = hp;
	this.HP = this.HP_max;
	this.atk = atk;

	if(arguments.length == 2) {
		this.HP = arguments[0];
		this.atk = arguments[1];
	}
}