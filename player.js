/**
 * Created by Dean Panayotov Local on 5.2.2015 г..
 */

var Player = function(){
    this.x = 1;
    this.y = 1;
    this.xspeed = 0;
    this.yspeed = 0;

    this.moveTo = function(nx, ny){
        this.xspeed = nx - this.x;
        this.yspeed = ny - this.y;
    }
}