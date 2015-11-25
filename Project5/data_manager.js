//will now monitor datasets
function DataManager(elementManager) {
    this.elementManager = elementManager;
    console.log(this.elementManager);
    this.counter = 0;
    this.data = {
        names : { },
        datasets : {}
    };
    this.resources = [];
    //this.buffered = [];
    this.initialize();
    //this.createFakeData();
}

DataManager.prototype.initialize = function() {
    var resource1 = new Resource("Data/sqftElecData.json");
    resource1.datasetName = "kwh_total_sqft";
    this.resources.push(resource1);
    
    var resource2 = new Resource("Data/sqftGasData.json");
    resource2.datasetName = "therms_total_sqft";
    this.resources.push(resource2);
    
    for(var i = 0; i < this.resources.length; i++){
        this.resources[i].beginLoad(this, this.onLoaded, null);
    }
}

DataManager.prototype.onLoaded = function(resource){
    var dataName = resource.datasetName;
    this.data.names[this.counter] = dataName;
    var dataset = new Dataset(dataName);
    dataset.onLoaded(resource);
    this.data.datasets[dataName] = dataset;
    this.counter += 1;
    if(this.isAllLoaded()){
        //propogate back up to custom game loop
        this.elementManager.initializeData(this.counter);
    }
}

DataManager.prototype.isAllLoaded = function(){
    //console.log(this.data);
    for(var i = 0; i < this.resources.length; i++){
        if(!this.resources[i].getIsLoaded()){
            //console.log("not finished loadeg");
            return false;
        }
    }
    //console.log("finished liading");
    return true;
}

//working
DataManager.prototype.getName = function(index) {
    return this.data.names[index];
}

//working. returns a Dataset
DataManager.prototype.getData = function(index) {
    return this.data.datasets[this.getName(index)];
}

DataManager.prototype.setElementManager = function(elementManager) {
    this.elementManager = elementManager;
}

//edit so buton now has instance of elementManager
DataManager.prototype.changePage = function() {
    this.elementManager.changePage();
}

DataManager.prototype.resetDataPosition = function() {
    this.elementManager.resetDataPosition();
}

DataManager.prototype.getNumDataSets = function( ){
    return this.data.names.length;
}

//DataManager.prototype.httpRequest = function(fileName, dataName) {
//    var thisClass = this;
//    var xmlhttp;
//    
//    if( window.XMLHttpRequest ) {
//        xmlhttp = new XMLHttpRequest();
//    }
//    else{
//        xmlhttp =  new ActiveXObject("Microsoft.XMLHTTP");
//    }
//    xmlhttp.associatedDataPacket = this;
//    xmlhttp.open("GET", fileName, true);
//    
//    xmlhttp.onreadystatechange = function() {
//        if( xmlhttp.readyState === 4 && xmlhttp.status === 200 ) {
//            //onDataRecieved()
//            //method for isDataLoaded
//            thisClass.originalData = JSON.parse(xmlhttp.responseText);
//            thisClass.parseData(thisClass.originalData, dataName);
//            this.buffered = true;
//        }
//        //console.log(this.originalData);
//    }
//    //the problem is that the onreadystatechange gets called independent of
//    //the httpRequest function. Thus, unknown if have access when another
//    //function is called. Also may have something to do with local variables
//    //not being available after a function call.
//    xmlhttp.send();
//}
//
//DataManager.prototype.parseData = function(originalData, dataName) {
//    var columns = originalData.meta.view.columns;
//    var areaIndex = 0;
//    var dataIndex = 0;
//    
//    for( var i = 0; i < columns.length; i++ ) {
//        if( columns[i].fieldName === "community_area_name" ) {
//            areaIndex = i;
//        }
//        else if( columns[i].fieldName === dataName ) {
//            dataIndex = i;
//        }
//    }
//    
//    this.data.names[this.counter] = dataName;
//    this.counter += 1;
//    
//    this.data.dataSets[dataName] = {};
//    for( var i = 0; i < originalData.data.length; i++ ) {
//        var areaName = originalData.data[i][areaIndex];
//        var rawData = originalData.data[i][dataIndex];
//        var dataPiece = new DataPiece(areaName, rawData);
//        this.data.dataSets[dataName][i] = dataPiece;
//    }
//}

DataManager.prototype.createFakeData = function() {
    //Will be using this data until can fix parser
    this.data = {
      names : [
          "kwh_total_sqft",
          "therms_total_sqft"
        ],
      datasets : {
          kwh_total_sqft : [
              new DataPiece("Albany Park", 16294),
              new DataPiece("Archer Heights", 20489),
              new DataPiece("Armour Square", 25015),
              new DataPiece("Ashburn", 20145),
              new DataPiece("Auburn Gresham", 15176)
            ],
          therms_total_sqft : [
              new DataPiece("Albany Park", 16103),
              new DataPiece("Archer Heights", 24965),
              new DataPiece("Armour Square", 24651),
              new DataPiece("Ashburn", 20496),
              new DataPiece("Auburn Gresham", 14707)
            ]
        }
    };
}