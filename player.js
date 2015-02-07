/**
 * Created by Dean Panayotov Local on 5.2.2015 г..
 */

var Player = function(){

    this.const = {
        SPEED: 1,
        STEPS: Math.floor(STEP),
        RADIUS: STEP/2,
        PI2: Math.PI*2,

        KEY_LEFT:37,
        KEY_UP:38,
        KEY_RIGHT:39,
        KEY_DOWN:40
    };

    this.x = (1 + Math.floor(Math.random()*MAZE_WIDTH)*2);
    this.y = (1 + Math.floor(Math.random()*MAZE_HEIGHT)*2);
    this.xoffset = 0;
    this.yoffset = 0;
    this.steps = 0;

    this.update = function(){
        if(this.steps == 0) {
            for (var key in keysDown) {
                var value = Number(key);
                switch (value) {
                    case this.const.KEY_LEFT:
                        this.moveTo(this.x - 1, this.y);
                        break;
                    case this.const.KEY_UP:
                        this.moveTo(this.x, this.y - 1);
                        break;
                    case this.const.KEY_RIGHT:
                        this.moveTo(this.x + 1, this.y);
                        break;
                    case this.const.KEY_DOWN:
                        this.moveTo(this.x, this.y + 1);
                        break;
                }
            }
        } else {
            this.move();
        }
    }

    this.moveTo = function(nx, ny) {
        if (maze[nx][ny] === ' ') {
            this.xspeed = nx - this.x;
            this.x = nx;
            this.xoffset = this.const.STEPS * this.xspeed * -1;
            this.yspeed = ny - this.y;
            this.y = ny;
            this.yoffset = this.const.STEPS * this.yspeed * -1;
            this.steps = this.const.STEPS;
            this.move();
        }
    }

    this.move = function() {
        console.log(this.xoffset+" "+this.yoffset+" "+this.xspeed+" "+this.yspeed);
        if (this.steps > 1) {
            this.xoffset += this.xspeed * this.const.SPEED;
            this.yoffset += this.yspeed * this.const.SPEED;
            this.steps --;
        } else if (this.steps == 1){
            this.xoffset = 0;
            this.yoffset = 0;
            this.steps --;
        }
    }

    this.render = function(ctx){
        ctx.fillStyle = "#DD77EE";
        ctx.beginPath();
        ctx.arc(this.x * STEP + STEP/2 + this.xoffset, this.y * STEP + STEP/2 + this.yoffset, this.const.RADIUS, 0, this.const.PI2);
        ctx.fill();
    }

}