function CustomGameLoop() {
    
}
CustomGameLoop.prototype = new GameLoop();

CustomGameLoop.prototype.initialize = function(canvas) {
    GameLoop.prototype.initialize.call(this, canvas);
    this.elementManager = new ElementManager();
    this.dataManager = new DataManager(this.elementManager);
    this.elementManager.setDataManager(this.dataManager);
    this.pointerManager = new PointerManager(this.elementManager);
    
    var _this = this;
    this.devicePixelRatio = window.devicePixelRatio;
    
    var g = canvas.getContext("2d");
    this.g = g;
    
    this.backingStorePixelRatio = g.webkitBackingStorePixelRatio | 1;
    window.addEventListener("resize", function(){
        _this.onWindowResize();
    }, false);
    this.resizeCanvas();
}   

CustomGameLoop.prototype.onWindowResize = function(){
    console.log("resizing!");
    this.resizeCanvas();
}

CustomGameLoop.prototype.resizeCanvas = function(){
    
    this.canvas.width = window.innerWidth * this.devicePixelRatio;
    this.canvas.height = window.innerHeight * this.devicePixelRatio;
    this.canvas.style.width = window.innerWidth + "px";
    this.canvas.style.height = window.innerHeight + "px";
    if(this.dataManager.isAllLoaded()){
        this.elementManager.resizeCanvas(this.canvas.width, this.canvas.height);
    }
}

CustomGameLoop.prototype.setCanvasSize = function(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
}

CustomGameLoop.prototype.addElement = function(element) {
    this.elementManager.add(element);
}

CustomGameLoop.prototype.getData = function(index) {
    return( this.dataManager.getData(index) );
}

CustomGameLoop.prototype.getName = function(index) {
    return( this.dataManager.getName(index) );
}

CustomGameLoop.prototype.getDataManager = function() {
    return this.dataManager;
}

CustomGameLoop.prototype.draw = function(g) {
    g.fillStyle = "lightgray";
    //g.fillRect(0, 0, this.canvas.width, this.canvas.height);
    g.fillRect(0, 0, window.innerWidth, window.innerHeight);
    if(this.dataManager.isAllLoaded()){
        this.drawCurrentName(g);
        this.elementManager.draw(g);
    }
}

CustomGameLoop.prototype.drawCurrentName = function(g) {
    var dataSetName = this.elementManager.getCurrentDataSetName();
    g.fillStyle = "black";
    var fontSize = 20;
    g.font = fontSize + "px Arial"
    g.fillText(dataSetName, 0, this.canvas.height - fontSize);
}

CustomGameLoop.prototype.onPointerEnter = function(id, position) {
    this.pointerManager.onPointerEnter(id, position);
}

//override
CustomGameLoop.prototype.onPointerMove = function(id, position) {
    this.pointerManager.onPointerMove(id, position);
}

CustomGameLoop.prototype.onPointerActivate = function(id, position) {
    this.pointerManager.onPointerActivate(id, position);
}

//override
CustomGameLoop.prototype.onPointerDeactivate = function(id, position) {
    this.pointerManager.onPointerDeactivate(id, position);
}

CustomGameLoop.prototype.onPointerLeave = function(id, position) {
    this.pointerManager.onPointerLeave(id, position);
}