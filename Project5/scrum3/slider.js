function Slider(width, height, position){
    Visual.call(this, width, height);
    //this.minMark;
    //this.thresholdMark;
    this.threshold = 1;
    this.setPosition(position);
    this.initialize();
}
Slider.prototype = new HitTestableElement();

Slider.prototype.initialize = function(){
    //this.minMark = new Mark(this.point.getY() + this.height, 
    //                    this.point.getY() + this.height, this.point.getY());
//    this.maxMark = new Mark(this.point.getY(),
//                        this.point.getY() + this.height, this.point.getY());
//    this.maxMark.setWidth(20);
//    this.maxMark.setHeight(20);
//    this.maxMark.setPosition(
//                new Point(this.point.getX() - 20,
//                            this.point.getY()));
}

//elementManager
//when change call changeScale
Slider.prototype.setParent = function(parent){
    this.parent = parent;
}

Slider.prototype.draw = function(g){
    g.fillStyle = "yellow";
    var gradientHeight = this.height * this.threshold;
    g.fillRect(this.point.getX(), this.point.getY(), this.width, 
                this.height);
    
    var pageColorArray = this.parent.getPageColor();
    var pageColor = "rgb(" + pageColorArray.join(", ") + ")";
    var gradient = g.createLinearGradient(0, 0, 0, gradientHeight);
    gradient.addColorStop(0, "black");
    gradient.addColorStop(1, pageColor);
    g.fillStyle = gradient;
    g.fillRect(this.point.getX(), 
                this.point.getY() + (this.height - this.gradientHeight), 
               this.width, gradientHeight);
               
    //this.maxMark.draw(g);
}

Slider.prototype.resizeCanvas = function(width, height){
    this.setPosition(new Point(width - this.width, height - this.height));
    //this.maxMark.resizeCanvas(width - this.width, height);
}

Slider.prototype.activate = function(position){
    this.threshold = this.point.getY() + this.height - position.getY();
    this.parent.changeScale(this.threshold/this.height);
    //this.maxMark.activate(position);
}

Slider.prototype.deactivate = function(){
    
}