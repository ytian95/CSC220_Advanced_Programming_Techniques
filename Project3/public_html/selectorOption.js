function SelectorOption(v, xPos, yPos, w, h){
    this.value = v;
    this.position = {x:xPos, y:yPos};
    this.isHovered = false;
    this.width = w;
    this.height = h;
    this.color = "black";
}

SelectorOption.prototype.getValue = function(){
    return this.value;
}

SelectorOption.prototype.setIsHovered = function(bool){
    this.isHovered = bool;
}

SelectorOption.prototype.setColor = function(){
    if(this.isHovered){
        this.color = "blue";
    }
    else{
        this.color = "black";
    }
}

SelectorOption.prototype.draw = function(g){
    //console.log("option drawing");
    //console.log(this.position.x + " " + this.position.y);
    //console.log(this.value + " " + this.width + " " + this.height);
    this.setColor();
    g.fillStyle = this.color;
    g.fillRect(this.position.x, this.position.y, this.width, this.height);
    
    g.fillStyle = "white";
    var fontSize = 30;
    g.font = fontSize + "px Arial";
    g.fillText(this.value, this.position.x, this.position.y+fontSize); //fix
}

SelectorOption.prototype.isOnSelector = function(position){ //hit testing
    if((position.x >= this.position.x && position.x <= this.position.x + this.width) &&
        (position.y >= this.position.y && position.y <= this.position.y + this.height)){
        return true;
        }
    return false;
}
//change color
//on mouseClick
//hit testing
//draw