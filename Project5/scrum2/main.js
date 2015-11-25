function setupTestScenario() {
    var gameLoop = new CustomGameLoop();
    gameLoop.initialize( document.getElementById("canvas") );
    gameLoop.setCanvasSize(600, 600);

    //addElementsFromData(gameLoop);
}

//currently unused
function addElementsFromData(gameLoop) {
    var button1 = new ChangeDataSetButton();
    button1.setText("change");
    button1.setWidth(70);
    button1.setHeight(40);
    button1.setPosition(new Point(1400, 0));
    button1.setDataManager(gameLoop.getDataManager());
    gameLoop.addElement(button1);
    
    var button2 = new ResetButton();
    button2.setText("reset");
    button2.setWidth(70);
    button2.setHeight(40);
    button2.setPosition(new Point(1400, 60));
    button2.setDataManager(gameLoop.getDataManager());
    gameLoop.addElement(button2);
}

function initialize() {
  setupTestScenario();
}

window.onload = initialize;