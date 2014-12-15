function CombatUnit() {
	this.HP = 100;
	this.atk = 10;

	if(arguments.length == 2) {
		this.HP = arguments[0];
		this.atk = arguments[1];
	}
}