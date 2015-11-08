function AreaElement(data, colorPercent){
    //x and y are in this.point
    this.data = data;
    this.percent = colorPercent;
}
AreaElement.prototype = new ColorBlock();

AreaElement.prototype.addData = function(dataPiece){
    this.data = dataPiece;
}

AreaElement.prototype.setPercent = function(percent){
    this.percent = percent;
}

AreaElement.prototype.setXY = function(){
    this.setPosition(new Point(this.xArray * this.width, 
                                this.yArray * this.height));
}

AreaElement.prototype.findColor = function(){
    return "red";
    
}

AreaElement.prototype.draw = function(g){
    g.fillStyle = this.findColor();
    g.rect(this.point.getX(), this.point.getY(),
        this.width, this.height);
    g.fill();
    g.stroke();
}