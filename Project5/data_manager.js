function DataManager(){
    this.data = [];
    this.initialize();
}
DataManager.prototype.initialize = function(){
    this.httpRequest("sampleData.json");
}

DataManager.prototype.httpRequest = function(fileName){
    var xmlhttp;
    if (window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
    }
    else{
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState === 4 && xmlhttp.status === 200){
            var myArr = JSON.parse(xmlhttp.responseText);
            myFunction(myArr);
        }
    }
    xmlhttp.open("GET", fileName, true);
    xmlhttp.send();
}

function myFunction(arr) {
    var out = "";
    var i;
    var end = 10;
    if(arr.length < end){
        end = arr.length;
    }
    for(i = 0; i < end; i++) {
        console.log(arr[i]);
        console.log(arr[i].phone.home);
//        out += '<a href="' + arr[i].url + '">' + 
//        arr[i].display + '</a><br>';
    }
//    document.getElementById("id01").innerHTML = out;
}

function initialize(){
    var dm = new DataManager();
}

window.onload = initialize;