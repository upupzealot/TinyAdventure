function Bitmap() {
	var image = new Image();
	if(arguments.length == 0) {
		image.src = 'images/icon.png';
	}else if(arguments.length == 1) {
		image.src = "images/" + arguments[0];
	}
	return image;
}