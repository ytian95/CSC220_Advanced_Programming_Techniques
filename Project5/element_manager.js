function ElementManager(dataManager){
    this.elements = [];
    this.dataManager = dataManager;
    this.currentPageIndex = 0;
}

ElementManager.prototype.draw = function(g){
    for(var i = 0; i < this.elements.length; i++){
        if(!(this.elements[i] instanceof AreaGroup)){
            this.elements[i].draw(g);
        }
        else{
            if(this.isCurrentPage(i)){
                this.elements[i].draw(g);
            }
        }
    }
}

ElementManager.prototype.getCurrentDataSetName = function(){
    return this.elements[this.currentPageIndex].getName();
}

ElementManager.prototype.isCurrentPage = function(page){
    return(this.dataManager.getName(this.currentPageIndex)
                === this.elements[page].getName());
}

//assumes that all the data is added before the buttons
ElementManager.prototype.changePage = function(){
    this.currentPageIndex += 1;
    if(this.currentPageIndex === this.dataManager.getNumDataSets()){
        this.currentPageIndex = 0;
    }
}

//currently resets only the current page
ElementManager.prototype.resetDataPosition = function(){
    this.elements[this.currentPageIndex].resetDataPosition();
}

ElementManager.prototype.add = function(element){
    this.elements.push(element);
}

ElementManager.prototype.remove = function(element){
    this.elements.splice(this.elements.indexOf(element));
}

ElementManager.prototype.getElementAtPosition = function(index){
    return this.elements[index];
}

ElementManager.prototype.hitTest = function(position){
    for(var i = this.elements.length - 1; i >= 0; i--){
        if(this.elements[i] instanceof AreaGroup && this.isCurrentPage(i)){
            console.log("hittested");
            return this.elements[i].hitTestAndFind(position);
        }
        else if(this.elements[i] instanceof HitTestableElement &&
            this.elements[i].hitTest(position)){
                console.log("hit tested button");
                return this.elements[i];
        }
    }
    return null;
} 