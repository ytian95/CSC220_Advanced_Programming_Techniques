function Mark(start, min, max){
    this.totalHeight = min - max;
    this.min = min;
    this.value = ((start-min)/ this.totalHeight);
}
Mark.prototype = new DraggableElement();

Mark.prototype.move = function(position){
    this.point.setY(position.getY() - this.offsetY);
}

Mark.prototype.draw = function(g){
    g.fillStyle = "green";
    g.beginPath();
    g.moveTo(this.point.getX(), this.point.getY());
    g.lineTo(this.point.getX(), this.point.getY() + this.height);
    g.lineTo(this.point.getX() + this.width, this.point.getY() + parseInt(this.height/2));
    g.closePath();
    g.fill();
}

Mark.prototype.resizeCanvas = function(width, height){
    this.setPosition(new Point(width - this.width, height - this.height));
}

Mark.prototype.hitTest = function(position){
    return(HitTestableElement.prototype.hitTest.call(this, position));
}

Mark.prototype.activate = function(position){
    DraggableElement.prototype.activate.call(this, position);
}