function ElementManager(dataManager){
    this.elements = [];
    this.dataManager = dataManager;
    this.currentPageIndex = 0;
}

ElementManager.prototype.draw = function(g){
    for(var i = 0; i < this.elements.length; i++){
        if(this.dataManager.getName(this.currentIndexPage)
                === this.elements[i]);
        this.elements[i].draw(g);
    }
}

ElementManager.prototype.add = function(element){
    this.elements.push(element);
}

ElementManager.prototype.addElementsFromData = function(){
//    var currentPageData = this.dataManager.getData(this.currentPageIndex);
//    for(var i = 0; i < currentPageData.length; i++){
//        var datum = currentPageData[i];
//    }
}

ElementManager.prototype.remove = function(element){
    this.elements.splice(this.elements.indexOf(element));
}

ElementManager.prototype.getElementAtPosition = function(index){
    return this.elements[index];
}

ElementManager.prototype.hitTest = function(position){
    for(var i = this.elements.length - 1; i >= 0; i--){
        if(this.elements[i].hitTest(position)){
            return this.elements[i];
        }
    }
    return null;
} 