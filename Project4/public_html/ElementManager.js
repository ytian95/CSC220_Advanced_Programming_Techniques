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