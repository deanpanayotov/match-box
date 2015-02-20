/**
 * Created by Dean Panayotov Local on 20.2.2015 г..
 */
frontCanvasContext.clearRect(0,0,frontCanvas.width, frontCanvas.height);
for (var i = 0; i < 3; i++) {
    frontCanvasContext.fillStyle = "#000000";
    frontCanvasContext.globalAlpha = 1 - i * 0.3;

    frontCanvasContext.fillRect(0, 0, frontCanvas.width, frontCanvas.height);

    frontCanvasContext.globalCompositeOperation = 'destination-out';

    frontCanvasContext.beginPath();
    frontCanvasContext.moveTo(600, 600);
    frontCanvasContext.arc(600, 600, 140 - i * 20, 0, 2 * Math.PI);
    frontCanvasContext.moveTo(300, 600);
    frontCanvasContext.arc(300, 600, 140 - i * 20, 0, 2 * Math.PI);

    frontCanvasContext.moveTo(300, 300);
    frontCanvasContext.arc(300, 300, 140 - i * 20, 0, 2 * Math.PI);
    frontCanvasContext.moveTo(600, 300);
    frontCanvasContext.arc(600, 300, 140 - i * 20, 0, 2 * Math.PI);

    frontCanvasContext.moveTo(700, 600);
    frontCanvasContext.arc(700, 600, 140 - i * 20, 0, 2 * Math.PI);

    frontCanvasContext.closePath();
    frontCanvasContext.fill();

    frontCanvasContext.globalCompositeOperation = "source-over";
}
mainCanvasContext.drawImage(frontCanvas, 0, 0);