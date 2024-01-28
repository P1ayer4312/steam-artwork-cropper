type ArtworkShowcaseData = {
  isLoaded: boolean;
  isMeasured: boolean;
  imageLinks: {
    /** @default "./img/1.jpg" */
    primary: string;
    /** @default "./img/2.jpg" */
    rightCol: string;
  };
};

type ArtworkShowcaseDefs = {
  artwork: ArtworkShowcaseData;
  setArtwork: (value: Partial<ArtworkShowcaseData>) => void;
};
