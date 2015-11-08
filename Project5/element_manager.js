function ElementManager(dataManager){
    this.elements = [];
    this.dataManager = dataManager;
    this.currentPageIndex = 0;
}

ElementManager.prototype.draw = function(g){
    //console.log("drawing");
    for(var i = 0; i < this.elements.length; i++){
        if(!(this.elements[i] instanceof AreaGroup)){
            console.log("is not a areagroup");
            this.elements[i].draw(g);
        }
        else{
            console.log("in the else");
            console.log(this.dataManager.getName(this.currentPageIndex));
            if( this.dataManager.getName(this.currentPageIndex)
                === this.elements[i].getName()){
            
                console.log("is a areagroup");
                this.elements[i].draw(g);
            }
        }
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
        if(this.elements[i] instanceof AreaGroup){
            return this.elements[i].hitTestAndFind(position);
        }
        else if(this.elements[i] instanceof HitTestableElement &&
            this.elements[i].hitTest(position)){
                return this.elements[i];
        }
    }
    return null;
} 