function CombatRecord(src, dst, skill, damage) {
	this.text;
	this.src = src;
	this.dst = dst;
	this.skill = skill;
	this.damage = damage;

	if(skill == "攻击") {
		this.text = this.src.name + "攻击了" + this.dst.name + "，造成了" + this.src.atk + "点伤害。"
	} else {
		this.text = this.src.name + "对" + this.dst.name + "发动了" + this.skill + "，造成了" + this.src.atk + "点伤害。"
	}
} 