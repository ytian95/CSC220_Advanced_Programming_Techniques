function HitTestableElement(x, y, width, height)
{
    this.position = new Point(x, y);
    this.width = width;
    this.height = height;
}

function Bar(x, y, width, height)
{
    HitTestableElement.call(this, x, y, width, height);
    console.log(this.width);
}

Bar.prototype = new HitTestableElement();

function Point(x, y)
{
    this.x = x;
    this.y = y;
}

function main()
{
    var bar1 = new Bar(1,2,3,4);
    bar1.position.x = 10;
    bar1.width = 50;
    var bar2 = new Bar();
    console.info("bar1: x=" + bar1.position.x + ", y=" + bar1.position.y + ", w=" + bar1.width);
    console.info("bar2: x=" + bar2.position.x + ", y=" + bar2.position.y + ", w=" + bar2.width);
}

window.onload = main;
