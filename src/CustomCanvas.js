class CustomCanvas {
    constructor(width = 1, height = 1, border = false) {
        this.canvas = document.createElement('canvas');
        this.canvasCtx = this.canvas.getContext('2d');
        this.canvas.width = width;
        this.canvas.height = height;
        if (border)
            this.canvas.style.setProperty("border", "1px solid black");
    }
    imageData(data) {
        let t = this.canvasCtx.createImageData(this.canvas.width, this.canvas.height);
        t.data.set(data);
        this.canvasCtx.putImageData(t, 0, 0);
    }
    addCanvas(canvasElement, left, top, width, height) {
        if (width == undefined && height == undefined)
            this.canvasCtx.drawImage(canvasElement, left, top);
        else
            this.canvasCtx.drawImage(canvasElement, left, top, width, height);
    }
    fillSolid(dx, dy) {
        this.canvasCtx.fillStyle = "black";
        this.canvasCtx.fillRect(0, 0, dx, dy);
    }
    setWidth(w) {
        this.canvas.width = w;
    }
    setHeight(h) {
        this.canvas.height = h;
    }
    toDataURL(type = 'image/jpeg', quality = 0.1) {
        return this.canvas.toDataURL(type, quality);
    }
    drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
        this.canvasCtx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    }
}

module.exports = CustomCanvas;