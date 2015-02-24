/**
 * Created by Dean Panayotov Local on 4.2.2015 г..
 */


var CANVAS_PIXELS = 744;

//square
var WIDTH = CANVAS_PIXELS;
var HEIGHT = CANVAS_PIXELS;

var MAZE_WIDTH = 15;
var MAZE_HEIGHT = 15;

var STEP = Math.min(HEIGHT/(MAZE_HEIGHT*2+1),WIDTH/(MAZE_WIDTH*2+1));

var FRAMES_PER_SECOND = 60;
var WRECK_PERCENTAGE = 1/16;