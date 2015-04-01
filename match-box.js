var Game = function(){

    var mainCanvas = document.getElementById("canvas");
    mainCanvas.width = WIDTH;
    mainCanvas.height = HEIGHT;
    var mainCanvasContext = mainCanvas.getContext("2d");
    var backCanvas = getCanvasInstance();
    var backCanvasContext = backCanvas.getContext("2d");

    var matches = 3;
    var matchesText = document.getElementById('matches');
    var lightManager = new RenderManager();

    var player = undefined;
    var maze = undefined;
    var stopwatch = undefined;

    var delta, now, then;

    var paused = false;

    function step() {
            setDelta();
            update();
            render();
            if (!paused)
                animate(step);
    }

    function update() {
        player.update(delta);
        handleControls();
    }

    function render(){
        mainCanvasContext.globalAlpha = 1;
        mainCanvasContext.clearRect(0, 0, WIDTH, HEIGHT);
        renderMaze(mainCanvasContext);
        player.render(mainCanvasContext);
        lightManager.render(mainCanvasContext);
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

    function lightMatch(){
        if(matches > 0 && player.lightMatch(lightManager)){
            matches--;
            updateMatchCount();
        }
    }

    function updateMatchCount(){
        matchesText.innerHTML = "matches: " + matches;
    }

    function handleControls(){
        if(!player.isMoving){
            if(keysDown[KEY_LEFT])  player.moveTo(player.x - 2, player.y, delta, maze);
            if(keysDown[KEY_RIGHT]) player.moveTo(player.x + 2, player.y, delta, maze);
            if(keysDown[KEY_UP])    player.moveTo(player.x, player.y - 2, delta, maze);
            if(keysDown[KEY_DOWN])  player.moveTo(player.x, player.y + 2, delta, maze);
        }
        if(keysDown[KEY_MATCH])     lightMatch();
        if(keysDown[KEY_RESTART])   restart();
    }

    this.start = function() {
        updateMatchCount();
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

var restart = function() {
    game.stop();
    game = new Game();
    game.start();
}