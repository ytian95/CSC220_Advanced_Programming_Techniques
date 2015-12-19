/**
 * Represents a community area of Chicago
 * @param {Dataset} data - Dataset containing the data value and name
 * @param {Number} colorPercent - Percent that should be the base color
 *  the smaller the percent the darker the square is
 * @constructor
 * @returns {AreaElement}
 */
function AreaElement(data, colorPercent) {
    /*
     *@type {Dataset} 
     *@private
     */
    this.data = data;
    
    /*
     * Percent that this data is compared to the whole
     * @type {Number}
     */
    this.percent = colorPercent; 
    
    /*
     * If it has been selected or not
     * @type {Boolean}
     */
    this.active = false; //fix oop
}
AreaElement.prototype = new ColorBlock();

/**
 * Makes the AreaElement Active. When Active, will see details
 * @returns {undefined}
 */
AreaElement.prototype.setActive = function() {
    this.active = true;
}

/**
 * Resets the AreaElement to deactive
 * @returns {undefined}
 */
AreaElement.prototype.setDeactive = function() {
    this.active = false;
}

/**
 * Acts like a draggableElement and then activates itself
 * @param {Point} position
 * @returns {undefined}
 */
AreaElement.prototype.activate = function(position) {
    DraggableElement.prototype.activate.call(this, position);
    this.setActive();
}

/**
 * Acts like a draggableElementa and then deactivates itself
 * @returns {undefined}
 */
AreaElement.prototype.deactivate = function() {
    DraggableElement.prototype.deactivate.call(this);
    this.setDeactive();
}

/**
 * Setter for the dataset
 * @param {Dataset} dataPiece
 * @returns {undefined}
 */
AreaElement.prototype.addData = function(dataPiece) {
    this.data = dataPiece;
}

/**
 * Getter for the dataset
 * @returns {Dataset}
 */
AreaElement.prototype.getData = function() {
    return this.data;
}

/**
 * Setter for the percent
 * @param {Number} percent
 * @returns {undefined}
 */
AreaElement.prototype.setPercent = function(percent) {
    this.percent = percent;
}

/**
 * Updates the blockspacing and then updates the area element's
 * relative position to other area elements
 * @param {Number} block
 * @returns {undefined}
 */
AreaElement.prototype.setBlockSize = function(block) {
    ColorBlock.prototype.setBlockSize.call(this, block);
    this.updateBlockSpacing();
}

/**
 * updates the areaElement's width and height
 * @returns {undefined}
 */
AreaElement.prototype.updateBlockSpacing = function() {
    this.setXY();
    this.width = this.widthRatio * this.blockSize;
    this.height = this.heightRatio * this.blockSize;
}

/**
 * resets to default location
 * @returns {undefined}
 */
AreaElement.prototype.setXY = function() {
    this.setPosition( new Point(this.xArray * this.blockSize, 
                                this.yArray * this.blockSize) );
}

/**
 * Finds the color based on the given percentage
 * @returns {String}
 */
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

/**
 * Draws the area element. If it is active, then aldo draw it's name
 * and data associated
 * @param {Canvas} g
 * @returns {undefined}
 */
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

/**
 * Draws the name and data value of the element
 * @param {Canvas} g
 * @returns {undefined}
 */
AreaElement.prototype.drawText = function(g) {
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

/**
 * Sees whether the name of the value is longer
 * @param {Object} m1
 * @param {Pbject} m2
 * @returns {Number}
 */
AreaElement.prototype.findLongestStringLength = function(m1, m2) {
    if(m1.width > m2.width){
        return m1.width;
    }
    return m2.width;
}