function BackgroundImage(){
    this.image = new Image();
}
BackgroundImage.prototype = new Visual();

//file path
BackgroundImage.prototype.loadUrl = function(file){
    this.image.src = file;
}

BackgroundImage.prototype.draw = function(g){
    g.drawImage(this.image, this.point.getX(), this.point.getY(),
            this.width, this.height);
}