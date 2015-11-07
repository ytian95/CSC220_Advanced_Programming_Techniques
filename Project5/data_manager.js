function DataManager(){
    this.data = {
//        columns:{},
//        dataSets:{}
    };
    this.counter = 0;
    this.thisFunc = this;
    this.initialize();
    console.log("get data!");
    this.getData(0);
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
    xmlhttp.associatedDataPacket = this;
    xmlhttp.open("GET", fileName, true);
    
    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState === 4 && xmlhttp.status === 200){
            xmlhttp.associatedDataPacket.dataParsed = JSON.parse(xmlhttp.responseText);
            //console.log(myArr);
            //xmlhttp.associatedDataPacket["dataParsed"] = thisFunc.parseData(myArr, dataType);
        }
    };
    //this.parseData(.associatedDataPacket.dataParsed, dataType);
    console.log(this.data);
    console.log(this.dataParsed);
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
    var n = "name" + this.counter;
    this.counter += 1;
    console.log(n);
    this.data["columns"][n] = dataType;
    this.data.dataSets[dataType] = [];
    for(var i = 0; i < myArr.data.length; i++) {
        //console.log(myArr.data[i]);
        var communityName = myArr.data[i][communityIndex];
        var datum = myArr.data[i][dataIndex];
        var dataPoint = new Datum(communityName, datum);
        this.data["dataSets"][dataType][i] = dataPoint;
    }
    return this.data;
}

DataManager.prototype.getData = function(index){
    console.log(JSON.stringify(this.data));
    var a = this.data.dataSets;
    console.log(a);
    console.log(a["kwh_total_sqft"]);
    console.log(this.getName(index));
    console.log(this.data.dataSets[this.getName(index)]);
    return this.thisFunc.data.dataSets[this.getName(index)];
}

DataManager.prototype.getName = function(index){
    return this.thisFunc.data.columns[index];
}

DataManager.prototype.test = function(){
        console.log("fasfsafsdfds");
    for(var i = 0; i < this.thisFunc.data.columns.length; i++){
        var d=this.getData(i);
        console.log(this.data.dataSets[this.thisFunc.data.columns[i]]);
    }
}

function Datum(name, dataPiece){
    this.name = name;
    this.dataPiece = dataPiece;
}

Datum.prototype.getName = function(){
    return this.name;
}

Datum.prototype.getData = function(){
    return this.dataPiece;
}