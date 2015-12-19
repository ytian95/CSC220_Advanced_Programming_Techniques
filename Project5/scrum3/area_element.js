function AreaElement(data, colorPercent) {
    this.data = data;
    this.percent = colorPercent;
    this.active = false; //fix oop
}
AreaElement.prototype = new ColorBlock();

AreaElement.prototype.setActive = function() {
    this.active = true;
}

AreaElement.prototype.setDeactive = function() {
    this.active = false;
}

AreaElement.prototype.activate = function(position){
    DraggableElement.prototype.activate.call(this, position);
    this.setActive();
}

AreaElement.prototype.deactivate = function(){
    DraggableElement.prototype.deactivate.call(this);
    this.setDeactive();
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

AreaElement.prototype.setBlockSize = function(block) {
    ColorBlock.prototype.setBlockSize.call(this, block);
    this.updateBlockSpacing();
}

AreaElement.prototype.updateBlockSpacing = function(){
    this.setXY();
    this.width = this.widthRatio * this.blockSize;
    this.height = this.heightRatio * this.blockSize;
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
    g.strokeStyle = "black";
    g.lineWidth = parseInt(window.devicePixelRatio);
    g.beginPath();
    g.rect(this.point.getX(), this.point.getY(),
        this.widthRatio * this.blockSize, this.heightRatio * this.blockSize);
    g.fill();
    g.stroke();
    
    if(this.active) {
        this.drawText(g);
    }
    
    g.fillStyle = colorPercent;
}

AreaElement.prototype.drawText = function(g){
    g.strokeStyle = "black";
    g.lineWidth = 1;
    
    var fontSize = 11;
    g.font = fontSize + "px Arial";
    var textName = this.data.getName();
    var textValue = parseFloat(this.data.getValue()).toFixed();
    var longestW = this.findLongestStringLength(g.measureText(textName),
        g.measureText(textValue));

    g.fillStyle = "white";
    g.beginPath();
    g.rect(this.point.getX()+ this.width, this.point.getY(),
        Math.floor(longestW), fontSize * 2.5);
    g.fill();
    g.stroke();
    
    g.fillStyle = "black";
    g.fillText(textName, this.point.getX() + this.width,
        this.point.getY() + fontSize);
    g.fillText(textValue, this.point.getX() + this.width,
        this.point.getY() + fontSize * 2);
}

AreaElement.prototype.findLongestStringLength = function(m1, m2) {
    if(m1.width > m2.width){
        return m1.width;
    }
    return m2.width;
}