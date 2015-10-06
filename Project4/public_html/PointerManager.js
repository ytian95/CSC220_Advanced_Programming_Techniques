function PointerManager(){
    this.pointers = {};
}

PointerManager.prototype.addPointer = function(id, position){
    this.pointers[id] = new Pointer(id, position);
}

PointerManager.prototype.removePointer = function(id, position){
    delete this.pointers[id];
}

PointerManager.prototype.movePointer = function(id, position){
    this.pointers[id].move(position);
}

PointerManager.prototype.hasPointer = function(id){
    return typeof this.pointers[id] !== "undefined";
}

PointerManager.prototype.onPointerEnter = function(id, position){
    console.log(id + " has entered");
    this.addPointer(id, position);
}

PointerManager.prototype.onPointerMove = function(id, position){
    this.movePointer(id, position);
}

PointerManager.prototype.onPointerActivate = function(id, position){
    this.pointers[id].activate();
}

PointerManager.prototype.onPointerDeactivate = function(id, position){
    this.pointers[id].deactivate();
}

PointerManager.prototype.onPointerLeave = function(id, position){
    console.log(id + " has left");
    this.removePointer(id, position);
}