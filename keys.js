/**
 * Created by Dean Panayotov Local on 8.2.2015 г..
 */
var keysDown = {};

window.addEventListener("keydown", function (event) {
    keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function (event) {
    delete keysDown[event.keyCode];
});


////////// key mapping ////////////
KEY_LEFT    = 37;   // left arrow
KEY_UP      = 38;   // up arrow
KEY_RIGHT   = 39;   // right arrow
KEY_DOWN    = 40;   // down arrow
KEY_MATCH   = 32;   // space
KEY_RESTART = 82    // r/R