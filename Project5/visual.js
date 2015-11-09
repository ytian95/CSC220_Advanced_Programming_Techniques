function Visual(width, height) {
    this.width = width;
    this.height = height;
    this.point;
}

Visual.prototype.setWidth = function(w) {
    this.width = w;
}

Visual.prototype.setHeight = function(h) {
    this.height = h;
}

Visual.prototype.setPosition = function(P) {
    this.point = P;
}

Visual.prototype.draw = function(g) {
    
}