function AreaElement(data, colorPercent){
    //x and y are in this.point
    this.data = data;
    this.percent = colorPercent;
}
AreaElement.prototype = new ColorBlock();

AreaElement.prototype.addData = function(dataPiece){
    this.data = dataPiece;
}

AreaElement.prototype.getData = function(){
    return this.data;
}

AreaElement.prototype.setPercent = function(percent){
    this.percent = percent;
}

AreaElement.prototype.setXY = function(){
    this.setPosition(new Point(this.xArray * this.width, 
                                this.yArray * this.height));
}

AreaElement.prototype.findColor = function(){
    var newColor = [];
    for(var i = 0; i < this.maxRGBColor.length; i++){
        newColor.push(Math.floor(this.maxRGBColor[i] -
                        this.maxRGBColor[i] * this.percent));
    }
    var rgbStr = "rgb(" + newColor.join(", ") + ")";
    return rgbStr;
    
}

AreaElement.prototype.draw = function(g){
    g.fillStyle = this.findColor();
    g.fillRect(this.point.getX(), this.point.getY(),
        this.width, this.height);
}