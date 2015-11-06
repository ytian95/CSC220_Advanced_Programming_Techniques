function DataManager(){
    this.data = {"columns":[]};
    this.initialize();
}
DataManager.prototype.initialize = function(){
    this.httpRequest("sqftElecData.json", "kwh_total_sqft");
    this.httpRequest("sqftGasData.json", "therms_total_sqft");
    console.log(this.data);
}

DataManager.prototype.httpRequest = function(fileName, dataType){
    var thisFunc = this;
    var xmlhttp;
    if (window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
    }
    else{
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("GET", fileName, true);
        
    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState === 4 && xmlhttp.status === 200){
            var myArr = JSON.parse(xmlhttp.responseText);
            //console.log(myArr);
            thisFunc.parseData(myArr, dataType);
        }
    };
    xmlhttp.send();
}

DataManager.prototype.parseData = function(myArr, dataType){
    var columns = myArr.meta.view.columns;
    var communityIndex = 0;
    var dataIndex = 0;
    for(var i = 0; i < columns.length; i++){
        if(columns[i].fieldName === "community_area_name"){
            communityIndex = i;
        }
        if(columns[i].fieldName === dataType){
            dataIndex = i;
        }
    }
    this.data.columns.push(dataType);
    this.data[dataType] = [];
    for(var i = 0; i < myArr.data.length; i++) {
        var communityName = myArr.data[i][communityIndex];
        var datum = myArr.data[i][dataIndex];
        var dataPoint = new Datum(communityName, datum);
        this.data[dataType].push(dataPoint);
    }
}

function Datum(name, dataPiece){
    this.name = name;
    this.dataPiece = dataPiece;
}

function initialize(){
    var dm = new DataManager();
}

window.onload = initialize;