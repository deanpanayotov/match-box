var mainCanvas = document.getElementById("canvas");
mainCanvas.width = WIDTH;
mainCanvas.height = HEIGHT;
var mainCanvasContext = mainCanvas.getContext("2d");

var backCanvas = getCanvasInstance();
var backCanvasContext = backCanvas.getContext("2d");

var lightManager = new RenderManager();

lightManager.addLightSource(new LightSource(
    1 + Math.floor(Math.random() * MAZE_WIDTH) * 2 * STEP + STEP / 2,
    1 + Math.floor(Math.random() * MAZE_HEIGHT) * 2 * STEP + STEP / 2,
    [ 100, 70, 40], 5));
lightManager.addLightSource(new LightSource(
    1 + Math.floor(Math.random() * MAZE_WIDTH) * 2 * STEP + STEP / 2,
    1 + Math.floor(Math.random() * MAZE_HEIGHT) * 2 * STEP + STEP / 2,
    [ 120, 80, 50], 5));

var player = undefined;
var maze = undefined;

var delta, now, then;

var animate = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(callback) { window.setTimeout(callback, 1000 / FRAMES_PER_SECOND) };

window.onload = function() {
    loadImages(function(){
        player = new Player();
        maze = new Maze();
        maze.render(backCanvasContext);
        animate(step);
    });
};

function step() {
    setDelta();
    update();
    lightManager.render(mainCanvasContext, render);
    animate(step);
}

function update() {
    player.update();
}

function render(ctx){
    renderMaze(ctx);
    player.render(ctx);
}

function renderMaze(ctx){
    ctx.drawImage(backCanvas, 0, 0);
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

function getCanvasInstance(){
    var canvas = document.createElement('canvas');
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    return canvas;
}