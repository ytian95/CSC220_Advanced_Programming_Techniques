function VisualPage(){
    this.visuals = [];
}

VisualPage.prototype.addVisual = function(visual){
    this.visuals.push(visual);
}

VisualPage.prototype.draw = function(g){
    for(var i = 0; i < this.visuals.length; i++){
        this.visuals[i].draw();
    }
}

VisualPage.prototype.hitTest = function(position){
    for(var i = this.visuals.length - 1; i >= 0; i--){
        if(this.visuals[i] instanceof HitTestableElement &&
            this.elements[i].hitTest(position)){
            return this.visuals[i];
            }
    }
}