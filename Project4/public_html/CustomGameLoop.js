function CustomGameLoop(){
    
}
CustomGameLoop.prototype = new GameLoop();

//public override
CustomGameLoop.prototype.initialize = function(canvas){
    GameLoop.prototype.initialize.call(this, canvas);
    this.elements = new ElementManager(); //an element manager?
    //so when calling addElement, actually
    //adding it to the element manager
    //this.setCanvasSize(600, 400);
}

//public
CustomGameLoop.prototype.setCanvasSize = function(width, height){
    this.canvas.width = width;
    this.canvas.height = height;
}

//override
CustomGameLoop.prototype.addElement = function(element){
    this.elements.add(element);
}

//override
CustomGameLoop.prototype.draw = function(g){
    this.elements.draw(g);
}

//override
CustomGameLoop.prototype.onPointerEnter = function(id, position){
    
}

//override
CustomGameLoop.prototype.onPointerMove = function(id, position){
    
}

//override
CustomGameLoop.prototype.onPointerActivate = function(id, position){
    
}

//override
CustomGameLoop.prototype.onPointerDeactivate = function(id, position){
    
}

//override
CustomGameLoop.prototype.onPointerLeave = function(id, position){
    
}
