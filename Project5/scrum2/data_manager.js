function DataManager(elementManager) {
    this.elementManager = elementManager;
    this.counter = 0;
    this.data = {
        names : {},
        datasets : {}
    };
    this.resources = [];
    this.initialize();
}

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

DataManager.prototype.isAllLoaded = function() {
    for(var i = 0; i < this.resources.length; i++){
        if(!this.resources[i].getIsLoaded()){
            return false;
        }
    }
    return true;
}

DataManager.prototype.getName = function(index) {
    return this.data.names[index];
}

DataManager.prototype.getData = function(index) {
    return this.data.datasets[this.getName(index)];
}

DataManager.prototype.setElementManager = function(elementManager) {
    this.elementManager = elementManager;
}

DataManager.prototype.getNumDataSets = function() {
    return this.counter;
}