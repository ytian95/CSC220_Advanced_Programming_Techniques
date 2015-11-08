function CustomGameLoop(){
    
}
CustomGameLoop.prototype = new GameLoop();

CustomGameLoop.prototype.initialize = function(canvas){
    GameLoop.prototype.initialize.call(this, canvas);
    this.dataManager = new DataManager();
    this.elementManager = new ElementManager(this.dataManager);
    this.pointerManager = new PointerManager(this.elementManager);
}

CustomGameLoop.prototype.setCanvasSize = function(width, height){
    this.canvas.width = width;
    this.canvas.height = height;
}

CustomGameLoop.prototype.addElement = function(element){
    this.elementManager.add(element);
}

CustomGameLoop.prototype.getData = function(index){
    return(this.dataManager.getData(index));
}

CustomGameLoop.prototype.getName = function(index){
    return(this.dataManager.getName(index));
}

CustomGameLoop.prototype.test = function(){
    this.dataManager.test();
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