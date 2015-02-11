/**
 * Created by Dean Panayotov Local on 11.2.2015 г..
 */

var LightSourceManager = function () {

    this.lightSources = [];
    this.idCounter = 0;

    this.update = function () {
        for (var i = 0; i < this.lightSources.length; i++) {
            if (this.lightSources[i]) {
                this.lightSources[i].update();
            }
        }
    }

    setInterval((function(self) { return function() { self.update(); } })(this), 200);


    this.addLightSource = function (ls) {
        this.lightSources[this.idCounter] = ls;
        return this.idCounter++;
    }

    this.removeLightSource = function (id) {
        this.lightSources[id] = undefined;
    }

    this.renderLayer = function (ctx, i) {
        for (var j = 0; j < this.lightSources.length; j++) {
            if (this.lightSources[j]) {
                this.lightSources[j].render(ctx, i);
            }
        }
    }
}

var LightSource = function (x, y, r, rflicker) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.fr = r.slice;
    this.rflicker = rflicker;

    this.update = function () {
        var flicker = Math.random() * this.rflicker * 2 - this.rflicker;
        for (var i = 0; i < 3; i++) {
            this.fr[i] = this.r[i] + ( this.r[i] / 100 ) * flicker;
        }
    };

    this.render = function (ctx, i) {
        if(i==0){console.log("x:"+this.x+" r:"+this.fr[i]);}
        ctx.arc(this.x, this.y, this.fr[i], 0, Math.PI * 2);
    }
};