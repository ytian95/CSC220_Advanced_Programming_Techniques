function AreaGroup(){
    this.elements = [];
    this.maxColumns = 3;
}

AreaGroup.prototype.setMaxColumns = function(maxCols){
    this.maxColumns = maxCols;
}

AreaGroup.prototype.findMax = function(dataSet){
    var max = dataSet[0].getValue();
    for(var i = 1; i < dataSet.length; i++){
        var curr = dataSet[i].getValue();
        if(max < curr){
            max  = curr;
        }
    }
    return max;
}

AreaGroup.prototype.addDataPoints = function(dataSet){
    var cols = 0;
    var rows = 0;
    var maxValue = this.findMax(dataSet);
    for(var i = 0; i < dataSet.length; i++){
        var dataPiece = dataSet[i];
        var areaElem = new AreaElement();
        
        areaElem.setXArray(cols);
        areaElem.setYArray(rows);
        areaElem.setWidth(50);
        areaElem.setHeight(50);
        areaElem.setXY();
        areaElem.addData(dataPiece);
        areaElem.setPercent(dataPiece.getValue()/maxValue);
        areaElem.setMaxColor("red"); //change to rgb later

        this.elements.push(areaElem);
        if(cols === this.maxCols){
            cols = 0;
            rows += 1;
        }
        cols += 1;
    }
}

AreaGroup.prototype.hitTestAndFind = function(position){
    for(var i = this.elements.length - 1; i >= 0; i--){
        //only going to contain classes instance of HitTestable
        if(this.elements[i].hitTestPosition){
            return this.elements[i];
        }
    }
    return null;
}

AreaGroup.prototype.draw = function(g){
    for(var i = 0; i < this.elements.length; i++){
        this.elements[i].draw(g);
    }
}