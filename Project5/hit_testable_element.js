function HitTestableElement(){
    
}
HitTestableElement.prototype = new Visual();

HitTestableElement.prototype.hitTest = function(p){
    if((p.getX() >= this.point.getX() &&
            p.getX() <= this.point.getX() + this.width) &&
       (p.getY() >= this.point.getY() &&
            p.getY() <= this.point.getY() + this.height)){
        return true;
            }
    return false;
}

function Button(text){
    this.text = text;
    this.isHovered = false;
    this.color = "green";
}
Button.prototype = new HitTestableElement();

Button.prototype.setText = function(text){
    this.text = text;
}

Button.prototype.setDataManager = function(dataManager){
    this.dataManager = dataManager;
}

Button.prototype.setHovered = function(bool){
    this.isHovered = bool;
}

Button.prototype.onClick = function(){
    this.dataManager.changePage();
}

Button.prototype.setColor = function(){
    if(this.isHovered){
        this.color = "yellow";
    }
    else{
        this.color = "green";
    }
}

Button.prototype.draw = function(g){
    //console.log("button draw");
    this.setColor();
    g.fillStyle = this.color;
    g.fillRect(this.point.getX(), this.point.getY(),
        this.width, this.height);

    g.fillStyle = "black";
    var fontSize = 12;
    g.font = fontSize + "px Arial";
    g.fillText(this.text, this.point.getX, this.point.getY);
}