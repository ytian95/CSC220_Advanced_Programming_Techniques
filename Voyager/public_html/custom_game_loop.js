// <editor-fold desc="CustomGameLoop">
function CustomGameLoop() {
    
}

CustomGameLoop.prototype = new GameLoop();

//CustomGameLoop.prototype.generateFakePointData = function(f, n, color) {
//    var returnData = new PointData();
//    returnData.setColor(color);
//    var step = 1000 / n;
//    var randomSpread = 200;
//    for (var i = 0; i < n; i++) {
//        var x = i * step;
//        var point = 
//                new Point(
//                    x + (Math.random() * randomSpread - randomSpread / 2), 
//                    f(x) + (Math.random() * randomSpread - randomSpread / 2));
//        returnData.addPoint(point);
//    }
//    return returnData;
//}

CustomGameLoop.prototype.initialize = function(canvas) {
    GameLoop.prototype.initialize.call(this, canvas);
    // add initialization here
    this.elementManager = new ElementManager();
}

CustomGameLoop.prototype.addElement = function(element){
    this.elementManager.addElement(element);
}

CustomGameLoop.prototype.setCanvasSize = function(width, height){
    this.canvas.width = width;
    this.canvas.height = height;
}

CustomGameLoop.prototype.draw = function(g) {
    g.fillStyle = "black";
    g.fillRect(0, 0, this.canvas.width, this.canvas.height);
    // add drawing here
    this.elementManager.draw(g);
}
// </editor-fold>
