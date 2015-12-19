/**
 * Ntifies if the elemnt is being clicked on
 * @returns {HitTestableElement}
 * @constructor
 */
function HitTestableElement() {
    
}
HitTestableElement.prototype = new Visual();

/**
 * Checks if the pointer is on the element
 * @param {Point} p
 * @returns {Boolean}
 */
HitTestableElement.prototype.hitTest = function(p) {
    if( (p.getX() >= this.point.getX() &&
            p.getX() <= this.point.getX() + this.width) &&
       (p.getY() >= this.point.getY() &&
            p.getY() <= this.point.getY() + this.height) ) {
        return true;
    }
    return false;
}