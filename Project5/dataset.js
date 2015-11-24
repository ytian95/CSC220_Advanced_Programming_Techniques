function Dataset(dataName){
    this.datasetName = dataName;
    //this.fileUrl = fileName;
    this.data = [];
    this.loaded = false;
    //this.initialize();
}

Dataset.prototype.setName = function(name){
    this.datasetName = name;
}

Dataset.prototype.addData = function(dataPiece){
    this.data.push(dataPiece);
}

Dataset.prototype.parseData = function(originalData, dataName){
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

Dataset.prototype.onLoaded = function(resource){
    //console.log(resource);
    var allData = JSON.parse(resource.getLoadedString());
    //console.log(unparsedData);
    this.parseData(allData, this.datasetName);
    this.loaded = resource.getIsLoaded();
}

Dataset.prototype.isLoaded = function(){
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


//Dataset.prototype.httpRequest = function(fileName, datasetName){
//    this.datasetName = datasetName;
//    var thisClass = this;
//    var xmlhttp;
//    
//    if(window.XMLHttpRequest){
//        xmlhttp = new XMLHttpRequest();
//    }
//    else{
//        xmlhttp = new XMLHttpRequest();
//    }
//    xmlhttp.associatedDataPacket = this;
//    xmlhttp.open("GET", fileName, true);
//    
//    xmlhttp.onreadystatechange = function(){
//        if(xmlhttp.readyState === 4 && xmlhttp.status === 200){
//            var originalData = JSON.parse(xmlhttp.responseText);
//            thisClass.parseData(originalData, datasetName);
//            this.buffered = true;
//            console.log("-------------Finished BUFFERING---------");
//            console.log(thisClass.data);
//        }
//    }
//    
//    xmlhttp.send();
//} 