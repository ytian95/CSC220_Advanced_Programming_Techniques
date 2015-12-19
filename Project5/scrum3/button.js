/**
 * A generic button class
 * @constructor
 * @returns {Button}
 */
function Button() {
    /*
     * @type {boolean}
     * @private
     */
    this.isHovered = false;
    
    /**
     * @type {Color}
     * @private
     */
    this.color = "green";
}
Button.prototype = new HitTestableElement();

/**
 * Sets the text of the button
 * @param {String} text
 * @returns {undefined}
 */
Button.prototype.setText = function(text) {
    this.text = text;
}

/**
 * Sets the parent of the button
 * @param {ElementManager} parent
 * @returns {undefined}
 */
Button.prototype.setParent = function(parent) {
    this.parent = parent;
}

/**
 * Toggles if the button has been pressed or not
 * @param {Boolean} bool
 * @returns {undefined}
 */
Button.prototype.setHovered = function(bool) {
    this.isHovered = bool;
}

/**
 * When the button has been clicked. Specific per button type
 * @returns {undefined}
 */
Button.prototype.onClick = function() {
}

/**
 * When the button has been clicked, activate it
 * @param {Point} position
 * @returns {undefined}
 */
Button.prototype.activate = function(position) {
    this.setHovered(true);
    this.onClick();
}

/**
 * The pointer has left the button. unactivate it
 * @returns {undefined}
 */
Button.prototype.deactivate = function() {
    this.setHovered(false)
}

/**
 * Changes the button color depending on whether it is active
 * @returns {undefined}
 */
Button.prototype.setColor = function() {
    if(this.isHovered){
        this.color = "yellow";
    }
    else{
        this.color = "green";
    }
}

/**
 * Draws a green button with text inside
 * @param {Canvas} g
 * @returns {undefined}
 */
Button.prototype.draw = function(g) {
    this.setColor();
    g.fillStyle = this.color;
    g.fillRect(this.point.getX(), this.point.getY(),
        this.width, this.height);

    g.fillStyle = "black";
    var fontSize = 20;
    g.font = fontSize + "px Arial";
    g.fillText(this.text, this.point.getX(), 
            this.point.getY() + this.height/2);
}

/**
 * 
 * @param {Number} width
 * @param {Number} height
 * @returns {undefined}
 */
Button.prototype.resizeCanvas = function(width, height) {
}

/**
 * A button when pressed changes the dataset being viewed
 * @returns {ChangeDataSetButton}
 */
function ChangeDataSetButton() {
    
}
ChangeDataSetButton.prototype = new Button();

/**
 * When the button has been clicked, let the parent know to
 * change the page
 * @constructor
 * @returns {undefined}
 */
ChangeDataSetButton.prototype.onClick = function() {
    this.parent.changePage();
}

/**
 * When the button is selected, make it active and perform the
 * onClick
 * @param {Point} position
 * @returns {undefined}
 */
ChangeDataSetButton.prototype.activate = function(position) {
    Button.prototype.activate.call(this, position);
    this.onClick();
}

/**
 * When the canvas has been resized change its location
 * @param {Number} width
 * @param {Number} height
 * @returns {undefined}
 */
ChangeDataSetButton.prototype.resizeCanvas = function(width, height) {
    Button.prototype.resizeCanvas.call(this, width, height);
    this.setPosition(new Point(width - this.width, this.point.getY()));
}

/**
 * Creates a button that when pressed resets the AreaElements
 * cack to their default locations
 * @constructor
 * @returns {ResetButton}
 */
function ResetButton() {
   
}
ResetButton.prototype = new Button();

/**
 * When pressed let the parent elementManager know to reset the
 * element position
 * @returns {undefined}
 */
ResetButton.prototype.onClick = function() {
    this.parent.resetDataPosition();
}

/**
 * When the button is selected, make it active and perform the
 * onClick
 * @param {Point} position
 * @returns {undefined}
 */
ResetButton.prototype.activate = function(position) {
    Button.prototype.activate.call(this, position);
    this.onClick();
}

/**
 * When the canvas has been resized change its location
 * @param {Number} width
 * @param {Number} height
 * @returns {undefined}
 */
ResetButton.prototype.resizeCanvas = function(width, height) {
    Button.prototype.resizeCanvas.call(this, width, height);
    this.setPosition(new Point(width - this.width, this.point.getY()));
}