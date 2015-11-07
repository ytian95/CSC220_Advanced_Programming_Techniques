function HitTestableElement(){
    
}
HitTestableElement.prototype = new Visual();

HitTestableElement.prototype.hitTest = function(p){
    if((p.getX() >= this.point.getX() &&
            p.getX() <= this.point.getX() + this.width) &&
       (p.getY() >= this.point.getY() &&
            p.getY() <= this.point.getY() + this.height)){
        return true;
            }
    return false;
}