/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function SelectorWrapper(){
    this.selector = new Selector();
}
SelectorWrapper.prototype = new GameEngine();

SelectorWrapper.prototype.initializeSelector = function(){
    this.selector.setValue("Dropdown");
    this.selector.setSize(200, 50);
    this.selector.setPosition(10, 10);
}

SelectorWrapper.prototype.initializeOptions = function(numOptions){
//    var x = this.selector.getX();
//    var y = this.selector.getY() + (this.selector.getNumOptions() + 1) * this.selector.getHeight();
//    var w = this.selector.getWidth();
//    var h = this.selector.getHeight();
    for(var i = 1; i <= numOptions; i++){
        this.selector.addOption(new SelectorOption(
                "Option" + i,
                this.selector.getX(),
                (this.selector.getY() + (this.selector.getNumOptions() + 1) * this.selector.getHeight()), 
                this.selector.getWidth(),
                this.selector.getHeight()));
    }
}

SelectorWrapper.prototype.onMouseMove = function(position){
    //passses in the local coordinates
    //go through selector
    if(this.selector.getIsExpanded()){
        //console.log("onMouseMove");
        this.selector.setOptionHover(position);
    }
}
SelectorWrapper.prototype.onMouseClick = function(position){
    //still trying to figure out the best way to iterate through the options
    if(this.selector.isOnSelector(position)){ //if it's clicked
        //console.log("on dropdown");
        this.selector.setExpanded(!this.selector.getIsExpanded()); //dropdown
    }
    else if(this.selector.getIsExpanded()){ //if dropped down, check items
        //console.log("onMouseClicked expanded");
        var optionClicked = this.selector.getOptionClicked(position);
        if(optionClicked === null){
            this.selector.setExpanded(!this.selector.getIsExpanded());
        }
        else{
           this.changeHeader(optionClicked.getValue());
        }
    }
    //passes in the local coordinates
    //go through the selector 
}

SelectorWrapper.prototype.changeHeader = function(value){
    document.getElementById("header").innerHTML = value;
}

SelectorWrapper.prototype.draw = function(g){
    this.selector.draw(g);
}

function initialize(){
    var selectorDemo = new SelectorWrapper();
    selectorDemo.initializeSelector();
    selectorDemo.initializeOptions(3);
    selectorDemo.initialize(document.getElementById("canvas"));    
}

window.onload = initialize;