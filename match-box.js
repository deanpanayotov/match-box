var Game = function(){

    var mainCanvas = document.getElementById("canvas");
    mainCanvas.width = WIDTH;
    mainCanvas.height = HEIGHT;
    var mainCanvasContext = mainCanvas.getContext("2d");

    var backCanvas = getCanvasInstance();
    var backCanvasContext = backCanvas.getContext("2d");

    var lightManager = new RenderManager();

    lightManager.addLightSource(new LightSource(
            1 + Math.floor(Math.random() * MAZE_SIZE) * 2 * STEP + STEP / 2,
            1 + Math.floor(Math.random() * MAZE_SIZE) * 2 * STEP + STEP / 2,
        [ 100, 70, 40], 5));
    lightManager.addLightSource(new LightSource(
            1 + Math.floor(Math.random() * MAZE_SIZE) * 2 * STEP + STEP / 2,
            1 + Math.floor(Math.random() * MAZE_SIZE) * 2 * STEP + STEP / 2,
        [ 120, 80, 50], 5));

    var player = undefined;
    var maze = undefined;
    var stopwatch = undefined;

    var delta, now, then;

    function step() {
        setDelta();
        update();
        lightManager.render(mainCanvasContext, render);
        animate(step);
    }

    function update() {
        player.update(delta, maze);
    }

    function render(ctx){
        renderMaze(ctx);
        player.render(ctx);
    }

    function renderMaze(ctx){
        ctx.drawImage(backCanvas, 0, 0);
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

    this.start = function() {
        player = new Player(lightManager);
        maze = new Maze();
        stopwatch = new Stopwatch(document.getElementById('time'));
        stopwatch.start();
        maze.render(backCanvasContext);
        animate(step);
    };

    this.stop = function(){
        stopwatch.stop();
    }
};

var game = new Game();

window.onload = function() {
    loadImages(function(){
    game.start();
    });
};

var animate = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(callback) { window.setTimeout(callback, 1000 / FRAMES_PER_SECOND) };