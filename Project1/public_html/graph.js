/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//Bars are now divs
function Graph(maxHeight){
    this.name = "";
    //this.blocksDiv = document.getElementsById("graph")[0];//thing to hold div bars
    //this.maxWidth = maxWidth; //minus padding
    this.maxHeight = maxHeight; //minus padding and 
    this.hasAddedLabels = false;
}

Graph.prototype.findHighestValue = function(dataList){
    var highest = dataList[0].getValue();
    for(var i = 1; i < dataList.length; i++){
        var current = dataList[i].getValue();
        if(current > highest){
            highest = current;
        }
    }
    //console.info(highest);
    return highest;
};

Graph.prototype.proportionHeight = function(value, highestValue){
    return Math.floor((value / highestValue) * this.maxHeight);
};

Graph.prototype.addLabelToGraph = function(label, parentDiv){
    var iDiv = document.createElement("div");
    iDiv.id = "label-" + label.toString();
    iDiv.className = "label";
    iDiv.innerHTML = label;
    parentDiv.appendChild(iDiv);
};

Graph.prototype.addBarsFromData = function(dataSeries){
    this.name = dataSeries.getName();
    var data = dataSeries.getData();
    
    var graphDiv = document.createElement("div");
    graphDiv.id = this.name;
    graphDiv.className = "graph";
    document.getElementById("graphLoc").appendChild(graphDiv);
    
    //if(this.hasAddedLabels === false){
        var labelDiv = document.createElement("div");
        graphDiv.id = this.name;
        graphDiv.className = "labels";
        document.getElementById("labelsLoc").appendChild(labelDiv);
    //}
    
    var highestValue = this.findHighestValue(data);
    for(var i = 0; i < data.length; i++){
        var iDiv = document.createElement("div");
        var dataPoint = data[i];
        
        var label = dataPoint.getLabel();
        var value = dataPoint.getValue();
        var height = this.proportionHeight(value, highestValue);
        //console.info(h);
        //styling can do div.style. =""
        
        var wrapperDiv = document.createElement("div");
        wrapperDiv.className = "wrapper";
        
        //wrapperDiv.setAttribute("style", "display: inline-block;");
        
        var textDiv = document.createElement("div");
        textDiv.id = "Text" + this.name + "-" + label; 
        textDiv.className = "value";
        var t = document.createTextNode(value);
        textDiv.appendChild(t);
        
        var barId = this.name + "-" + label;
        iDiv.id = barId;
        iDiv.className = "bar";
        iDiv.setAttribute("onmouseover", "enterBar(this.id)");
        iDiv.setAttribute("onmouseout", "exitBar(this.id)");
        iDiv.setAttribute("style", "height: " + height.toString() + "px");
        
        var labelDiv = document.createElement("div");
        labelDiv.id = "label-" + label.toString();
        labelDiv.className = "label";
        labelDiv.innerHTML = label;
        
        wrapperDiv.appendChild(textDiv);
        wrapperDiv.appendChild(iDiv);
        wrapperDiv.appendChild(labelDiv);
        
        graphDiv.appendChild(wrapperDiv);
        
//        if(this.hasAddedLabels === false){
//            this.addLabelToGraph(label, labelDiv);
//        }
    }
};

Graph.prototype.removeGraph = function(){
    document.getElementById("graphLoc")
            .removeChild(document.getElementById(this.name));
};

//only adds labels once. 
Graph.prototype.addedLabels = function(){
    this.hasAddedLabels = true;
};

//have a clear div
//Don't actually need this??
function Bar(label, value, width, height, x, y){
    this.label = label;
    this.value = value;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    
    //need id, class name, other info??
};

var graph;
