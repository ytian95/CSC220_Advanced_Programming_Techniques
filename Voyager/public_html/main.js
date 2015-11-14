
function initialize(){
    var gameLoop = new CustomGameLoop();
    gameLoop.initialize(document.getElementById("canvas"));
    gameLoop.setCanvasSize(640, 480);
    
    var starField = new StarField();
    starField.initialize(640, 480, 2, [1,2], 1);
    gameLoop.addElement(starField);
    
    var starField2 = new StarField();
    starField2.initialize(640, 480, .5, [2, 3], 2);
    gameLoop.addElement(starField2);
    
    var starField3 = new StarField();
    starField3.initialize(640, 480, .2, [3, 6], 3);
    gameLoop.addElement(starField3);
    
   var spaceship = new Spaceship();
   spaceship.loadURL("voyager.png");
   spaceship.setWidth(100);
   spaceship.setHeight(33);
   spaceship.setPosition(new Point(300, 200));
   gameLoop.addElement(spaceship);
    
    
}

window.onload = initialize;