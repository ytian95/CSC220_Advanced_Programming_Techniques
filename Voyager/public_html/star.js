function Star(){
    this.size;
}
Star.prototype = new Visual();

Star.prototype.getSize = function(){
    return this.size;
}

Star.prototype.setSize = function(size){
    this.size = size;
}

Star.prototype.draw = function(g){
    //draw white circle
    g.beginPath();
    g.arc(this.position.getX(), this.position.getY(), 
            this.size, 0, 2*Math.PI);
    g.fillStyle = "white";
    g.fill();
    g.closePath();
}