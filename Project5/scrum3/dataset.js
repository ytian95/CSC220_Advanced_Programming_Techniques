/**
 * Represents a dataset, which holds information on each
 * chicage area and the data values per community
 * @param {type} dataName
 * @returns {Dataset}
 * @constructor
 */
function Dataset(dataName) {
    /*
     * Name of the dataset
     * @type {String}
     * @private
     */
    this.datasetName = dataName;
    
    /* Data on one specific area community
     * @type DataPiece[]
     * @private
     */
    this.data = [];
    
    /* If the data has finished loading
     * @type {boolean}
     * @private
     */
    this.loaded = false;
    this.maxValue;
    this.minValue;
}

/**
 * Returns the total number of entries
 * @returns {Number}
 */
Dataset.prototype.size = function() {
    return this.data.length;
}

/**
 * Returns the datapiece at a specific index
 * @param {Number} position
 * @returns {DataPiece}
 */
Dataset.prototype.at = function(position) {
    return this.data[position];
}

/**
 * Sets the dataset's name
 * @param {String} name
 * @returns {undefined}
 */
Dataset.prototype.setName = function(name) {
    this.datasetName = name;
}

/**
 * Adds a datapiece to the array
 * @param {DataPiece} dataPiece
 * @returns {undefined}
 */
Dataset.prototype.addData = function(dataPiece) {
    this.data.push(dataPiece);
}

/**
 * Returns the dataset's name
 * @returns {String}
 */
Dataset.prototype.getName = function() {
    return this.datasetName;
}

/**
 * Takes in a JSON file and parses the data for the community
 * area name and its data value
 * @param {JSON} originalData
 * @param {String} dataName
 * @returns {undefined}
 */
Dataset.prototype.parseData = function(originalData, dataName) {
    this.maxValue = originalData.meta.view.columns[9].cachedContents.largest;
    this.minValue = originalData.meta.view.columns[9].cachedContents.smalest;
    
    var columns = originalData.meta.view.columns;
    var areaIndex = 0;
    var dataIndex = 0;
    
    for( var i = 0; i < columns.length; i++ ) {
        if( columns[i].fieldName === "community_area_name" ) {
            areaIndex = i;
        }
        else if( columns[i].fieldName === dataName ) {
            dataIndex = i;
        }
    }
    
    for(var i = 0; i < originalData.data.length; i++){
        var areaName = originalData.data[i][areaIndex];
        var rawData = originalData.data[i][dataIndex];
        var dataPiece = new DataPiece(areaName, parseFloat(rawData));
        this.addData(dataPiece);
    }
}

/**
 * When the resource has finished loading the dataset
 * @param {Resource} resource
 * @returns {undefined}
 */
Dataset.prototype.onLoaded = function(resource) {
    var allData = JSON.parse( resource.getLoadedString() );
    this.parseData(allData, this.datasetName);
    this.loaded = resource.getIsLoaded();
}

/**
 * Returns if the data has been fully loaded or not
 * @returns {Boolean}
 */
Dataset.prototype.isLoaded = function() {
    return this.loaded;
}

/**
 * Represents one area's data
 * @param {String} name
 * @param {Number} value
 * @returns {DataPiece}
 * @constructor
 */
function DataPiece(name, value) {
    /*
     * The community area's name
     * @type {String}
     * @private
     */
    this.name = name;
    
    /*
     * The value associated
     * @type {Number}
     * @private
     */
    this.value = value;
}

/**
 * Returns the community area name
 * @returns {String}
 */
DataPiece.prototype.getName = function() {
    return this.name;
}

/**
 * Returns the data value associated
 * @returns {Number}
 */
DataPiece.prototype.getValue = function() {
    return this.value;
}