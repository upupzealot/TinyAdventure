function base (child_instance, parent_class, arguments) {
	parent_class.apply(child_instance, arguments);

	for(var prop in parent_class.prototype) {
		var proto = child_instance.constructor.prototype;
		if(!proto[prop]) {
			proto[prop] = parent_class.prototype[prop];
		}
		//proto[prop]["super"] = parent_class.prototype;
	}
	child_instance.super = parent_class;
}

Math.easeOutBack = function(start, end, value){
		var s = 1.70158;
		end -= start;
		value = (value) - 1;
		return end * ((value) * value * ((s + 1) * value + s) + 1) + start;
}

Math.easeOutElastic = function(start, end, value){
	/* GFX47 MOD END */
	//Thank you to rafael.marteleto for fixing this as a port over from Pedro's UnityTween
	end -= start;
	
	var d = 1;
	var p = d * 0.3;
	var s = 0;
	var a = 0;
	
	if (value == 0) return start;
	
	if ((value /= d) == 1) return start + end;
	
	if (a == 0 || a < Math.abs(end)){
		a = end;
		s = p * 0.25;
	} 
	else {
		s = p / (2 * Math.PI) * Math.asin(end / a);
	}
	
	return (a * Math.pow(2, -10 * value) * Math.sin((value * d - s) * (2 * Math.PI) / p) + end + start);
}