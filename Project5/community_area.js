function CommunityArea(name, x, y, width, height){
    this.name = name;
    this.x = x;
    this.y = y;
    this.width = width;
    this.heght = height;
    this.padding = 5;
}
CommunityArea.prototype = new HitTestableElement();

CommunityArea.prototype.addData = function(data){
    this.dataPoint = data;
    this.name = this.getAreaName();
    this.value = this.getValue();
}

CommunityArea.prototype.getAreaName = function(){
    return this.dataPoint.getName();
}

CommunityArea.prototype.getValue = function(){
    return this.datapPoint.getData();
}

CommunityArea.prototype = function draw(g){
    
}