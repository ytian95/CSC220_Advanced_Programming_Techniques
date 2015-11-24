function AreaManager(){
    this.areas = [];
}

AreaManager.prototype.draw = function(g){
    for(var i = 0; i < this.areas.length; i++){
        this.areas[i].draw(g);
    }
}