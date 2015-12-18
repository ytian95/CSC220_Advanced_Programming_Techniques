function ColorBlock(xArray, yArray, maxColor, block) {
    this.xArray = xArray;
    this.yArray = yArray;
    this.maxRGBColor = maxColor;
    this.blockSize = block;
    this.widthRatio;
    this.heightRatio;
}
ColorBlock.prototype = new DraggableElement();

ColorBlock.prototype.getXArray = function() {
    return this.xArray;
}

ColorBlock.prototype.getYArray = function() {
    return this.yArray;
}

ColorBlock.prototype.setXArray = function(xArray) {
    this.xArray = xArray;
}

ColorBlock.prototype.setYArray = function(yArray) {
    this.yArray = yArray;
}

ColorBlock.prototype.setWidthRatio = function(widthRatio){
    this.widthRatio = widthRatio;
}

ColorBlock.prototype.setHeightRatio = function(heightRatio){
    this.heightRatio = heightRatio;
}

ColorBlock.prototype.setMaxRGBColor = function(RGBColor) {
    this.maxRGBColor = RGBColor;
}

ColorBlock.prototype.setBlockSize = function(block) {
    this.blockSize = block;
}
