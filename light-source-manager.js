/**
 * Created by Dean Panayotov Local on 15.2.2015 г..
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

    setInterval((function(self) { return function() { self.update(); } })(this), LightSourceManager.INTERVAL);


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

LightSourceManager.INTERVAL = 120;
LightSourceManager.LIGHT_LAYERS = 3;