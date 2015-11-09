function ColorBlock(xArray, yArray, maxColor) {
    this.xArray = xArray;
    this.yArray = yArray;
    this.maxRGBColor = maxColor;
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

ColorBlock.prototype.setMaxRGBColor = function(RGBColor) {
    this.maxRGBColor = RGBColor;
}

