function base (child_instance, parent_class, arguments) {
	parent_class.apply(child_instance, arguments);

	for(var prop in parent_class.prototype) {
		var proto = child_instance.constructor.prototype;
		if(!proto[prop]) {
			proto[prop] = parent_class.prototype[prop];
		}
	}
	child_instance.super = parent_class.prototype;
}

CanvasRenderingContext2D.prototype.wrapText = function(text, line_width) {
	if(text == "" || this.measureText(text).width <= line_width) {
		return new Array(text);
	} else {
		var i = 1;
		var substring = "";
		var lines = new Array();
		while(text.length > 0) {
			substring = text.substring(0, i);
			if(this.measureText(substring).width > line_width) {
				lines.push(text.substring(0, i - 1));
				text = text.substring(i - 1, text.length);
				i = 1;
			} else if(i >= text.length){
				lines.push(text);
				break;
			} else {
				i++;
			}
		}
		return lines;
	}
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