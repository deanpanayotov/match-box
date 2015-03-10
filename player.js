/**
 * Created by Dean Panayotov Local on 5.2.2015 г..
 */

var Player = function(positioning){

    this.matchCount = 3;

    this.x = positioning.playerx;
    this.y = positioning.playery;
    this.ex = positioning.endx;
    this.ey = positioning.endy;

    this.nx = this.x;
    this.ny = this.y;
    this.dx = this.x * STEP + STEP / 2;
    this.dy = this.y * STEP + STEP / 2;
    this.tx = this.dx;
    this.ty = this.dy;
    this.isMoving = false;

    var ls = undefined;

    this.update = function(delta, maze, lightManager){
        if(this.isMoving) {
            this.move(delta);
        }else{
            f: for (var key in keysDown) {
                var value = Number(key);
                switch (value) {
                    case Player.KEY_LEFT:
                        if(this.moveTo(this.x - 2, this.y, delta, maze)) break f;
                        break;
                    case Player.KEY_UP:
                        if(this.moveTo(this.x, this.y - 2, delta, maze)) break f;
                        break;
                    case Player.KEY_RIGHT:
                        if(this.moveTo(this.x + 2, this.y, delta, maze)) break f;
                        break;
                    case Player.KEY_DOWN:
                        if(this.moveTo(this.x, this.y + 2, delta, maze)) break f;
                        break;
                }
            }
        }
        for (var key in keysDown) {
            var value = Number(key);
            if(value == Player.KEY_MATCH && !ls && this.matchCount > 0){
                this.matchCount --;
                ls = new LightSource(this.dx, this.dy, [200, 140, 90], 6);
                lightManager.addLightSource(ls);
                setTimeout(function() {setLightOff(lightManager)}, 5000);
            }
        }
    };

    this.moveTo = function(nx, ny, delta, maze) {
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
            this.move(delta);
            return true;
        }
        return false;
    };

    this.endMove = function() {
        this.isMoving = false;
        this.x = this.nx;
        this.y = this.ny;
        this.dx = this.tx;
        this.dy = this.ty;
        if (ls) {
            ls.x = this.dx;
            ls.y = this.dy;
        }

        if(this.x == this.ex && this.y == this.ey){
            console.log("end");
            this.endgameCallback();
        }
    };

    this.move = function(delta) {
        this.dx += Player.HOP_SPEED * delta * this.xspeed;
        this.dy += Player.HOP_SPEED * delta * this.yspeed;
        if (ls) {
            ls.x = this.dx;
            ls.y = this.dy;
        }
        if((this.xspeed != 0 && this.dx * this.xspeed >= this.tx * this.xspeed) ||
            (this.yspeed != 0 && this.dy * this.yspeed >= this.ty * this.yspeed)){
            this.endMove();
        }
    };

    this.render = function(ctx){
        ctx.fillStyle = "#DD77EE";
        ctx.beginPath();
        ctx.arc(this.dx, this.dy, Player.RADIUS, 0, Player.PI2);
        ctx.fill()
    };

    this.setEndGameCallback = function(callback){
        this.endgameCallback = callback;
    }

    var setLightOff = function(lightManager){
        console.log("call");
        if(ls){
            console.log("callin");
            lightManager.removeLightSource(ls.id);
            ls = undefined;
        }
    }

    var lightMatch = function(){

    }

};

Player.HOP = STEP * 2; // total number of pixels
Player.HOP_INTERVAL = 300; //milliseconds
Player.HOP_SPEED = Player.HOP * (1000 / Player.HOP_INTERVAL);

Player.RADIUS = Math.floor(STEP / 2);
Player.PI2 =Math.PI * 2;

Player.KEY_LEFT = 37;
Player.KEY_UP = 38;
Player.KEY_RIGHT = 39;
Player.KEY_DOWN = 40;
Player.KEY_MATCH = 32;