function Button() {
    this.isHovered = false;
    this.color = "green";
}
Button.prototype = new HitTestableElement();

Button.prototype.setText = function(text) {
    this.text = text;
}

Button.prototype.setParent = function(parent) {
    this.parent = parent;
}

Button.prototype.setHovered = function(bool) {
    this.isHovered = bool;
}

Button.prototype.onClick = function() {
}

Button.prototype.activate = function(position){
    this.setHovered(true);
    this.onClick();
}

Button.prototype.deactivate = function(){
    this.setHovered(false)
}

Button.prototype.setColor = function() {
    if(this.isHovered){
        this.color = "yellow";
    }
    else{
        this.color = "green";
    }
}

Button.prototype.draw = function(g) {
    this.setColor();
    g.fillStyle = this.color;
    g.fillRect(this.point.getX(), this.point.getY(),
        this.width, this.height);

    g.fillStyle = "black";
    var fontSize = 20;
    g.font = fontSize + "px Arial";
    g.fillText(this.text, this.point.getX(), 
            this.point.getY() + this.height/2);
}

Button.prototype.resizeCanvas = function(width, height){
}

function ChangeDataSetButton() {
    
}
ChangeDataSetButton.prototype = new Button();

ChangeDataSetButton.prototype.onClick = function() {
    this.parent.changePage();
}

ChangeDataSetButton.prototype.activate = function(position){
    Button.prototype.activate.call(this, position);
    this.onClick();
}

ChangeDataSetButton.prototype.resizeCanvas = function(width, height){
    Button.prototype.resizeCanvas.call(this, width, height);
    this.setPosition(new Point(width - this.width, this.point.getY()));
}

function ResetButton() {
   
}
ResetButton.prototype = new Button();

ResetButton.prototype.onClick = function() {
    this.parent.resetDataPosition();
}

ResetButton.prototype.activate = function(position){
    Button.prototype.activate.call(this, position);
    this.onClick();
}

ResetButton.prototype.resizeCanvas = function(width, height){
    Button.prototype.resizeCanvas.call(this, width, height);
    this.setPosition(new Point(width - this.width, this.point.getY()));
}
