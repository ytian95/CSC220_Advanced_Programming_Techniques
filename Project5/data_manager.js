function DataManager(){
    this.counter = 0;
    this.data = {
        names : {},
        dataSets : {}
    };
    this.initialize();
    this.createFakeData();
//    console.log(this.originalData);
}

DataManager.prototype.initialize = function(){
    this.httpRequest("sqftElecData.json", "kwh_total_sqft");
    this.httpRequest("sqftGasData.json", "therms_total_sqft");
}

DataManager.prototype.createFakeData = function(){
    //Will be using this data until can fix parser
//    this.data = {
//      names : {
//          0 : "kwh_total_sqft",
//          1 : "therms_total_sqft"
//      },
//      dataSets : {
//          kwh_total_sqft : {
//              0 : new DataPiece("Albany Park", 16294),
//              1 : new DataPiece("Archer Heights", 20489),
//              2 : new DataPiece("Armour Square", 25015),
//              3 : new DataPiece("Ashburn", 20145),
//              4 : new DataPiece("Auburn Gresham", 15176)
//          },
//          therms_total_sqft : {
//              0 : new DataPiece("Albany Park", 16103),
//              1 : new DataPiece("Archer Heights", 24965),
//              2 : new DataPiece("Armour Square", 24651),
//              3 : new DataPiece("Ashburn", 20496),
//              4 : new DataPiece("Auburn Gresham", 14707)
//          }
//      }
//  };
this.data = {
      names : {
          0 : "kwh_total_sqft",
          1 : "therms_total_sqft"
      },
      dataSets : {
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

DataManager.prototype.httpRequest = function(fileName, dataName){
    var thisClass = this;
    var xmlhttp;
    
    if(window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
    }
    else{
        xmlhttp =  new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.associatedDataPacket = this;
    xmlhttp.open("GET", fileName, true);
    
    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState === 4 && xmlhttp.status === 200){
            this.originalData = JSON.parse(xmlhttp.responseText);
            thisClass.parseData(this.originalData, dataName);
        }
        //console.log(this.originalData);
    }
    //the problem is that the onreadystatechange gets called independent of
    //the httpRequest function. Thus, unknown if have access when another
    //function is called. Also may have something to do with local variables
    //not being available after a function call.
    xmlhttp.send();
}

DataManager.prototype.parseData = function(originalData, dataName){
    var columns = originalData.meta.view.columns;
    var areaIndex = 0;
    var dataIndex = 0;
    
    for(var i = 0; i < columns.length; i++){
        if(columns[i].fieldName === "community_area_name"){
            areaIndex = i;
        }
        else if(columns[i].fieldName === dataName){
            dataIndex = i;
        }
    }
    
    this.data.names[this.counter] = dataName;
    this.counter += 1;
    
    this.data.dataSets[dataName] = {};
    for(var i = 0; i < originalData.data.length; i++){
        var areaName = originalData.data[i][areaIndex];
        var rawData = originalData.data[i][dataIndex];
        var dataPiece = new DataPiece(areaName, rawData);
        this.data.dataSets[dataName][i] = dataPiece;
    }
}

//working
DataManager.prototype.getName = function(index){
    return this.data.names[index];
}

//working
DataManager.prototype.getData = function(index){
    return this.data.dataSets[this.getName(index)];
}

function DataPiece(name, value){
    this.name = name;
    this.value = value;
}

DataPiece.prototype.getName = function(){
    return this.name;
}

DataPiece.prototype.getValue = function(){
    return this.value;
}
//
//function initialize(){
//    var dm = new DataManager();
//}
//
//window.onload = initialize;