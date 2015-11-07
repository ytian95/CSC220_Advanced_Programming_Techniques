function CustomGameLoop(){
    
}
CustomGameLoop.prototype = new GameLoop();

CustomGameLoop.prototype.initialize = function(canvas){
    GameLoop.prototype.initialize.call(this, canvas);
    this.elementManager = new ElementManager();
    this.pointerManager = new PointerManager(this.elementManager);
}

CustomGameLoop.prototype.setCanvasSize = function(width, height){
    this.canvas.width = width;
    this.canvas.height = height;
}

CustomGameLoop.prototype.addElement = function(element){
    this.elementManager.add(element);
}

CustomGameLoop.prototype.draw = function(g){
    this.elementManager.draw(g);
}

CustomGameLoop.prototype.onPointerEnter = function(id, position){
    this.pointerManager.onPointerEnter(id, position);
}

//override
CustomGameLoop.prototype.onPointerMove = function(id, position){
    this.pointerManager.onPointerMove(id, position);
}

CustomGameLoop.prototype.onPointerActivate = function(id, position){
    this.pointerManager.onPointerActivate(id, position);
}

//override
CustomGameLoop.prototype.onPointerDeactivate = function(id, position){
    this.pointerManager.onPointerDeactivate(id, position);
}

CustomGameLoop.prototype.onPointerLeave = function(id, position){
    this.pointerManager.onPointerLeave(id, position);
}