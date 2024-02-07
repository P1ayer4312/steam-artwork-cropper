export type Resolution = {
  width: number;
  height: number;
};

export type ArtworkShowcaseData = {
  isLoaded: boolean;
  isMeasured: boolean;
  isOriginalResized: boolean;
  imageLinks: {
    /** @default "./img/1.jpg" */
    primary: string;
    /** @default "./img/2.jpg" */
    rightCol: string;
  };
  /** Cropped images size in kB */
  imageSize: {
    primary: number;
    rightCol: number;
    /** Will hold value for original and original resized */
    // original: number;
  };
  imageResolutions: {
    original: Resolution;
    originalResized?: Resolution;
    primary: Resolution;
    rightCol: Resolution;
  };
};

export type ArtworkShowcaseDefs = {
  artwork: ArtworkShowcaseData;
  setArtwork: (value: Partial<ArtworkShowcaseData>) => void;
};

export type MeasuresData = {
  isOriginalResized: boolean;
  imageLinks: {
    /** @default "./img/1.jpg" */
    primary: string;
    /** @default "./img/2.jpg" */
    rightCol: string;
  };
  imageResolutions: {
    original: Resolution;
    originalResized?: Resolution;
    primary: Resolution;
    rightCol: Resolution;
  };
  imageSize: {
    primary: number;
    rightCol: number;
    /** Will hold value for original and original resized */
    // original: number;
  };
};
