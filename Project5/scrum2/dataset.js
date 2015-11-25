function Dataset(dataName) {
    this.datasetName = dataName;
    this.data = [];
    this.loaded = false;
}

Dataset.prototype.size = function() {
    return this.data.length;
}

Dataset.prototype.at = function(position) {
    return this.data[position];
}

Dataset.prototype.setName = function(name) {
    this.datasetName = name;
}

Dataset.prototype.addData = function(dataPiece) {
    this.data.push(dataPiece);
}

Dataset.prototype.getName = function() {
    return this.datasetName;
}

Dataset.prototype.parseData = function(originalData, dataName) {
    var columns = originalData.meta.view.columns;
    var areaIndex = 0;
    var dataIndex = 0;
    
    for( var i = 0; i < columns.length; i++ ) {
        if( columns[i].fieldName === "community_area_name" ) {
            areaIndex = i;
        }
        else if( columns[i].fieldName === dataName ) {
            dataIndex = i;
        }
    }
    
    for(var i = 0; i < originalData.data.length; i++){
        var areaName = originalData.data[i][areaIndex];
        var rawData = originalData.data[i][dataIndex];
        var dataPiece = new DataPiece(areaName, rawData);
        this.addData(dataPiece);
    }
}

Dataset.prototype.onLoaded = function(resource) {
    var allData = JSON.parse( resource.getLoadedString() );
    this.parseData(allData, this.datasetName);
    this.loaded = resource.getIsLoaded();
}

Dataset.prototype.isLoaded = function() {
    return this.loaded;
}

function DataPiece(name, value) {
    this.name = name;
    this.value = value;
}

DataPiece.prototype.getName = function() {
    return this.name;
}

DataPiece.prototype.getValue = function() {
    return this.value;
}