function AreaElement(data, colorPercent) {
    this.data = data;
    this.percent = colorPercent;
    this.active = false;
}
AreaElement.prototype = new ColorBlock();

AreaElement.prototype.setActive = function(){
    this.active = true;
}

AreaElement.prototype.setDeactive = function(){
    this.active = false;
}

AreaElement.prototype.addData = function(dataPiece) {
    this.data = dataPiece;
}

AreaElement.prototype.getData = function() {
    return this.data;
}

AreaElement.prototype.setPercent = function(percent) {
    this.percent = percent;
}

AreaElement.prototype.setXY = function() {
    this.setPosition( new Point(this.xArray * this.blockSize, 
                                this.yArray * this.blockSize) );
}

AreaElement.prototype.findColor = function() {
    var newColor = [ ];
    if(this.percent > 1){
        return this.maxRGBColor;
    }
    
    for( var i = 0; i < this.maxRGBColor.length; i++ ) {
        newColor.push( Math.floor(this.maxRGBColor[i] -
                        this.maxRGBColor[i] * this.percent) );
    }
    var rgbStr = "rgb(" + newColor.join(", ") + ")";
    return rgbStr;
    
}

AreaElement.prototype.draw = function(g) {
    g.fillStyle = this.findColor();
    g.fillRect(this.point.getX(), this.point.getY(),
        this.width, this.height);
        
    if(this.active){
        g.fillStyle = "white";
        g.fillRect(this.point.getX()+ this.width, this.point.getY(), 50, 20);
        g.fillStyle = "black";
        var fontSize = 11;
        g.font = fontSize + "px Arial";

        g.fillText(parseFloat(this.data.getValue()).toFixed(), 
            this.point.getX() + this.width, 
            this.point.getY() + fontSize);
    }
}