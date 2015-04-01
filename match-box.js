var Game = function(){

    var mainCanvas = document.getElementById("canvas");
    mainCanvas.width = WIDTH;
    mainCanvas.height = HEIGHT;
    var mainCanvasContext = mainCanvas.getContext("2d");

    var backCanvas = getCanvasInstance();
    var backCanvasContext = backCanvas.getContext("2d");

    var lightManager = new RenderManager();

    var player = undefined;
    var maze = undefined;
    var stopwatch = undefined;

    var delta, now, then;

    var paused = false;

    function step() {
        setDelta();
        update();
        lightManager.render(mainCanvasContext, render);
        if(!paused)
            animate(step);
    }

    function update() {
        player.update(delta);
        handleControls();
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

    function handleControls(){
        if(!player.isMoving){
            f: for (var key in keysDown) {
                var value = Number(key);
                switch (value) {
                    case KEY_LEFT:
                        if(player.moveTo(player.x - 2, player.y, delta, maze)) break f;
                        break;
                    case KEY_UP:
                        if(player.moveTo(player.x, player.y - 2, delta, maze)) break f;
                        break;
                    case KEY_RIGHT:
                        if(player.moveTo(player.x + 2, player.y, delta, maze)) break f;
                        break;
                    case KEY_DOWN:
                        if(player.moveTo(player.x, player.y + 2, delta, maze)) break f;
                        break;
                }
            }
        }
        for (var key in keysDown) {
            var value = Number(key);
            if(value == KEY_MATCH){
                player.lightMatch(lightManager);
            }
        }
    }

    this.start = function() {
        maze = new Maze(lightManager);
        player = new Player(maze.positioning);
        player.setEndGameCallback(this.stop);
        stopwatch = new Stopwatch(document.getElementById('time'));
        stopwatch.start();
        maze.render(backCanvasContext);
        animate(step);
    };

    this.stop = function(){
        stopwatch.stop();
        paused = true;
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