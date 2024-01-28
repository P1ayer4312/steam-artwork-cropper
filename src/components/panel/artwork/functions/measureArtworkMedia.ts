import CustomCanvas from "../../../../classes/CustomCanvas";
import getComputedValueFor from "../../../../functions/getComputedValueFor";

export default async function measureArtworkMedia(
  primaryImg: HTMLImageElement,
  rightColImg: HTMLImageElement,
  file: FileData,
  rightColImgAnchor: HTMLAnchorElement
): Promise<void> {
  return await new Promise((resolve) => {
    /**
     * TODO: Some resolutions are not displayed correctly, needs to be checked
     * TODO: Also code refactor
     */
    const steamHeight = Math.round((file.height * 613) / file.width);
    const primaryImgWidth = Math.round((file.height * 508) / steamHeight);
    const rightColImgWidth = Math.round((file.height * 102) / steamHeight);

    const primaryImgCanvas = new CustomCanvas(
      primaryImg,
      primaryImgWidth,
      file.height
    );
    const rightColImgCanvas = new CustomCanvas(
      rightColImg,
      rightColImgWidth,
      file.height
    );

    primaryImgCanvas.fillSolid();
    rightColImgCanvas.fillSolid();

    primaryImg.src = primaryImgCanvas.toDataURL();
    rightColImg.src = rightColImgCanvas.toDataURL();

    function checkResolutions() {
      // Measure current images on the DOM
      const primaryImgHeight = Math.round(
        getComputedValueFor(primaryImg, "height") as number
      );

      const rightColImgHeight = Math.round(
        getComputedValueFor(rightColImg, "height") as number
      );

      if (primaryImgHeight !== rightColImgHeight) {
        console.log(primaryImgHeight, rightColImgHeight);

        if (rightColImgHeight < primaryImgHeight) {
          primaryImgCanvas.increaseWidth();
          rightColImgCanvas.decreaseWidth();
        } else {
          primaryImgCanvas.decreaseWidth();
        }
      } else {
        console.log(primaryImgHeight, rightColImgHeight);
        // compareHeights();
        primaryImg.removeEventListener("load", checkResolutions);
        displayImages();
      }
    }

    function displayImages() {
      const tempImg = new Image();
      tempImg.src = file.dataUrl!;
      const rightColOffset = rightColImgCanvas.canvas.width - file.width;

      primaryImgCanvas.drawImage(tempImg, 0, 0);
      rightColImgCanvas.drawImage(tempImg, rightColOffset, 0);

      primaryImg.src = primaryImgCanvas.toDataURL("image/png", 1);
      rightColImg.src = rightColImgCanvas.toDataURL("image/png", 1);

      resolve();
    }

    // We'll use the bigger image as a loop to check if we have the desired values
    primaryImg.addEventListener("load", checkResolutions);
  });
}
