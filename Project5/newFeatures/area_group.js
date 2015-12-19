function AreaGroup() {
    this.elements = [];
    this.blockSize = 25;
}

AreaGroup.prototype.setName = function(name) {
    this.name = name;
}

AreaGroup.prototype.getName = function() {
    return this.name;
}

AreaGroup.prototype.setBlockSize = function(block) {
    this.blockSize = block;
    for(var i = 0; i < this.elements.length; i++){
        this.elements[i][1].setBlockSize(block);
    }
}

AreaGroup.prototype.setMaxColumns = function(maxCols) {
    this.maxColumns = maxCols;
}

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

AreaGroup.prototype.addDataPoints = function(dataSet, RGBcolor) {
    this.maxValue = this.findMaxData(dataSet);
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
        areaElem.setPercent(2);
        areaElem.setMaxRGBColor(RGBcolor);
        
        this.elements.push([dataPiece.getValue(), areaElem]);
    }
    
    this.newMax = this.maxValue;
}

AreaGroup.prototype.hitTestAndFind = function(position) {
    for( var i = this.elements.length - 1; i >= 0; i-- ) {
        //only going to contain classes instance of HitTestable
        if( this.elements[i][1].hitTest(position) ) {
            //move it to the bottom of the list
            var hittested = this.elements[i][1];
            this.elements.splice(i, 1);
            this.elements.push([hittested.getData().getValue(), hittested]);
            return hittested;
        }
    }
    return null;
}

AreaGroup.prototype.draw = function(g) {
    for( var i = 0; i < this.elements.length; i++ ) {
        this.elements[i][1].draw(g);
    }
}

AreaGroup.prototype.resetDataPosition = function() {
    for( var i = 0; i < this.elements.length; i++ ) {
        this.elements[i][1].setXY();
    }
}

AreaGroup.prototype.resizeCanvas = function(width, height){
    if(height/35 < width/28){
        this.setBlockSize(parseInt(height/35));
    }
    else{
        this.setBlockSize(parseInt(width/28));
    }
}

AreaGroup.prototype.changeScale = function(threshold){
    //this.elements.sort();
    var indexThreshold = parseInt(threshold * this.elements.length);
    this.newMax = Math.pow(threshold, 3) * this.maxValue;
    //this.maxValue = this.elements[indexThreshold][1].getData().getValue();
    this.setPercentages(this.newMax);
}

AreaGroup.prototype.setPercentages = function(max){
    for(var i = 0; i < this.elements.length; i++){
        var areaElem = this.elements[i][1];
        var elementValue = areaElem.getData().getValue();
        areaElem.setPercent(elementValue/max);
        this.elements[i][1] = areaElem;
    }
}