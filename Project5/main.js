function setupTestScenario() {
    var gameLoop = new CustomGameLoop();
    gameLoop.initialize(document.getElementById("canvas"));
    gameLoop.setCanvasSize(640, 480);
    
    //trying to figure out the best way to add the AreaElement to the
    //ElementManager because I don't feel that the ElementManager should
    //be creating new elements by itself. 
    addElementsFromData(gameLoop);
}

function addElementsFromData(gameLoop){
    var data = gameLoop.getData(0);
    var name = gameLoop.getName(0);
    //console.log(data);
    var areaGroup = new AreaGroup();
    areaGroup.setName(name);
    areaGroup.addDataPoints(data, [200, 0, 0]);
    console.log(areaGroup);
    gameLoop.addElement(areaGroup);
    
    data = gameLoop.getData(1);
    name = gameLoop.getName(1);
    //console.log(data);
    var areaGroup = new AreaGroup();
    areaGroup.setName(name);
    areaGroup.addDataPoints(data, [0, 0, 255]);
    console.log(areaGroup);
    gameLoop.addElement(areaGroup);
    
    var button1 = new ChangeDataSetButton();
    button1.setText("change");
    button1.setWidth(70);
    button1.setHeight(40);
    button1.setPosition(new Point(500, 0));
    button1.setDataManager(gameLoop.getDataManager());
    gameLoop.addElement(button1);
    
    var button2 = new ResetButton();
    button2.setText("reset");
    button2.setWidth(70);
    button2.setHeight(40);
    button2.setPosition(new Point(500, 60));
    button2.setDataManager(gameLoop.getDataManager());
    gameLoop.addElement(button2);
}

function initialize() {
    setupTestScenario();
//    var dm = new DataManager();
//    var data = dm.getData(0);
//    var ag = new AreaGroup();
//    ag.addDataPoints(data);
//    console.log(ag);
}

window.onload = initialize;