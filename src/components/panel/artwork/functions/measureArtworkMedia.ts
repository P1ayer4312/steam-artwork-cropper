import CustomCanvas from "../../../../classes/CustomCanvas";
import getComputedValueFor from "../../../../functions/getComputedValueFor";
import getImageFileSize from "../../../../functions/getImageFileSize";
import { MeasuresData } from "../../../../store/types/artworkShowcaseData";
import { FileData } from "../../../../store/types/useGlobalStore";

export default async function measureArtworkMedia(
  primaryImg: HTMLImageElement,
  rightColImg: HTMLImageElement,
  file: FileData
): Promise<MeasuresData> {
  return await new Promise((resolve) => {
    /**
     * TODO: Some resolutions are not displayed correctly, needs to be checked
     * TODO: Also code refactor
     */
    const steamHeight = Math.round((file.height * 618) / file.width);
    const primaryImgWidth = Math.round((file.height * 508) / steamHeight);
    const rightColImgWidth = Math.round((file.height * 102) / steamHeight);
    let imgDataUrl: string = file.dataUrl!;

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
        if (rightColImgHeight < primaryImgHeight) {
          rightColImgCanvas.decreaseWidth();
          primaryImgCanvas.increaseWidth();
        } else {
          primaryImgCanvas.decreaseWidth();
        }
      } else {
        primaryImg.removeEventListener("load", checkResolutions);
        displayImages();
      }
    }

    function displayImages() {
      const tempImg = new Image();
      tempImg.src = imgDataUrl;

      const rightColOffset = rightColImgCanvas.canvas.width - file.width;
      primaryImgCanvas.drawImage(tempImg, 0, 0);
      rightColImgCanvas.drawImage(tempImg, rightColOffset, 0);

      const imgType = file.data!.type;
      const primaryImgDataUrl = primaryImgCanvas.toDataURL(imgType, 1);
      const rightColImgDataUrl = rightColImgCanvas.toDataURL(imgType, 1);

      primaryImg.src = primaryImgDataUrl;
      rightColImg.src = rightColImgDataUrl;

      const measuredData: MeasuresData = {
        isOriginalResized: false,
        imageLinks: {
          primary: primaryImgDataUrl,
          rightCol: rightColImgDataUrl,
        },
        imageResolutions: {
          original: {
            width: tempImg.width,
            height: tempImg.height,
          },
          primary: {
            width: primaryImgCanvas.canvas.width,
            height: primaryImgCanvas.canvas.height,
          },
          rightCol: {
            width: rightColImgCanvas.canvas.width,
            height: rightColImgCanvas.canvas.height,
          },
        },
        imageSize: {
          primary: getImageFileSize(primaryImgDataUrl),
          rightCol: getImageFileSize(rightColImgDataUrl),
          // original: getImageFileSize(imgDataUrl),
        },
      };

      // Return measured values to be stored into the useGlobalContext
      resolve(measuredData);
    }

    // We'll use the bigger image as a loop to check if we have the desired values
    primaryImg.addEventListener("load", checkResolutions);
  });
}
