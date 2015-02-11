/**
 * Created by Dean Panayotov Local on 5.2.2015 г..
 */

var Player = function(){

    this.const = {
        RADIUS: Math.floor(STEP / 2),
        PI2: Math.PI * 2,

        KEY_LEFT:37,
        KEY_UP:38,
        KEY_RIGHT:39,
        KEY_DOWN:40
    };

    this.x = (1 + Math.floor(Math.random() * MAZE_WIDTH) * 2);
    this.y = (1 + Math.floor(Math.random() * MAZE_HEIGHT) * 2);
    this.nx = this.x;
    this.ny = this.y;
    this.dx = this.x * STEP + STEP / 2;
    this.dy = this.y * STEP + STEP / 2;
    this.tx = this.dx;
    this.ty = this.dy;
    this.isMoving = false;

    this.update = function(){
        if(this.isMoving) {
            this.move();
        }else{
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
        }
    };

    this.moveTo = function(nx, ny) {
        var midx = (this.x + nx) / 2;
        var midy = (this.y + ny) / 2;
        if (maze.cells[midx][midy] === undefined) {
            this.xspeed = midx - this.x;
            this.yspeed = midy - this.y;
            this.nx = nx;
            this.ny = ny;
            this.tx = nx * STEP + STEP / 2;
            this.ty = ny * STEP + STEP / 2;
            this.isMoving = true;
            var that = this;
            this.move();
            return true;
        }
        return false;
    };

    this.endMove = function(that){
        console.log("sss");
        that.isMoving = false;
        that.x = this.nx;
        that.y = this.ny;
        that.dx = this.x * STEP + STEP / 2;
        that.dy = this.y * STEP + STEP / 2;
    }

    this.move = function() {
        this.dx += Player.HOP_SPEED * delta * this.xspeed;
        this.dy += Player.HOP_SPEED * delta * this.yspeed;
        if((this.xspeed != 0 && this.dx * this.xspeed >= this.tx * this.xspeed) ||
            (this.yspeed != 0 && this.dy * this.yspeed >= this.ty * this.yspeed)){
            console.log(this.dy+ " " +this.ty);
            this.isMoving = false;
            this.x = this.nx;
            this.y = this.ny;
            this.dx = this.tx;
            this.dy = this.ty;
        }
    };

    this.render = function(ctx){
        ctx.fillStyle = "#DD77EE";
        ctx.beginPath();
        ctx.arc(this.dx, this.dy, this.const.RADIUS, 0, this.const.PI2);
        ctx.fill()
    };

};

Player.HOP = STEP * 2; // total number of pixels
Player.HOP_INTERVAL = 300; //milliseconds
Player.HOP_SPEED = Player.HOP * (1000 / Player.HOP_INTERVAL);