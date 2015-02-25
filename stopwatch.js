/**
 * Created by Dean Panayotov Local on 25.2.2015 г..
 */

function Stopwatch(text, updateInterval) {

    this.text = text;
    this.updateInterval = updateInterval ? updateInterval : 100;
    this.startAt = 0;
    this.lapTime = 0;

    //returns current time
    this.now = function () {
        return (new Date()).getTime();
    };

    this.start = function () {
        this.startAt = this.startAt ? this.startAt : this.now();
        var that = this;
        this.timer = this.timer ? this.timer : setInterval(function () {
            that.update()
        }, this.updateInterval);
    };

    this.stop = function () {
        this.update();
        this.lapTime = this.startAt ? this.lapTime + this.now() - this.startAt : this.lapTime;
        clearInterval(this.timer);
        this.startAt = this.timer = 0;
    };

    this.reset = function () {
        this.lapTime = 0;
        this.startAt = this.startAt ? this.now() : 0;
        this.update();
    };

    //adds zero padding to numbers
    this.pad = function (num, size) {
        var s = "00000" + num;
        return s.substr(s.length - size);
    };

    this.formattedTime = function () {
        var m, s, ms;
        var time = this.lapTime + (this.startAt ? this.now() - this.startAt : 0);

        time = time % (60 * 60 * 1000);
        m = Math.floor(time / (60 * 1000));
        time = time % (60 * 1000);
        s = Math.floor(time / 1000);
        ms = time % 1000;

        return m + ':' + this.pad(s, 2) + '.' + this.pad(ms, 3);
    };

    this.update = function () {
        this.text.innerHTML = this.formattedTime();
    };
}

////////////////////////////////////////////////////////////

var stopwatch = new Stopwatch(document.getElementById('time'));