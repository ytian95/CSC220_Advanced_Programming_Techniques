//Class DataSeries
//contains the name of the town and the
//data associated
function DataSeries(name)
{
    this.name = name;
    this.data = [];
}

//getData() returns an array of the data points
DataSeries.prototype.getData = function()
{
    return this.data;
}

//addDataPoint() looks like a "private" method. 
//adds points to the array, data
DataSeries.prototype.addDataPoint = function(label, value)
{
    this.data.push(new DataPoint(label, value));
}

//getName() returns the string name location
DataSeries.prototype.getName = function()
{
    return this.name;
}

//Class DataPoint
//represents a point (year, value)
function DataPoint(label, value)
{
    this.label = label;
    this.value = value;
}

//getLabel() returns the year as a string
DataPoint.prototype.getLabel = function()
{
    return this.label;
}

//getValue() returns the float value
DataPoint.prototype.getValue = function()
{
    return this.value;
}

//function not part of either class
//sets up the data being used
function initializeData()
{
    var series1 = new DataSeries("Northampton");
    series1.addDataPoint("2000", 70.0);
    series1.addDataPoint("2001", 72.0);
    series1.addDataPoint("2002", 60.0);
    series1.addDataPoint("2003", 55.0);
    series1.addDataPoint("2004", 43.0);
    series1.addDataPoint("2005", 46.0);
    series1.addDataPoint("2006", 56.0);
    series1.addDataPoint("2007", 67.0);
    series1.addDataPoint("2008", 91.0);
    series1.addDataPoint("2009", 90.0);
    series1.addDataPoint("2010", 78.0);
    var series2 = new DataSeries("Amherst");
    series2.addDataPoint("2000", 76.0);
    series2.addDataPoint("2001", 70.0);
    series2.addDataPoint("2002", 65.0);
    series2.addDataPoint("2003", 40.0);
    series2.addDataPoint("2004", 30.0);
    series2.addDataPoint("2005", 46.0);
    series2.addDataPoint("2006", 23.0);
    series2.addDataPoint("2007", 24.0);
    series2.addDataPoint("2008", 27.0);
    series2.addDataPoint("2009", 30.0);
    series2.addDataPoint("2010", 45.0);
    var series3 = new DataSeries("Easthampton");
    series3.addDataPoint("2000", 45.0);
    series3.addDataPoint("2001", 50.0);
    series3.addDataPoint("2002", 28.0);
    series3.addDataPoint("2003", 33.0);
    series3.addDataPoint("2004", 32.0);
    series3.addDataPoint("2005", 56.0);
    series3.addDataPoint("2006", 60.0);
    series3.addDataPoint("2007", 62.0);
    series3.addDataPoint("2008", 45.0);
    series3.addDataPoint("2009", 57.0);
    series3.addDataPoint("2010", 64.0);
    data.push(series1);
    data.push(series2);
    data.push(series3);
}

//when file called and run, sets up the data 
//in a list called data
var data = [];
initializeData(); //[[NoHo data], [Amh data], [EaHo]]
//alert("data has been initialized");