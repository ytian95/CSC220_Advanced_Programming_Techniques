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
    g.lineWidth = this.strokeThickness.toString();
    g.strokeStyle = this.strokeColor;
    g.fillStyle = this.fillColor;
    g.beginPath();
    g.rect(this.point.getX(), this.point.getY(),
        this.width, this.height);
    g.fill();
    g.stroke();
}

function Circle(){
    
}
Circle.prototype = new Shape();

Circle.prototype.drawPath = function(g){
    g.lineWidth = this.strokeThickness.toString();
    g.strokeStyle = this.strokeColor;
    g.fillStyle = this.fillColor;
    g.beginPath();
    TOOLS.drawEllipse(g, this.point.getX(), this.point.getY(),
        this.width, this.height);
    g.fill();
    g.stroke();
}

function Triangle(){
    
}
Triangle.prototype = new Shape();

Triangle.prototype.drawPath = function(g){
    var x = this.point.getX();
    var y = this.point.getY();
    
    g.lineWidth = this.strokeThickness.toString();
    g.strokeStyle = this.strokeColor;
    g.fillStyle = this.fillColor;
    g.beginPath();
    g.moveTo(x, y + this.height);
    g.lineTo(x + this.width, y + this.height);
    g.lineTo(x + this.width/2, y);
    g.lineTo(x, y + this.height);
    g.fill();
    g.stroke();
}