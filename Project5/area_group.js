function AreaGroup() {
    this.elements = [ ];
    this.maxColumns = 2;
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
    var cols = 0;
    var rows = 0;
    var maxValue = this.findMaxData(dataSet);
    for( var i = 0; i < dataSet.size(); i++ ) {
        var dataPiece = dataSet.at(i);
        var areaElem = new AreaElement();
        console.log(dataPiece.getName());
        var areaData = AREA_LOCS[dataPiece.getName()];
        console.log(areaData);
        areaElem.setXArray(areaData[0]); //fix
        areaElem.setYArray(areaData[1]); //fix
        areaElem.setWidth(40 * areaData[2]);
        areaElem.setHeight(40 * areaData[3]);
        areaElem.setXY();
        areaElem.addData(dataPiece);
        areaElem.setPercent( dataPiece.getValue()/maxValue );
        areaElem.setMaxRGBColor(RGBcolor);

        this.elements.push(areaElem);
        if( cols === this.maxColumns ) {
            cols = 0;
            rows += 1;
        }
        else{
            cols += 1;
        }
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