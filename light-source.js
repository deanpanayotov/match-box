/**
 * Created by Dean Panayotov Local on 11.2.2015 г..
 */

var LightSource = function (x, y, r, rflicker) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.fr = this.r.slice();
    this.rflicker = rflicker;

    this.update = function () {
        var flicker = Math.random() * this.rflicker * 2 - this.rflicker;
        for (var i = 0; i < 3; i++) {
            this.fr[i] = this.r[i] + ( this.r[i] / 100 ) * flicker;
        }
    };

    this.render = function (ctx, i) {
        ctx.moveTo(this.x, this.y);
        ctx.arc(this.x, this.y, this.fr[i], 0, Math.PI * 2);
    }
};