var canvas = document.getElementById("canvas");
canvas.width = WIDTH;
canvas.height = HEIGHT;
var ctx = canvas.getContext("2d");

var player = new Player();
var maze = new Maze();

var delta, now, then;

var cachedMaze = document.createElement('canvas');
cachedMaze.width = WIDTH;
cachedMaze.height = HEIGHT;
var imctx = cachedMaze.getContext("2d");

var animate = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(callback) { window.setTimeout(callback, 1000 / FRAMES_PER_SECOND) };

window.onload = function() {
    renderBackground(imctx);
    maze.render(imctx);
    animate(step);
};

function step() {
    setDelta();
    update();
    render();
    animate(step);
}

function update() {
    player.update();
}

function render() {
    ctx.drawImage(cachedMaze, 0, 0);
    player.render(ctx);
}

function renderBackground(ctx) {
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
}

function oddRange(num){
    return Math.floor(Math.random() * num) * 2 + 1;
}

function evenRange(num) {
    return Math.floor(Math.random() * (num - 1)) * 2 + 2;
}

function setDelta(){
    now = Date.now();
    delta = (now - then) / 1000; // seconds since last frame
    then = now;
}