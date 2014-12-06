function Bitmap() {
	var file_name = null;
	if(arguments.length == 0) {
		file_name = 'icon.png';
	}else if(arguments.length == 1) {
		file_name = arguments[0];
	}

	var image;
	if(Bitmap.pool[file_name] == null) {
		image = new Image();
		image.src = "images/" + file_name;
		Bitmap.pool[file_name] = image;
	} else {
		image = Bitmap.pool[file_name];
	}
	return image;
}

Bitmap.pool = new Array();