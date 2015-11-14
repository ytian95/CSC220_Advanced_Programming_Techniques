function Visual(){
    this.position;
    this.width;
    this.height;
}

Visual.prototype.setPosition = function(point){
    this.position = point;
}

Visual.prototype.getPosition = function(){
    return this.position;
}

Visual.prototype.setWidth = function(width){
    this.width = width;
}

Visual.prototype.getWidth = function(){
    return this.width;
}

Visual.prototype.setHeight = function(height){
    this.height = height;
}

Visual.prototype.getHeight = function(){
    return this.height;
}

Visual.prototype.draw = function(g){
    
}