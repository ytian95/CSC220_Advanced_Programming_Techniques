function ElementManager() {
    console.log("elem mamager created");
    this.elements = [ ];
    this.currentPageIndex = 0;
    this.colorsList = [[255, 0, 0], [0, 0, 255]];
}

ElementManager.prototype.setDataManager = function(dataManager){
    this.dataManager = dataManager;
}

ElementManager.prototype.initializeData = function(numDataSets){
    for(var i = 0; i < numDataSets; i++){
        var data = this.dataManager.getData(i);
        var name = this.dataManager.getName(i);
        var areaGroup = new AreaGroup();
        areaGroup.setName(name);
        areaGroup.addDataPoints(data, this.colorsList[i]); //dataset passed in
        this.elements.push(areaGroup);
    }
    
    var button1 = new ChangeDataSetButton();
    button1.setText("change");
    button1.setWidth(70);
    button1.setHeight(40);
    button1.setPosition(new Point(1400, 0));
    button1.setDataManager(this.dataManager);
    this.add(button1);
    
    var button2 = new ResetButton();
    button2.setText("reset");
    button2.setWidth(70);
    button2.setHeight(40);
    button2.setPosition(new Point(1400, 60));
    button2.setDataManager(this.dataManager);
    this.add(button2);
    
    console.log(this.elements);
}

ElementManager.prototype.draw = function(g) {
    for( var i = 0; i < this.elements.length; i++ ) {
        if( !(this.elements[i] instanceof AreaGroup) ) {
            this.elements[i].draw(g);
        }
        else{
            if( this.isCurrentPage(i) ){
                this.elements[i].draw(g);
            }
        }
    }
}

ElementManager.prototype.getCurrentDataSetName = function() {
    return this.elements[this.currentPageIndex].getName();
}

ElementManager.prototype.isCurrentPage = function(page) {
    return( this.dataManager.getName(this.currentPageIndex)
                === this.elements[page].getName() );
}

//assumes that all the data is added before the buttons
ElementManager.prototype.changePage = function() {
    this.currentPageIndex += 1;
    if( this.currentPageIndex === this.dataManager.getNumDataSets() ) {
        this.currentPageIndex = 0;
    }
}

//currently resets only the current page
ElementManager.prototype.resetDataPosition = function() {
    this.elements[this.currentPageIndex].resetDataPosition();
}

ElementManager.prototype.add = function(element) {
    this.elements.push(element);
}

ElementManager.prototype.remove = function(element) {
    this.elements.splice( this.elements.indexOf(element) );
}

ElementManager.prototype.getElementAtPosition = function(index) {
    return this.elements[index];
}

ElementManager.prototype.hitTest = function(position) {
    for( var i = this.elements.length - 1; i >= 0; i-- ) {
        if( this.elements[i] instanceof AreaGroup && this.isCurrentPage(i) ) {
            return this.elements[i].hitTestAndFind(position);
        }
        else if( this.elements[i] instanceof HitTestableElement &&
            this.elements[i].hitTest(position) ) {
                return this.elements[i];
        }
    }
    return null;
} 