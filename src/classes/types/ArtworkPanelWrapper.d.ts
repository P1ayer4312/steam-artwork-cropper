/**
 * Contains references of the DOM elements
 */
type ImageElements = {
  /** The left bigger image */
  primaryImage: HTMLImageElement;
  /** The right thinner image */
  rightColImage: HTMLImageElement;
};

type Dimensions = {
  /** Image width */
  width: number;
  /** Image height */
  height: number;
};

/**
 * Contains values for images' dimensions
 */
type ImagesSize = {
  big: Dimensions;
  small: Dimensions;
  /** Original image dimensions */
  original: Dimensions;
};
