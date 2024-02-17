import CustomCanvas from "../../../../classes/CustomCanvas";
import getComputedValueFor from "../../../../functions/getComputedValueFor";
import { ArtworkShowcaseDefs } from "../../../../store/types/artworkShowcaseData";
import { FileData } from "../../../../store/types/useGlobalStore";

interface MeasureProps extends ArtworkShowcaseDefs {
  file: FileData;
}

async function measureArtworkBottomRightSpace({ artwork, setArtwork, file }: MeasureProps) {
  return new Promise<void>((resolve) => {
    const rightColImage = artwork.panelElementRefs.rightColImg!;
    console.log(rightColImage);
    const rightColContainer = artwork.panelElementRefs.rightColContainer!;
    // prettier-ignore
    const primaryImgHeight = getComputedValueFor(artwork.panelElementRefs.primaryImg!, "height") as number;
    const rightColCanvas = new CustomCanvas(
      rightColImage,
      artwork.imageResolutions.rightCol.width,
      artwork.imageResolutions.rightCol.height
    );

    rightColCanvas.fillSolid();

    function measureHeight() {
      const rightColContainerHeight = (getComputedValueFor(rightColContainer, "height") as number) - 13;
      if (primaryImgHeight < rightColContainerHeight) {
        rightColCanvas.decreaseHeight();
      } else {
        rightColImage.removeEventListener("load", measureHeight);

        const tempImg = new Image();
        tempImg.src = artwork.imageLinks.rightCol;

        rightColCanvas.drawImage(tempImg, 0, 0);
        rightColImage.src = rightColCanvas.toDataURL();

        resolve();
      }
    }

    rightColImage.addEventListener("load", measureHeight);
    measureHeight();
  });
}

export default measureArtworkBottomRightSpace;
