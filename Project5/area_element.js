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
        //return "rgb(" + this.maxRGBColor.join(", ") + ")";
        return "rgb(255, 255, 0)";
    }
    
    for( var i = 0; i < this.maxRGBColor.length; i++ ) {
//        newColor.push( Math.floor(this.maxRGBColor[i] -
//                        this.maxRGBColor[i] * this.percent) );
          newColor.push(Math.floor(this.maxRGBColor[i] * this.percent));
    }
    var rgbStr = "rgb(" + newColor.join(", ") + ")";
    return rgbStr;
    
}

AreaElement.prototype.draw = function(g) {
    var colorPercent = this.findColor();
    g.fillStyle = colorPercent;
    g.fillRect(this.point.getX(), this.point.getY(),
        this.width, this.height);
        
    if(this.active){
        var fontSize = 11;
        g.font = fontSize + "px Arial";
        var textName = this.data.getName();
        var textValue = parseFloat(this.data.getValue()).toFixed();
        var longestW = this.findLongestStringLength(g.measureText(textName),
            g.measureText(textValue));
            
        g.fillStyle = "white";
        g.fillRect(this.point.getX()+ this.width, this.point.getY(),
            Math.floor(longestW), fontSize * 2.5);
        g.fillStyle = "black";
        
        g.fillText(textName, this.point.getX() + this.width,
            this.point.getY() + fontSize);
        g.fillText(textValue, this.point.getX() + this.width,
            this.point.getY() + fontSize * 2);

    }
    g.fillStyle = colorPercent;
}

AreaElement.prototype.findLongestStringLength = function(m1, m2){
    if(m1.width > m2.width){
        return m1.width;
    }
    return m2.width;
}