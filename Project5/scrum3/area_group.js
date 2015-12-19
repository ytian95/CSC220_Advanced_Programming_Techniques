/**
 * Holds a group of AreaElements
 * @constructor
 * @returns {AreaGroup}
 */
function AreaGroup() {
    /*
     * @type {AreaElement[]}
     * @private
     */
    this.elements = [];
    
    /*
     * The pixel size for each block
     * @type {Number}
     */
    this.blockSize = 25;
}
/**
 * Setter for the dataset name
 * @param {String} name
 * @returns {undefined}
 */
AreaGroup.prototype.setName = function(name) {
    this.name = name;
}

/**
 * getter for the dataset name
 * @returns {String}
 */
AreaGroup.prototype.getName = function() {
    return this.name;
}

/**
 * Sets the blocksize and updates each element's blockSize
 * @param {Number} block
 * @returns {undefined}
 */
AreaGroup.prototype.setBlockSize = function(block) {
    this.blockSize = block;
    for(var i = 0; i < this.elements.length; i++){
        this.elements[i].setBlockSize(block);
    }
}

/**
 * Find the maximum value from an array of Datasets
 * @param {Dataset[]} dataSet
 * @returns {Number}
 */
AreaGroup.prototype.findMaxData = function(dataSet) {
    var max = dataSet.at(0).getValue();
    for( var i = 1; i < dataSet.size(); i++ ) {
        var curr = dataSet.at(i).getValue();
        if( max < curr ) {
            max  = curr;
        }
    }
    return max;
}

/**
 * Adds in AreaElements based on information from each dataset
 * @param {Dataset[]} dataSet
 * @param {Number[]} RGBcolor
 * @returns {undefined}
 */
AreaGroup.prototype.addDataPoints = function(dataSet, RGBcolor) {
    var maxValue = this.findMaxData(dataSet);
    var maxValue = 50000;
    for( var i = 0; i < dataSet.size(); i++ ) {
        var dataPiece = dataSet.at(i);
        var areaElem = new AreaElement();
        var areaData = AREA_LOCS[dataPiece.getName()];
        areaElem.setXArray(areaData[0]);
        areaElem.setYArray(areaData[1]);
        areaElem.setWidthRatio(areaData[2]);
        areaElem.setHeightRatio(areaData[3]);
        areaElem.setBlockSize(this.blockSize);
        areaElem.setXY();
        areaElem.addData(dataPiece);
        areaElem.setPercent( dataPiece.getValue()/maxValue );
        areaElem.setMaxRGBColor(RGBcolor);

        this.elements.push(areaElem);
    }
}

/**
 * Hit tests and finds if one AreaElement has been selected
 * If onoe has been selected, move it up to the end
 * to be drawn last
 * @param {Point} position
 * @returns {AreaElement}
 */
AreaGroup.prototype.hitTestAndFind = function(position) {
    for( var i = this.elements.length - 1; i >= 0; i-- ) {
        //only going to contain classes instance of HitTestable
        if( this.elements[i].hitTest(position) ) {
            //move it to the bottom of the list
            var hittested = this.elements[i];
            this.elements.splice(i, 1);
            this.elements.push(hittested);
            return hittested;
        }
    }
    return null;
}

/**
 * Draws each AreaElement
 * @param {Canvas} g
 * @returns {undefined}
 */
AreaGroup.prototype.draw = function(g) {
    for( var i = 0; i < this.elements.length; i++ ) {
        this.elements[i].draw(g);
    }
}

/**
 * Resets the position of each element back to its default location
 * @returns {undefined}
 */
AreaGroup.prototype.resetDataPosition = function() {
    for( var i = 0; i < this.elements.length; i++ ) {
        this.elements[i].setXY();
    }
}

/**
 * Resizes the blocksize beased on new window dimensions
 * @param {Number} width
 * @param {Number} height
 * @returns {undefined}
 */
AreaGroup.prototype.resizeCanvas = function(width, height) {
    if(height/35 < width/28){
        this.setBlockSize(parseInt(height/35));
    }
    else{
        this.setBlockSize(parseInt(width/28));
    }
}