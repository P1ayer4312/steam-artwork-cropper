type ImageType = "image/jpeg" | "image/png";

export default class CustomCanvas {
  canvas: HTMLCanvasElement;
  canvasCtx: CanvasRenderingContext2D;
  imageElement: HTMLImageElement;

  constructor(
    imageElement: HTMLImageElement,
    width: number = 1,
    height: number = 1,
    border: boolean = false
  ) {
    this.imageElement = imageElement;
    this.canvas = document.createElement("canvas");
    this.canvasCtx = this.canvas.getContext("2d")!;
    this.canvas.width = width;
    this.canvas.height = height;
    if (border) this.canvas.style.setProperty("border", "1px solid black");
  }
  // TODO: Check if this part is needed
  // imageData(data) {
  //   const temp = this.canvasCtx.createImageData(
  //     this.canvas.width,
  //     this.canvas.height
  //   );
  //   temp.data.set(data);
  //   this.canvasCtx.putImageData(temp, 0, 0);
  // }
  addCanvas(
    canvasElement: HTMLCanvasElement,
    left: number,
    top: number,
    width?: number,
    height?: number
  ) {
    if (width && height) {
      this.canvasCtx.drawImage(canvasElement, left, top, width, height);
    } else {
      this.canvasCtx.drawImage(canvasElement, left, top);
    }
  }

  fillSolid(dx?: number, dy?: number, color: string = "black") {
    this.canvasCtx.fillStyle = color;
    this.canvasCtx.fillRect(
      0,
      0,
      dx ?? this.canvas.width,
      dy ?? this.canvas.height
    );
  }

  setWidth(w: number) {
    this.canvas.width = w;
  }

  setHeight(h: number) {
    this.canvas.height = h;
  }

  toDataURL(type: ImageType = "image/jpeg", quality: number = 0.1) {
    return this.canvas.toDataURL(type, quality);
  }

  drawImage(
    image: CanvasImageSource,
    sx: number,
    sy: number,
    sWidth?: number,
    sHeight?: number,
    dx?: number,
    dy?: number,
    dWidth?: number,
    dHeight?: number
  ) {
    if (sWidth && sHeight && dx && dy && dWidth && dHeight) {
      // prettier-ignore
      this.canvasCtx.drawImage(
        image,
        sx, sy, sWidth, sHeight,
        dx, dy, dWidth, dHeight
      );
    } else if (sWidth && sHeight) {
      this.canvasCtx.drawImage(image, sx, sy, sWidth, sHeight);
    } else {
      this.canvasCtx.drawImage(image, sx, sy);
    }
  }

  increaseWidth(amount: number = 1) {
    this.canvas.width += amount;
    this.displayCanvasToImg();
  }

  decreaseWidth(amount: number = 1) {
    this.canvas.width -= amount;
    this.displayCanvasToImg();
  }

  // increaseHeight() {
  //   this.canvas.height += 1;
  //   this.displayCanvasToImg();
  // }

  // decreaseHeight() {
  //   this.canvas.height -= 1;
  //   this.displayCanvasToImg();
  // }

  displayCanvasToImg(type: ImageType = "image/jpeg", quality: number = 0.1) {
    this.imageElement.src = this.toDataURL(type, quality);
  }
}