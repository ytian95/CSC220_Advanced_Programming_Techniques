function Pointer(id, initialPosition){
    this.id = id;
    this.position = initialPosition.clone();
    this.isActive = false;
}

Pointer.prototype.move = function(position){
    this.position.setX(position.getX());
    this.position.setY(position.getY());
}

Pointer.prototype.getPosition = function(position){
    return this.position.clone();
}

Pointer.prototype.getIsActive = function(){
    return this.isActive;
}

Pointer.prototype.activate = function(){
    this.isActive = true;
}

Pointer.prototype.deactivate = function(){
    this.isActive = false;
}

