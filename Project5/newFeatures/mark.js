function Mark(min, max){
    this.totalHeight = min - max;
    this.lowest = min;
}
Mark.prototype = new DraggableElement();

Mark.prototype.move = function(position){
    var newY = position.getY() - this.offsetY + this.height/2;
    if(newY <= this.lowest && newY >= this.lowest - this.totalHeight){
        this.point.setY(position.getY() - this.offsetY);
    }
}

Mark.prototype.setLowest = function(min){
    this.lowest = min;
}

Mark.prototype.setTotalHeight = function(totalHeight){
    this.totalHeight = totalHeight;
}

Mark.prototype.getThreshold = function(){
    var numerator = this.lowest - this.point.getY() - this.height/2;
    return numerator / this.totalHeight;
}

//ok
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