function CustomGameLoop(){
    
}
CustomGameLoop.prototype = new GameLoop();

//public override
CustomGameLoop.prototype.initialize = function(canvas){
    GameLoop.prototype.initialize.call(this, canvas);
    this.elementManager = new ElementManager(); //an element manager?
    this.pointerManager = new PointerManager(this.elementManager);
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
    this.elementManager.add(element);
}

//override
CustomGameLoop.prototype.draw = function(g){
    this.elementManager.draw(g);
}

//override
CustomGameLoop.prototype.onPointerEnter = function(id, position){
    this.pointerManager.onPointerEnter(id, position);
}

//override
CustomGameLoop.prototype.onPointerMove = function(id, position){
    this.pointerManager.onPointerMove(id, position);
}

//override
CustomGameLoop.prototype.onPointerActivate = function(id, position){
    this.pointerManager.onPointerActivate(id, position);
}

//override
CustomGameLoop.prototype.onPointerDeactivate = function(id, position){
    this.pointerManager.onPointerDeactivate(id, position);
}

//override
CustomGameLoop.prototype.onPointerLeave = function(id, position){
    this.pointerManager.onPointerLeave(id, position);
}
