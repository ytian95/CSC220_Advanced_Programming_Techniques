function DraggableElement() {
    this.offsetX;
    this.offsetY;
}
DraggableElement.prototype = new HitTestableElement();

DraggableElement.prototype.findOffset = function(position) {
    this.offsetX = position.getX() - this.point.getX();
    this.offsetY = position.getY() - this.point.getY();
}

DraggableElement.prototype.move = function(position) {
    this.point.setX( position.getX() - this.offsetX );
    this.point.setY( position.getY() - this.offsetY );
}
