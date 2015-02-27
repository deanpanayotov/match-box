/**
 * Created by Dean Panayotov Local on 5.2.2015 г..
 */

var Player = function(lightManager, positioning, navigationController){

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

    this.ls = new LightSource(this.dx, this.dy, [200, 140, 90], 6);
    lightManager.addLightSource(this.ls);

    var directionTable = {
        N: { dx:  0, dy: -2 },
        S: { dx:  0, dy:  2 },
        W: { dx: -2, dy:  0 },
        E: { dx:  2, dy:  0 }
    };
    this.update = function(delta, maze){
        if (this.isMoving) {
            this.move(delta);
        } else {
            var direction = directionTable[navigationController.input];

            if (!direction) {
                return;
            }

            this.moveTo(this.x + direction.dx, this.y + direction.dy, delta, maze);
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

    this.endMove = function(){
        this.isMoving = false;
        this.x = this.nx;
        this.y = this.ny;
        this.dx = this.tx;
        this.dy = this.ty;
        this.ls.x = this.dx;
        this.ls.y = this.dy;

        if(this.x == this.ex && this.y == this.ey){
            console.log("end");
            this.endgameCallback();
        }
    };

    this.move = function(delta) {
        this.dx += Player.HOP_SPEED * delta * this.xspeed;
        this.dy += Player.HOP_SPEED * delta * this.yspeed;
        this.ls.x = this.dx;
        this.ls.y = this.dy;
        if((this.xspeed != 0 && this.dx * this.xspeed >= this.tx * this.xspeed) ||
            (this.yspeed != 0 && this.dy * this.yspeed >= this.ty * this.yspeed)){
            this.endMove();
        }
    };

    var symbols = {
        E: '\u2192',
        N: '\u2191',
        W: '\u2190',
        S: '\u2193'
    };
    var symbols2 = {
        E: '>',
        N: '^',
        W: '<',
        S: 'V'
    };
    this.render = function(ctx){
        ctx.fillStyle = "#DD77EE";
        ctx.beginPath();
        ctx.arc(this.dx, this.dy, Player.RADIUS, 0, Player.PI2);
        ctx.fill();

        //ctx.font = '20px bold Monaco';
        ctx.fillStyle = 'black';
        ctx.fillText(symbols2[navigationController.input] || '', this.dx - 4, this.dy + 3);
    };

    this.setEndGameCallback = function(callback){
        this.endgameCallback = callback;
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