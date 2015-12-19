/**
 * A class that manages all the visual elements on
 * the canvas
 * @returns {ElementManager}
 * @constructor
 */
function ElementManager() {
    /*
     * List of elements contained and being displayed
     * @type Visual[]
     * @private
     */
    this.elements = [];
    
    /*
     * Which dataset is currently being displayed
     * @type {Number}
     * @private
     */
    this.currentPageIndex = 0;
    
    /*
     * List of colors for the data
     * @type {Color[]}
     * @private
     */
    this.colorsList = [[255, 0, 0], [0, 0, 255]];
}

/**
 * Sets up the DataManager to setup elements
 * @param {DataManager} dataManager
 * @returns {undefined}
 */
ElementManager.prototype.setDataManager = function(dataManager) {
    this.dataManager = dataManager;
}

/**
 * Uses the dataManager to create elements
 * @param {Number} numDataSets
 * @returns {undefined}
 */
ElementManager.prototype.initializeData = function(numDataSets) {
    for(var i = 0; i < numDataSets; i++) {
        var data = this.dataManager.getData(i);
        var name = this.dataManager.getName(i);
        var areaGroup = new AreaGroup();
        areaGroup.setName(name);
        areaGroup.setBlockSize(15);
        areaGroup.addDataPoints(data, this.colorsList[i]); //dataset passed in
        this.elements.push(areaGroup);
    }
    
    var button1 = new ChangeDataSetButton();
    button1.setText("change");
    button1.setWidth(70);
    button1.setHeight(40);
    button1.setPosition(new Point(500, 0));
    button1.setParent(this);
    this.add(button1);
    
    var button2 = new ResetButton();
    button2.setText("reset");
    button2.setWidth(70);
    button2.setHeight(40);
    button2.setPosition(new Point(500, 60));
    button2.setParent(this);
    this.add(button2);
    
    this.resizeCanvas(window.innerWidth, window.innerHeight);
}

/**
 * Draws all elements
 * @param {Canvas} g
 * @returns {undefined}
 */
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

/**
 * Resizes all elements based on screen size
 * @param {Number} width
 * @param {Number} height
 * @returns {undefined}
 */
ElementManager.prototype.resizeCanvas = function(width, height){
    for(var i = 0; i < this.elements.length; i++){
        this.elements[i].resizeCanvas(width, height);
    }
}

/**
 * Getter of the name of the current dataset
 * @returns {String}
 */
ElementManager.prototype.getCurrentDataSetName = function() {
    return this.elements[this.currentPageIndex].getName();
}

/**
 * Checks which page the element manager is displaying
 * @param {Number} page
 * @returns {Boolean}
 */
ElementManager.prototype.isCurrentPage = function(page) {
    return( this.dataManager.getName(this.currentPageIndex)
                === this.elements[page].getName() );
}
/**
 * assumes that all the data is added before the buttons
 * Changes the dataset being viewed
 * @returns {undefined}
 */
ElementManager.prototype.changePage = function() {
    this.currentPageIndex += 1;
    if( this.currentPageIndex === this.dataManager.getNumDataSets() ) {
        this.currentPageIndex = 0;
    }
}

/**
 * currently resets only the current page's elements to their
 * efault locations
 * @returns {undefined}
 */
ElementManager.prototype.resetDataPosition = function() {
    this.elements[this.currentPageIndex].resetDataPosition();
}

/**
 * Adds an element to the array
 * @param {Visual} element
 * @returns {undefined}
 */
ElementManager.prototype.add = function(element) {
    this.elements.push(element);
}

/**
 * Removes an element
 * @param {type} element
 * @returns {undefined}
 */
ElementManager.prototype.remove = function(element) {
    this.elements.splice( this.elements.indexOf(element) );
}

/**
 * Gets the visual at the given index
 * @param {Number} index
 * @returns {Visual}
 */
ElementManager.prototype.getElementAtPosition = function(index) {
    return this.elements[index];
}

/**
 * Hittests all elements
 * @param {type} position
 * @returns {HitTestableElement}
 */
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