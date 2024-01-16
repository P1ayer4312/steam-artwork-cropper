import CustomCanvas from "./CustomCanvas";

/**
 * Class for wrapping values and functions needed for measuring
 * images for the artwork panel
 */
export default class ArtworkPanelWrapper {
  readonly imageContainersIds: string[];
  elements: ImageElements;
  imagesSize: ImagesSize;
  isMediaMeasured: boolean;

  constructor() {
    this.imageContainersIds = ["primaryImg", "rightColImg"];
    this.elements = this.fetchImageElements();
    this.isMediaMeasured = false;
    console.log(this);
    this.displayMediaToPanel();
  }

  fetchImageElements() {
    const primaryImage = document.getElementById(
      this.imageContainersIds[0]
    ) as HTMLImageElement;

    const rightColImage = document.getElementById(
      this.imageContainersIds[1]
    ) as HTMLImageElement;

    if (!primaryImage || !rightColImage) {
      throw new Error(
        "Error occurred while trying to find image elements using ids"
      );
    }

    return { primaryImage, rightColImage } as ImageElements;
  }

  displayMediaToPanel() {
    if (!this.isMediaMeasured) {
      this.measureMediaToPanel();
      this.isMediaMeasured = true;
    }

    const primaryImgCanvas = new CustomCanvas(700, 1000);
    primaryImgCanvas.fillSolid();
    this.elements.primaryImage.src = primaryImgCanvas.toDataURL();
  }

  measureMediaToPanel() {
    console.log("measureMediaToPanel called");
  }
}
