/**
 * Created by Dean Panayotov Local on 5.2.2015 г..
 */

var Player = function(){

    this.const = {
        SPEED: 2,
        STEPS: Math.floor(STEP),
        RADIUS: Math.floor(STEP / 2),
        PI2: Math.PI * 2,

        KEY_LEFT:37,
        KEY_UP:38,
        KEY_RIGHT:39,
        KEY_DOWN:40
    };

    this.x = (1 + Math.floor(Math.random() * MAZE_WIDTH) * 2);
    this.y = (1 + Math.floor(Math.random() * MAZE_HEIGHT) * 2);
    this.xoffset = 0;
    this.yoffset = 0;
    this.steps = 0;

    this.update = function(){
        if(this.steps == 0) {
            f: for (var key in keysDown) {
                var value = Number(key);
                switch (value) {
                    case this.const.KEY_LEFT:
                        if(this.moveTo(this.x - 2, this.y)) break f;
                        break;
                    case this.const.KEY_UP:
                        if(this.moveTo(this.x, this.y - 2)) break f;
                        break;
                    case this.const.KEY_RIGHT:
                        if(this.moveTo(this.x + 2, this.y)) break f;
                        break;
                    case this.const.KEY_DOWN:
                        if(this.moveTo(this.x, this.y + 2)) break f;
                        break;
                }
            }
        } else {
            this.move();
        }
    };

    this.moveTo = function(nx, ny) {
        var midx = (this.x + nx) / 2;
        var midy = (this.y + ny) / 2;
        if (maze.cells[midx][midy] === undefined) {
            this.xspeed = midx - this.x;
            this.yspeed = midy - this.y;
            this.x = nx;
            this.y = ny;
            this.xoffset = Math.floor(STEP * 2) * this.xspeed * -1;
            this.yoffset = Math.floor(STEP * 2) * this.yspeed * -1;

            this.steps = this.const.STEPS;
            this.move();
            return true;
        }
        return false;
    };

    this.move = function() {
        if (this.steps > 0) {
            this.xoffset += this.xspeed * this.const.SPEED;
            this.yoffset += this.yspeed * this.const.SPEED;
            this.steps--;
        }
    };

    this.render = function(ctx){
        ctx.fillStyle = "#DD77EE";
        ctx.beginPath();
        ctx.arc(this.x * STEP + STEP / 2 + this.xoffset, this.y * STEP + STEP / 2 + this.yoffset, this.const.RADIUS, 0, this.const.PI2);
        ctx.fill();
    }

};