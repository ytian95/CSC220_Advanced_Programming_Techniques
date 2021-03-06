/**
 * A generic class for an AreaElement
 * Holds information about the element relative
 * to a grid
 * @param {Number} xArray
 * @param {Number} yArray
 * @param {Color} maxColor
 * @param {Number} block
 * @returns {ColorBlock}
 */
function ColorBlock(xArray, yArray, maxColor, block) {
    /*
     * The proportional x location
     * @type {Number}
     * @private
     */
    this.xArray = xArray;
    
    /*
     * The proportional y location
     * @type {Number}
     * @private
     */
    this.yArray = yArray;
    
    /*
     * The brightest color gor the pargest percentages
     * @type {Color}
     * @private
     */
    this.maxRGBColor = maxColor;
    
    /*
     * The spacing between each grid point
     * @type {Number}
     * @private
     */
    this.blockSize = block;
    
    /*
     * The amount of grid ticks that the ColorBlock takes up
     * @type {Number}
     * @private
     */
    this.widthRatio;
    
    /*
     * The amount of grid ticks that the ColorBlock takes up
     * @type {Number}
     * @private
     */
    this.heightRatio;
}
ColorBlock.prototype = new DraggableElement();

/**
 * Returns the starting X grid location
 * @returns {Number}
 */
ColorBlock.prototype.getXArray = function() {
    return this.xArray;
}

/**
 * Returns the starting Y grid location
 * @returns {Number}
 */
ColorBlock.prototype.getYArray = function() {
    return this.yArray;
}

/**
 * Sets the starting X proportion location
 * @param {Number} xArray
 * @returns {undefined}
 */
ColorBlock.prototype.setXArray = function(xArray) {
    this.xArray = xArray;
}

/**
 * Sets the starting y proportion location
 * @param {Number} yArray
 * @returns {undefined}
 */
ColorBlock.prototype.setYArray = function(yArray) {
    this.yArray = yArray;
}

/**
 * Sets how many grid spaces the width is
 * @param {Number} widthRatio
 * @returns {undefined}
 */
ColorBlock.prototype.setWidthRatio = function(widthRatio) {
    this.widthRatio = widthRatio;
}

/**
 * Sets how many grid spaces the height is
 * @param {Number} heightRatio
 * @returns {undefined}
 */
ColorBlock.prototype.setHeightRatio = function(heightRatio) {
    this.heightRatio = heightRatio;
}

/**
 * Sets the brightest color (max)
 * @param {Color} RGBColor
 * @returns {undefined}
 */
ColorBlock.prototype.setMaxRGBColor = function(RGBColor) {
    this.maxRGBColor = RGBColor;
}

/**
 * Sets the number of pixels between each grid line
 * @param {Number} block
 * @returns {undefined}
 */
ColorBlock.prototype.setBlockSize = function(block) {
    this.blockSize = block;
}
