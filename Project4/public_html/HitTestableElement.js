function HitTestableElement(){
    
}
HitTestableElement.prototype = new Visual();

//using the width and height from visual to hit test
HitTestableElement.prototype.hitTest = function(p){
    if((p.getX() >= this.point.getX() &&
            p.getX() <= this.point.getX() + this.width) &&
       (p.getY() >= this.point.getY() &&
            p.getY() <= this.point.getY() + this.height)){
        return true;
            }
    return false;
}