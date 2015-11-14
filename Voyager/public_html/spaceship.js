function Spaceship(){
    this.imageURL;

}
Spaceship.prototype = new Visual();

Spaceship.prototype.loadURL = function(url){
    this.imageURL = url;
    this.image = new Image();
    this.image.src = this.imageURL;
}

Spaceship.prototype.draw = function(g){
    g.drawImage(this.image, this.position.getX(), this.position.getY(),
                    this.width, this.height);
    
}