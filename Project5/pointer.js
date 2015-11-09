function Pointer(id, initialPosition) {
    this.id = id;
    this.position = initialPosition.clone();
    this.isActive = false;
    this.element = null; // can only have 1 selected
}

Pointer.prototype.move = function(position) {
    this.position.setX( position.getX() );
    this.position.setY( position.getY() );
    
    if( this.hasSelectedElement() && 
            this.element instanceof DraggableElement ) {
        this.element.move(position);
    }
}

Pointer.prototype.getPosition = function() {
    return this.position.clone();
}

Pointer.prototype.getIsActive = function() {
    return this.isActive;
}

Pointer.prototype.activate = function() {
    this.isActive = true;
}

Pointer.prototype.deactivate = function() {
    this.isActive = false;
}

Pointer.prototype.hasSelectedElement = function() {
    if( this.element !== null && this.isActive ) {
        return true;
    }
    return false;
}

Pointer.prototype.selectElement = function(element) {
    if(element !== null && this.isActive) {
        this.element = element;
        if( element instanceof DraggableElement ) {
            this.element.findOffset(this.position);
        }
        else if( element instanceof Button ) {
            this.element.setHovered(true);
            this.element.onClick();
        }
    }
}

Pointer.prototype.deselectElement = function() {
    if( this.element instanceof Button ) {
        this.element.setHovered(false);
    }
    this.element = null;
}

Pointer.prototype.moveElement = function(position) {
    this.element.move(position);
}