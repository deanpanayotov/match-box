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