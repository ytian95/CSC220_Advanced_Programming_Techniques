function ElementManager(){
    this.elements = [];
}

ElementManager.prototype.addElement = function(element){
    this.elements.push(element);
}

ElementManager.prototype.draw = function(g){
    for (var i = 0; i < this.elements.length ; i++) {
        //console.log("element manager");
        this.elements[i].draw(g);
    }
}