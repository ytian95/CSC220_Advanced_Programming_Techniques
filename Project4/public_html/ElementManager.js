function ElementManager(){
    this.elements = [];
}

ElementManager.prototype.draw = function(g){
    for(var i = 0; i < this.elements.length; i++){
        this.elements[i].draw(g);
    }
}

ElementManager.prototype.add = function(element){
    this.elements.push(element);
}

ElementManager.prototype.remove = function(element){
    this.elements.splice(this.elements.indexOf(element));
}

ElementManager.prototype.getElements = function(){
    return this.elements;
}

ElementManager.prototype.getElementAtPosition = function(index){
    return this.elements[index];
}

ElementManager.prototype.hitTest = function(position){
    //the first one is the bg, don't look at it.
    for(var i = this.elements.length - 1; i > 0; i--){
        if(this.elements[i].hitTest(position)){
            return this.elements[i];
        }
    }
    return null;
} 