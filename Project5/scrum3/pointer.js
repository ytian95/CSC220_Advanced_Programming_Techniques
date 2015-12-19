/**
 * A representation of a pointer, mouse or finger
 * @param {String} id
 * @param {Point} initialPosition
 * @returns {Pointer}
 */
function Pointer(id, initialPosition) {
    /*
     * Identifiable id of the pointer
     * @type {String}
     * @private
     */
    this.id = id;
    
    /*
     * Location of the pointer
     * @type {Point}
     * @private
     */
    this.position = initialPosition.clone();
    
    /*
     * If the pointer has selected anything
     * @type {Boolean}
     * @private
     */
    this.isActive = false;
    
    /*
     * Element currently being selected
     * @type {HitTestableElement}
     * @private
     */
    this.element = null; // can only have 1 selected
}

/**
 * Moves the pointer and any selected elements
 * @param {Point} position
 * @returns {undefined}
 */
Pointer.prototype.move = function(position) {
    this.position.setX( position.getX() );
    this.position.setY( position.getY() );
    
    if( this.hasSelectedElement() && 
            this.element instanceof DraggableElement ) {
        this.element.move(position);
    }
}

/**
 * Getter for the location of the pointer
 * @returns {Point}
 */
Pointer.prototype.getPosition = function() {
    return this.position.clone();
}

/**
 * Getter for if the pointer has selected anything
 * @returns {Boolean}
 */
Pointer.prototype.getIsActive = function() {
    return this.isActive;
}

/**
 * Activates the pointer when it has selected something
 * @returns {undefined}
 */
Pointer.prototype.activate = function() {
    this.isActive = true;
}

/**
 * Deactivates the pointer when it has stopped selecting
 * @returns {undefined}
 */
Pointer.prototype.deactivate = function() {
    this.isActive = false;
}

/**
 * If the pointer has selected an element and not just hovered
 * @returns {Boolean}
 */
Pointer.prototype.hasSelectedElement = function() {
    if( this.element !== null && this.isActive ) {
        return true;
    }
    return false;
}

/**
 * Selects and activates the element
 * @param {HitTestableElement} element
 * @returns {undefined}
 */
Pointer.prototype.selectElement = function(element) {
    if(element !== null) {
        this.element = element;
        if(this.isActive) {
            this.element.activate(this.position);
        }
    }
}

/**
 * The element has been deselected
 * @returns {undefined}
 */
Pointer.prototype.deselectElement = function() {
    if(this.element !== null){
        this.element.deactivate();
    }
    this.element = null;
}

/**
 * If possible, move the element based on the pointer location
 * @param {Point} position
 * @returns {undefined}
 */
Pointer.prototype.moveElement = function(position) {
    this.element.move(position);
}