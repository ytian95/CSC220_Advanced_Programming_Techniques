function Selector(){
    this.value = "";
    this.position = {x:0, y:0};
    this.isExpanded = false;
    this.width = 0;
    this.height = 0;
    this.optionsList = [];
}

Selector.prototype.setValue = function(val){
    this.value = val;
}

Selector.prototype.setSize = function(w, h){
    this.width = w;
    this.height = h;
}

Selector.prototype.setPosition = function(x, y){
    this.position.x = x;
    this.position.y = y;
}

Selector.prototype.getX = function(){
    return this.position.x;
}

Selector.prototype.getY = function(){
    return this.position.y;
}

Selector.prototype.getWidth = function(){
    //console.log("got width" + this.width);
    return this.width;
}

Selector.prototype.getHeight = function(){
    return this.height;
}

Selector.prototype.setExpanded = function(bool){
    this.isExpanded = bool;
}

Selector.prototype.getIsExpanded = function(){
    return this.isExpanded;
}

Selector.prototype.getNumOptions = function(){
    return this.optionsList.length;
}

Selector.prototype.addOption = function(option){
    //console.log("added");
    this.optionsList.push(option);
}

Selector.prototype.draw = function(g){
    g.fillStyle = "red";
    g.fillRect(this.position.x, this.position.y, this.width, this.height);
    g.fillStyle = "white";
    var fontSize = 30;
    g.font = fontSize + "px Arial";
    
    g.fillText(this.value, this.position.x, this.position.y+fontSize); //fix
    
    if(this.isExpanded){
        for(i = 0; i < this.optionsList.length; i++){
            this.optionsList[i].draw(g);
        }
    }
}

Selector.prototype.isOnSelector = function(position){ //hit testing
    if((position.x >= this.position.x && position.x <= this.position.x + this.width) &&
        (position.y >= this.position.y && position.y <= this.position.y + this.height)){
        return true;
        }
    return false;
}

Selector.prototype.getOptionClicked = function(position){
    for(var i = 0; i < this.optionsList.length; i++){
        var option = this.optionsList[i];
        if(option.isOnSelector(position)){
            return option;
        }
    }
    return null;
}

Selector.prototype.setOptionHover = function(position){
    for(var i = 0; i < this.optionsList.length; i++){
        var option = this.optionsList[i];
        if(option.isOnSelector(position)){
            option.setIsHovered(true);
        }
        else{
            option.setIsHovered(false);
        }
    }
}

//hit testing
//draw
