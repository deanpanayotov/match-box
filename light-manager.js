/**
 * Created by Dean Panayotov Local on 15.2.2015 г..
 */
var RenderManager = function () {

    this.lightSources = [];
    this.idCounter = 0;

    this.update = function () {
        for (var i = 0; i < this.lightSources.length; i++) {
            if (this.lightSources[i]) {
                this.lightSources[i].update();
            }
        }
    }

    setInterval((function(self) { return function() { self.update(); } })(this), RenderManager.INTERVAL);


    this.addLightSource = function (ls) {
        this.lightSources[this.idCounter] = ls;
        return this.idCounter++;
    }

    this.removeLightSource = function (id) {
        this.lightSources[id] = undefined;
    }

    this.render = function(ctx, renderVisibleObjects){
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        for (var i = 0; i < RenderManager.LIGHT_LAYERS; i++) {
            ctx.save();
            ctx.globalAlpha = RenderManager.MIN_ALPHA + RenderManager.ALPHA_STEP * i;
            this.renderLayer(ctx, i);
            ctx.clip();
            renderVisibleObjects(ctx);
            ctx.restore();
        }
    }

    this.renderLayer = function (ctx, i) {
        ctx.beginPath();
        for (var j = 0; j < this.lightSources.length; j++) {
            if (this.lightSources[j]) {
                this.lightSources[j].render(ctx, i);
            }
        }
        ctx.closePath();
    }
}

RenderManager.INTERVAL = 120;
RenderManager.LIGHT_LAYERS = 3;
RenderManager.MIN_ALPHA = 0.4;
RenderManager.ALPHA_STEP = (1 - RenderManager.MIN_ALPHA ) / RenderManager.LIGHT_LAYERS;