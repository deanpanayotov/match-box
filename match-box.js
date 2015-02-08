var maze;

var canvas = document.getElementById("canvas");
canvas.width = WIDTH;
canvas.height = HEIGHT;
var ctx = canvas.getContext("2d");

var animate = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(callback) { window.setTimeout(callback, 1000/60) };

var player = new Player();
var maze;

var drawMaze = function(){
    var img;
    var line
    for(var x=0;x<MAZE_WIDTH*2+1;x++){
        line = maze[x];
        for(var y=0;y<MAZE_HEIGHT*2+1;y++){
            switch (line[y]) {
                case '+':
                    img = a_i_wall_wh_x;
                    break;
                case '-':
                    img = a_i_wall_wh_v;
                    break;
                case '|':
                    img = a_i_wall_wh_h;
                    break;
                default :
                    img = undefined;
                    break;
            }
            if(img)
                ctx.drawImage(img, x * STEP, y * STEP, STEP, STEP);
        }
    }
}

window.onload = function() {
    animate(step);
    maze = display(maze(MAZE_WIDTH, MAZE_HEIGHT));
};

var step = function() {
    update();
    render();
    animate(step);
};

var update = function() {
    player.update();
};

var render = function() {
    renderBackground();
    drawMaze();
    player.render(ctx);
};

var renderBackground = function(){
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
}

var restart = function(){

}

var keysDown = {};

window.addEventListener("keydown", function(event) {
    keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function(event) {
    delete keysDown[event.keyCode];
});

function maze(x,y) {
    var n=x*y-1;
    if (n<0) {alert("illegal maze dimensions");return;}
    var horiz =[]; for (var j= 0; j<x+1; j++) horiz[j]= [],
        verti =[]; for (var j= 0; j<y+1; j++) verti[j]= [],
        here = [Math.floor(Math.random()*x), Math.floor(Math.random()*y)],
        path = [here],
        unvisited = [];
    for (var j = 0; j<x+2; j++) {
        unvisited[j] = [];
        for (var k= 0; k<y+1; k++)
            unvisited[j].push(j>0 && j<x+1 && k>0 && (j != here[0]+1 || k != here[1]+1));
    }
    while (0<n) {
        var potential = [[here[0]+1, here[1]], [here[0],here[1]+1],
            [here[0]-1, here[1]], [here[0],here[1]-1]];
        var neighbors = [];
        for (var j = 0; j < 4; j++)
            if (unvisited[potential[j][0]+1][potential[j][1]+1])
                neighbors.push(potential[j]);
        if (neighbors.length) {
            n = n-1;
            next= neighbors[Math.floor(Math.random()*neighbors.length)];
            unvisited[next[0]+1][next[1]+1]= false;
            if (next[0] == here[0])
                horiz[next[0]][(next[1]+here[1]-1)/2]= true;
            else
                verti[(next[0]+here[0]-1)/2][next[1]]= true;
            path.push(here = next);
        } else
            here = path.pop();
    }
    return {x: x, y: y, horiz: horiz, verti: verti};
}

function display(m) {
    var text= [];
    for (var j= 0; j<m.x*2+1; j++) {
        var line= [];
        if (0 == j%2)
            for (var k=0; k<m.y*2+1; k++)
                if (0 == k%2)
                    line[k]= '+';
                else
                if (j>0 && m.verti[j/2-1][Math.floor(k/2)])
                    line[k]= ' ';
                else
                    line[k]= '-';
        else
            for (var k=0; k<m.y*2+1; k++)
                if (0 == k%2)
                    if (k>0 && m.horiz[(j-1)/2][k/2-1])
                        line[k]= ' ';
                    else
                        line[k]= '|';
                else
                    line[k]= ' ';
        text[j] = line;
    }

    var d = MAZE_WIDTH * MAZE_HEIGHT / 20;
    var x, y;
    while(d > 0){
        x = (d%2==0 ? oddRange(MAZE_WIDTH) : evenRange(MAZE_WIDTH));
        y = (d%2==0 ? evenRange(MAZE_HEIGHT) : oddRange(MAZE_HEIGHT));
        if(text[x][y]!=' '){
            text[x][y] = ' ';
            d--;
        };
    }
    return text;
}

var oddRange = function(num){
    return Math.floor(Math.random() * num) * 2 + 1;
}

var evenRange = function(num){
    return Math.floor(Math.random() * (num - 1)) * 2 + 2;
}