/**
 * Created by Dean Panayotov Local on 4.2.2015 г..
 */

var images = [];

function loadImages(callback) {

        var count = 3;
        var onload = function () {
            if (--count == 0) callback();
        };

    images.wall_horizontal = initImage("wall_horizontal", onload);
    images.wall_vertical = initImage("wall_vertical", onload);
    images.wall_intersection = initImage("wall_intersection", onload);
}

function initImage(name, onload){
    var img = document.createElement('img');
    img.addEventListener('load', onload);
    img.src = "assets/images/" + name + ".png";
    return img;
}