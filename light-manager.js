/**
 * Created by Dean Panayotov Local on 15.2.2015 г..
 */
var RenderManager = function () {

    this.lightSources = [];
    this.idCounter = -1;

    var maskCanvas = document.createElement('canvas');
    maskCanvas.width = WIDTH;
    maskCanvas.height = HEIGHT;
    var maskCtx = maskCanvas.getContext('2d');
    maskCtx.fillStyle = "#000000";

    this.update = function () {
        for (var i = 0; i < this.lightSources.length; i++) {
            if (this.lightSources[i]) {
                this.lightSources[i].update();
            }
        }
    }

    setInterval((function(self) { return function() { self.update(); } })(this), RenderManager.INTERVAL);


    this.addLightSource = function (ls) {
        this.idCounter++;
        this.lightSources[this.idCounter] = ls;
        ls.id = this.idCounter;
        return this.idCounter;
    }

    this.removeLightSource = function (id) {
        this.lightSources[id] = undefined;
    }

    this.render = function(ctx, renderVisibleObjects){
        ctx.globalAlpha = 1;
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        renderVisibleObjects(ctx);

        for (var i = 0; i < RenderManager.LIGHT_LAYERS; i++) {
            maskCtx.globalCompositeOperation = 'source-over';
            maskCtx.fillRect(0, 0, WIDTH, HEIGHT);
            maskCtx.globalCompositeOperation = 'destination-out';

            this.renderLayer(maskCtx, i);
            maskCtx.fill();

            ctx.globalAlpha = 1 - RenderManager.ALPHA_STEP * i;
            ctx.drawImage(maskCanvas, 0, 0);
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