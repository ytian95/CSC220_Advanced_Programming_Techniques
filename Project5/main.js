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
    areaGroup.addDataPoints(data);
    console.log(areaGroup);
    gameLoop.addElement(areaGroup);
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