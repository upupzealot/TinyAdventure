function Bitmap() {
	var file_name = null;
	if(arguments.length == 0) {
		file_name = 'icon.png';
	} else if(arguments.length == 1) {
		file_name = arguments[0];
	}

	return Bitmap.load(file_name);
}


Bitmap.need_to_load = 0;
Bitmap.already_loaded = 0;
Bitmap.LoadedAll = function() {
	return Bitmap.already_loaded == Bitmap.need_to_load;
}

Bitmap.pool = new Array();
Bitmap.load = function(file_name) {
	var image;
	if(Bitmap.pool[file_name] == null) {
		image = new Image();
		image.src = "images/" + file_name;
		Bitmap.need_to_load++;
		image.onload = function() {
			Bitmap.already_loaded++;
		}
		Bitmap.pool[file_name] = image;
	} else {
		image = Bitmap.pool[file_name];
	}
	return image;
}

