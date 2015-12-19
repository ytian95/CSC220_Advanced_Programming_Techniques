function Slider(width, height, position){
    Visual.call(this, width, height);
    //this.minMark;
    //this.thresholdMark;
    this.setPosition(position);
    this.initialize();
}
Slider.prototype = new DraggableElement();

Slider.prototype.initialize = function(){
    this.maxMark = new Mark(this.point.getY() + this.height, this.point.getY());
    this.maxMark.setWidth(20);
    this.maxMark.setHeight(20);
    this.maxMark.setPosition(
                new Point(this.point.getX() - 20,
                            window.innerHeight/2));
}

Slider.prototype.setParent = function(parent){
    this.parent = parent;
}

Slider.prototype.getMark = function(){
    return this.maxMark;
}

Slider.prototype.draw = function(g){
    g.fillStyle = "yellow";
    var gradientHeight = parseInt(this.height * this.maxMark.getThreshold());
    g.fillRect(this.point.getX(), this.point.getY(), this.width, 
                this.height - gradientHeight);
    
    var pageColorArray = this.parent.getPageColor();
    var pageColor = "rgb(" + pageColorArray.join(", ") + ")";
    var gradient = g.createLinearGradient(
                        0, this.point.getY() + this.height - gradientHeight,
                        0, this.height + this.point.getY());
    gradient.addColorStop(1, "rgb(0, 0, 0)");
    gradient.addColorStop(0, pageColor);
    g.fillStyle = gradient;
    g.fillRect(this.point.getX(), 
                this.point.getY() - gradientHeight + this.height, 
                this.width, gradientHeight);
               
    this.maxMark.draw(g);
}

Slider.prototype.resizeCanvas = function(width, height){
    this.height = height/2;
    this.setPosition(new Point(width - this.width, height - this.height));
    this.maxMark.resizeCanvas(width - this.width, height,
                            this.height + this.point.getY());
    this.maxMark.setLowest(this.height + this.point.getY());
    this.maxMark.setTotalHeight(this.height);
}

Slider.prototype.activate = function(position){
    this.maxMark.activate(position);
}

Slider.prototype.deactivate = function(){
    
}

Slider.prototype.hitTest = function(position){
    return(this.maxMark.hitTest(position));
}

Slider.prototype.move = function(position){
    this.maxMark.move(position);
    this.parent.changeScale(this.maxMark.getThreshold());
}