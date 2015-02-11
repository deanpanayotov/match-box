/**
 * Created by Dean Panayotov Local on 11.2.2015 г..
 */

var LightSourceManager = function () {

    this.lightSources = [];
    this.idCounter = 0;
    var that = this;

    this.update = function () {
        for (var i = 0; i < that.lightSources.length; i++) {
            if (that.lightSources[i]) {
                that.lightSources[i].update();
            }
        }
    }

    setInterval(this.update, 200);


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
    var that = this;

    this.update = function () {
        var flicker = Math.random() * that.rflicker * 2 - that.rflicker;
        for (var i = 0; i < 3; i++) {
            that.fr[i] = that.r[i] + ( that.r[i] / 100 ) * flicker;
        }
    };

    this.render = function (ctx, i) {
        ctx.arc(this.x, this.y, this.fr[i], 0, Math.PI * 2);
    }
};