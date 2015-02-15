var mainCanvas = document.getElementById("canvas");
mainCanvas.width = WIDTH;
mainCanvas.height = HEIGHT;
var mainCanvasContext = mainCanvas.getContext("2d");

var backCanvas = getCanvasInstance();
var backCanvasContext = backCanvas.getContext("2d");
var frontCanvas = getCanvasInstance();
var frontCanvasContext = backCanvas.getContext("2d");

var lsmanager = new RenderManager();

lsmanager.addLightSource(new LightSource(
    1 + Math.floor(Math.random() * MAZE_WIDTH) * 2 * STEP + STEP / 2,
    1 + Math.floor(Math.random() * MAZE_HEIGHT) * 2 * STEP + STEP / 2,
    [ 100, 70, 40], 5));
lsmanager.addLightSource(new LightSource(
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
        renderBackground(backCanvasContext);
        maze.render(backCanvasContext);
        animate(step);
    });
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

function render(){
    renderBackground(mainCanvasContext);
    //frontCanvasContext.clearRect(0, 0, frontCanvas.width, frontCanvas.height);
    frontCanvasContext.width = frontCanvasContext.width;
    for (var i = 0; i < RenderManager.LIGHT_LAYERS; i++) {
        mainCanvasContext.save();
        mainCanvasContext.beginPath();
        mainCanvasContext.globalAlpha = 0.4 + 0.2 * i;
        lsmanager.renderLayer(mainCanvasContext, i);
        mainCanvasContext.closePath();
        mainCanvasContext.clip();
        mainCanvasContext.drawImage(backCanvas, 0, 0);
//        mainCanvasContext.drawImage(frontCanvas, 0, 0);
        player.render(mainCanvasContext);
        mainCanvasContext.restore();
    }
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

function getCanvasInstance(){
    var canvas = document.createElement('canvas');
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    return canvas;
}