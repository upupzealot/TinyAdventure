function ZImage() {}

ZImage.creat = function() {
	var image = new Image();
	if(arguments.length == 0) {
		image.src = 'images/icon.png';
	}else if(arguments.length == 1) {
		
	}
	return image;
}