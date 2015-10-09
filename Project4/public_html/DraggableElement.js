function DraggableElement(){
    this.offsetX;
    this.offsetY;
    this.isDragged = false;
}
DraggableElement.prototype = new HitTestableElement();

DraggableElement.prototype.findOffset = function(position){
    this.offsetX = position.getX() - this.point.getX();
    this.offsetY = position.getY() - this.point.getY();
}

DraggableElement.prototype.move = function(position){
    if(this.isDragged){
        this.point.setX(position.getX() - this.offsetX);
        this.point.setY(position.getY() - this.offsetY);
    }
}

DraggableElement.prototype.activateDraggableElement = function(){
    this.isDragged = true;
}

DraggableElement.prototype.deactivateDraggableElement = function(){
    this.isDragged = false;
}