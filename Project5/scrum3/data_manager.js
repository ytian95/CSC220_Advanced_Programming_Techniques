/**
 * Manages all the Datasets being used
 * @param {ElementManager} elementManager
 * @returns {DataManager}
 */
function DataManager(elementManager) {
    /*
     * The element manager
     * @type {ElementManager}
     * @private
     */
    this.elementManager = elementManager;
    
    /*
     * Keeps track of the data loaded
     * @type {Number}
     * @private
     */
    this.counter = 0;
    
    /*
     * An object that holds information on all the datasets and their names
     * @type {Object}
     * @private
     */
    this.data = {
        names : {},
        datasets : {}
    };
    
    /**
     * Holds all the resource objects used
     * @type {Resource[]}
     * @private
     */
    this.resources = [];
    this.initialize();
}

/**
 * Initializes all the datasets being used
 * @returns {undefined}
 */
DataManager.prototype.initialize = function() {
    var resource1 = new Resource("Data/sqftElecData.json");
    resource1.datasetName = "kwh_total_sqft";
    this.resources.push(resource1);
    
    var resource2 = new Resource("Data/sqftGasData.json");
    resource2.datasetName = "therms_total_sqft";
    this.resources.push(resource2);
    
    for(var i = 0; i < this.resources.length; i++) {
        this.resources[i].beginLoad(this, this.onLoaded, null);
    }
}

/**
 * Called when a dataSet has been loaded
 * @param {Resource} resource
 * @returns {undefined}
 */
DataManager.prototype.onLoaded = function(resource) {
    var dataName = resource.datasetName;
    this.data.names[this.counter] = dataName;
    var dataset = new Dataset(dataName);
    dataset.onLoaded(resource);
    this.data.datasets[dataName] = dataset;
    this.counter += 1;
    if( this.isAllLoaded() ) {
        this.elementManager.initializeData(this.counter);
    }
}

/**
 * checks if all the data has been loaded
 * @returns {Boolean}
 */
DataManager.prototype.isAllLoaded = function() {
    for(var i = 0; i < this.resources.length; i++){
        if(!this.resources[i].getIsLoaded()){
            return false;
        }
    }
    return true;
}

/**
 * Given the index returns the name of the dataset
 * @param {Number} index
 * @returns {String}
 */
DataManager.prototype.getName = function(index) {
    return this.data.names[index];
}

/**
 * Returns the specific dataset at an index
 * @param {Number} index
 * @returns {Dataset}
 */
DataManager.prototype.getData = function(index) {
    return this.data.datasets[this.getName(index)];
}

/**
 * Sets the elementManager connection
 * @param {ElementManager} elementManager
 * @returns {undefined}
 */
DataManager.prototype.setElementManager = function(elementManager) {
    this.elementManager = elementManager;
}

/**
 * Gets the total number of datasets stored
 * @returns {Number}
 */
DataManager.prototype.getNumDataSets = function() {
    return this.counter;
}