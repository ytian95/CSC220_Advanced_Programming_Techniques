function AreaGroup() {
    this.elements = [ ];
    this.blockSize = 25;
}

AreaGroup.prototype.setName = function(name) {
    this.name = name;
}

//works for the most part
AreaGroup.prototype.getName = function() {
    return this.name;
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
    var maxValue = this.findMaxData(dataSet);
    console.log(maxValue);
    for( var i = 0; i < dataSet.size(); i++ ) {
        var dataPiece = dataSet.at(i);
        var areaElem = new AreaElement();
        console.log(dataPiece.getValue());
        console.log(dataPiece.getValue()/maxValue);
        var areaData = AREA_LOCS[dataPiece.getName()];
        //console.log(areaData);
        areaElem.setXArray(areaData[0]); //fix
        areaElem.setYArray(areaData[1]); //fix
        areaElem.setWidth(this.blockSize * areaData[2]);
        areaElem.setHeight(this.blockSize * areaData[3]);
        areaElem.setBlockSize(this.blockSize);
        areaElem.setXY();
        areaElem.addData(dataPiece);
        areaElem.setPercent( dataPiece.getValue()/maxValue );
        areaElem.setMaxRGBColor(RGBcolor);

        this.elements.push(areaElem);
    }
}

AreaGroup.prototype.hitTestAndFind = function(position) {
    for( var i = this.elements.length - 1; i >= 0; i-- ) {
        //only going to contain classes instance of HitTestable
        if( this.elements[i].hitTest(position) ) {
            return this.elements[i];
        }
    }
    return null;
}

AreaGroup.prototype.draw = function(g) {
    for( var i = 0; i < this.elements.length; i++ ) {
        this.elements[i].draw(g);
    }
}

AreaGroup.prototype.resetDataPosition = function() {
    for( var i = 0; i < this.elements.length; i++ ) {
        this.elements[i].setXY();
    }
}