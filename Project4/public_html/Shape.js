function Shape(){
    this.fillColor;// = fillColor;
    this.strokeColor;// = strokeColor;
    this.strokeThickness;// = strokeThickness;
}
Shape.prototype = new DraggableElement();

Shape.prototype.setFillColor = function(color){
    this.fillColor = color;
}

Shape.prototype.setStrokeColor = function(color){
    this.strokeColor = color;
}

Shape.prototype.setStrokeThickness = function(thickness){
    this.strokeThickness = thickness;
}

Shape.prototype.draw = function(g){
    this.drawPath(g)
}

Shape.prototype.drawPath = function(g){
    
}

function Rectangle(){
    
}
Rectangle.prototype = new Shape();

Rectangle.prototype.drawPath = function(g){
    g.beginPath();
    g.lineWidth = this.strokeThickness.toString();
    g.strokeStyle = this.strokeColor;
    g.fillStyle = this.fillColor;
    g.rect(this.point.getX(), this.point.getY(),
        this.width, this.height);
    g.fill();
    g.stroke();
}