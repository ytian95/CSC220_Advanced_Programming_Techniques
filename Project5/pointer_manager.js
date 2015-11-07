function PointerManager(elementManager){
    this.pointers = {};
    this.elementManager = elementManager;
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
    this.addPointer(id, position);
}

PointerManager.prototype.onPointerMove = function(id, position){
    this.movePointer(id, position);
}

PointerManager.prototype.onPointerActivate = function(id, position){
    this.pointers[id].activate();
    this.setElementToPointer(id, position);
}

PointerManager.prototype.onPointerDeactivate = function(id, position){
    this.pointers[id].deactivate();
    this.unsetElementToPointer(id);
}

PointerManager.prototype.onPointerLeave = function(id, position){
    this.removePointer(id, position);
}

PointerManager.prototype.setElementToPointer = function(id, position){
        var element = this.elementManager.hitTest(position);
        this.pointers[id].selectElement(element);
}

PointerManager.prototype.unsetElementToPointer = function(id){
    this.pointers[id].deselectElement();
}