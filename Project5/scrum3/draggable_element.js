/**
 * A visual that can be dragged across the screen
 * @returns {DraggableElement}
 * @constructor
 */
function DraggableElement() {
    /*
     * The pointer's offset from the element's x
     * @type {Number}
     * @private
     */
    this.offsetX;
    
    /*
     * The pointer's offset from the element's y
     * @type {Number}
     * @private
     */
    this.offsetY;
}
DraggableElement.prototype = new HitTestableElement();

/**
 * When a pointer has selected the element find the offset
 * @param {Point} position
 * @returns {undefined}
 */
DraggableElement.prototype.activate = function(position){
    this.findOffset(position);
}

/**
 * When the pointer has deselected the element
 * @returns {undefined}
 */
DraggableElement.prototype.deactivate = function(){
}

/**
 * Calculates the offset between the pointer and the object
 * @param {Point} position
 * @returns {undefined}
 */
DraggableElement.prototype.findOffset = function(position) {
    this.offsetX = position.getX() - this.point.getX();
    this.offsetY = position.getY() - this.point.getY();
}

/**
 * Move the element based on the pointer's location
 * @param {Point} position
 * @returns {undefined}
 */
DraggableElement.prototype.move = function(position) {
    this.point.setX( position.getX() - this.offsetX );
    this.point.setY( position.getY() - this.offsetY );
}
