/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Graph(canvas){
    if(typeof canvas != "undefined"){
        this.canvas = canvas;
        this.initializeGraphics(600, 300);
        //this.initializeInput();
        this.initializeSettings();
    }
}

Graph.prototype.initializeGraphics = function(w, h){
    this.g = this.canvas.getContext("2d");
    this.canvas.width = w;
    this.canvas.height = h;
    this.elements = [];
}

//Graph.prototype.initializeInput = function() {
//    this.canvas.forwardInputTo = this;
//    this.canvas.onmousemove = function(e) {
//        this.forwardInputTo.onMouseMove(e);
//    }
//}

Graph.prototype.initializeSettings = function(){
    this.settings = {
        elmWidth : 50,
        maxElmHeight : 300,
        scaleFactor : 2
    }
}

Graph.prototype.onMouseMove = function(e) {
    var position = getRelativeCanvasCoordinates(this.canvas, e);
    for (var i = 0; i < this.elements.length; i++)
    {
        this.elements[i].updateMouseState(position.x, position.y);
    }
    this.draw();
}

Graph.prototype.addData = function(dataSeries){
    var townData = dataSeries.getData();
    //var highestValue = this.findHighestValue(townData);
    
    for(var i = 0; i < townData.length; i++){
        var x = this.settings.elmWidth * i;
        var y = 0;
        var width = this.settings.elmWidth;
        var height = this.settings.maxElmHeight;//this.proportionHeight(townData[i], highestValue);

        this.elements.push(this.initializeChartElement(
                townData[i], x, y, width, height, this.settings.scaleFactor));
    }
    this.canvas.width = this.settings.elmWidth * this.elements.length;
    this.canvas.height = this.settings.maxElmHeight;
    
    //console.log(this.canvas.width);
    //console.log(this.canvas.height);
}

Graph.prototype.draw = function(){
    this.g.fillStyle = "#eeeeee";
    this.g.fillRect(0, 0, this.canvas.width, this.canvas.height);
    for(var i = 0; i < this.elements.length; i++){
        this.elements[i].draw(this.g);
    }
}

function ChartElement(dataPoint, x, y, w, h, scaleFactor){
    this.data = dataPoint;
    this.x = x;
    this.y = y;
    this.width =  w;
    this.height = h;
    this.scaleFactor = scaleFactor;
    this.isMouseOver = false;
    this.initializeSettings();
}

ChartElement.prototype.initializeSettings = function(){
    this.settings = {};
    this.settings.labelHeight = 50;
    this.settings.labelFont = "10px arial";
    //console.log(this.settings.labelHeight);
}

ChartElement.prototype.draw = function(g){
    g.font = this.settings.labelFont;
    g.fillStyle = "black";
    var labelText = this.data.getLabel();
    //console.log(labelText);
    var labelWidth = g.measureText(labelText).width;
    g.fillText(labelText, 
        this.x + (this.width - labelWidth)/2, this.height - 30);
}

ChartElement.prototype.updateMouseState = function(x, y){
    if(this.x > x || this.x + this.width < x ||
            this.y > y || this.y + this.height < y){
        this.isMouseOver = false;
    }
    else{
        this.isMouseOver = true;
    }
}

//ChartElement.prototype.findHighestValue = function(data){
//    var highest = data[0].getValue();
//    for(var i = 1; i < data.length; i++){
//        var current = data[i].getValue();
//        if(current > highest){
//            highest = current;
//        }
//    }
//    return highest;
//};
//
//ChartElement.prototype.proportionHeight = function(value, highestValue){
//    return Math.floor((value / highestValue) * this.settings.maxElmHeight);
//};

function BarGraph(canvas){
    Graph.call(this, canvas);
}
BarGraph.prototype = new Graph();

BarGraph.prototype.initializeChartElement = function(dataPoint, x, y, w, h, 
scaleFactor){
    return new Bar(dataPoint, x, y, w, h, scaleFactor);
}

function Bar(dataPoint, x, y, w, h, scaleFactor){
    ChartElement.call(this, dataPoint, x, y, w, h, scaleFactor);
}
Bar.prototype = new ChartElement();

Bar.prototype.initializeSettings = function(){
    ChartElement.prototype.initializeSettings.call(this);
    this.settings.barPadding = 5;
    this.settings.normalBarColor = "red";
    this.settings.highlightedBarColor = "orange";
    console.log(this.settings.labelHeight);
}

Bar.prototype.draw = function(g){
    ChartElement.prototype.draw.call(this, g);
    if(this.isMouseOver){
        g.fillStyle = this.settings.highlightedBarColor;
    }
    else{
        g.fillStyle = this.settings.normalBarColor;
    }
    
    var barWidth = this.width - 2*this.settings.barPadding;
    var maxBarHeight = this.height - this.settings.labelHeight;
    var actualBarHeight = this.data.getValue() * this.scaleFactor;
    console.log("x " + this.x + this.settings.barPadding);
    console.log("y " + (maxBarHeight - actualBarHeight));
    g.fillRect(
            this.x + this.settings.barPadding, 
            maxBarHeight - actualBarHeight,
            barWidth, actualBarHeight);
    //g.stroke();
}

function LineGraph(w, h){
    Graph.call(this, w, h);
    this.points = [];
}
LineGraph.prototype = new Graph();

LineGraph.prototype.addLines = function(){
    
}

function Line(){
    
}

function DataSelector(graph, selectorDiv){
    this.graph = graph;
    this.items = [];
    selectorDiv.innerHTML = "";
    for(var i = 0; i < DATA.length; i++){
        this.items.push(new DataSelectorItem(DATA[i], selectorDiv));
    }
    selectorElement.associatedSelector = this;
    selectorElement.onchange = function(){
        this.associatedSelector.onSelectionChanged(
                this.options[this.selectedIndex].associatedSelectorItem);
    }
}

DataSelector.prototype.onSelectionChanged = function(selectedDiv){
    this.graph.onSelectedChanged(selectedDiv);
}

function DataSelectorItem(dataSeries, selectorDiv){
    
}

function getRelativeCanvasCoordinates(canvas, e){
    var offset = canvas.getBoundingClientRect();
    return{
        x : e.clientX - offset.left,
        y : e.clientY - offset.top
    };
}

function initialize(){
    var test = new BarGraph(document.getElementById("graph"));
    test.addData(DATA[0]);
    test.draw();
    
}

function onSelectionChanged(){
    
}

window.onload = initialize;