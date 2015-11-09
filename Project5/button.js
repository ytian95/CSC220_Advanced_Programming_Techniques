function Button() {
    this.isHovered = false;
    this.color = "green";
}
Button.prototype = new HitTestableElement();

Button.prototype.setText = function(text) {
    this.text = text;
}

Button.prototype.setDataManager = function(dataManager) {
    this.dataManager = dataManager;
}

Button.prototype.setHovered = function(bool) {
    this.isHovered = bool;
}

Button.prototype.onClick = function() {
}

//change
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

function ChangeDataSetButton() {
    
}
ChangeDataSetButton.prototype = new Button();

ChangeDataSetButton.prototype.onClick = function() {
    this.dataManager.changePage();
}

function ResetButton() {
   
}
ResetButton.prototype = new Button();

ResetButton.prototype.onClick = function() {
    this.dataManager.resetDataPosition();
}