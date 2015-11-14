function StarField(){
    this.speed;
    this.density;
    this.starSizeRange;
    this.buffer;
    this.stars;
    this.bufferG;
    this.isBuffered = true;
    this.stars = [];
}
StarField.prototype = new Visual();

StarField.prototype.setScreenSize = function(screenSize){
    this.screenSize = screenSize;
}

StarField.prototype.setSpeed = function(speed) {
    this.speed = speed;
}

StarField.prototype.setDensity = function(density){
    this.density = density;
}

StarField.prototype.setStarSizeRange = function(starSizeRange){
    this.starSizeRange = starSizeRange;
}

StarField.prototype.setBuffer = function(canvas){
    this.buffer = canvas;
}

StarField.prototype.setIsBuffered = function(bool){
    this.isBuffered = bool;
}

StarField.prototype.initialize = function(width, height, density, starSizeRange, speed){
    this.width = width;
    this.height = height;
    this.density = density;
    this.starSizeRange = starSizeRange;
    this.speed = speed;
    this.setPosition(new Point(0, 0));
        //buffer is a new cavas we add to html
    //bufferG buffer. getContext(2d)
    this.buffer = document.createElement("canvas");
    this.buffer.width = width;
    this.buffer.height = height;
    //document.getElementById("body").appendChild(this.buffer);
    this.bufferG = this.buffer.getContext("2d");
    
    //generate random stars
    this.generateRandomStars();
    
    //we add the stars to the buffer
    this.drawStars(this.bufferG);
}

StarField.prototype.generateRandomStars = function(){
    var numStars = this.density * 500;
    for(var i = 0; i < numStars; i++){
        //generate random x and y
        var x = Math.floor(Math.random() * this.width);
        var y = Math.floor(Math.random() * this.height);
        var diff = this.starSizeRange[1] - this.starSizeRange[0];
        var size = Math.floor(Math.random() * diff + this.starSizeRange[0]);
        var star = new Star();
        star.setSize(size);
        star.setPosition(new Point(x, y));
        this.stars.push(star);
    }
}

StarField.prototype.drawStars = function(g){
    for(var i = 0; i < this.stars.length; i++){
        this.stars[i].draw(g);
    }
}



StarField.prototype.draw = function(g){
    this.position.setX(this.position.getX()-this.speed);
    g.save();
    g.translate(this.position.getX(), 0);
    this.drawOffSet(g, 0);
    this.drawOffSet(g, this.width);
    this.resetX();
    g.restore();
}

StarField.prototype.drawOffSet = function(g, x){
    g.save();
    g.translate(x, 0);
    if(this.isBuffered){
        g.drawImage(this.buffer, 0, 0);
    }
    else{
        this.drawStars(g);
    }
    g.restore();
}

StarField.prototype.resetX = function(){
    if(this.position.getX() <= -this.width){
        this.position.setX(0);
    }
}