/**
 * Created by Dean Panayotov Local on 4.2.2015 г..
 */

var MAZE_SIZE = 15;

// if canvas fits window perfectly Chrome/FF create artificial 4px vertical scroll
var VSCROLL_FIX = 4;

var STEP = Math.floor(Math.min(
	(window.innerHeight - VSCROLL_FIX)/(MAZE_SIZE*2+1),
	window.innerWidth/(MAZE_SIZE*2+1)
));

var WIDTH = STEP * (MAZE_SIZE * 2 + 1);
var HEIGHT = STEP * (MAZE_SIZE * 2 + 1);

var FRAMES_PER_SECOND = 60;
var WRECK_PERCENTAGE = 1/16;
