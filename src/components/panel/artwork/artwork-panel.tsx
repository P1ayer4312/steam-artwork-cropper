import { useEffect, useRef } from "react";
import useGlobalStore from "../../../store/useGlobalStore";
import measureArtworkMedia from "./functions/measureArtworkMedia";

export default function ArtworkPanel() {
  const primaryImgRef = useRef<HTMLImageElement>(null);
  const rightColImgRef = useRef<HTMLImageElement>(null);
  const rightColImgAnchorRef = useRef<HTMLAnchorElement>(null);
  const { file, artwork, setArtwork, setStatus } = useGlobalStore();

  // Used as an event listener for triggering image measurement
  // and loading it on tab change
  useEffect(() => {
    (async () => {
      if (!artwork.isMeasured && file.data) {
        // Pass the image elements to be used for the measurement
        setStatus("Measuring, please wait....");
        await measureArtworkMedia(
          primaryImgRef.current!,
          rightColImgRef.current!,
          file,
          rightColImgAnchorRef.current!
        );

        // setArtwork({
        //   isMeasured: true,
        // });
        setStatus("Done");
      } else {
        console.log("loadImage()");
      }
    })();
  }, [file, artwork.isMeasured, setArtwork]);

  return (
    <>
      <div className="profile_customization myart">
        {/* <div className="profile_customization_header">Artwork Showcase</div> */}

        <div className="profile_customization_block">
          <div className="screenshot_showcase">
            <div className="screenshot_showcase_primary showcase_slot">
              <div className="screenshot_showcase_screenshot modalContentLink">
                <img
                  width="100%"
                  src={artwork.imageLinks.primary}
                  ref={primaryImgRef}
                />
              </div>
              <div className="screenshot_showcase_itemname">random</div>
              <div className="screenshot_showcase_stats"></div>
            </div>
            <div className="screenshot_showcase_rightcol">
              <div className="screenshot_showcase_smallscreenshot showcase_slot">
                <a
                  className="screenshot_showcase_screenshot modalContentLink"
                  href="#"
                  ref={rightColImgAnchorRef}
                >
                  <img
                    width="100%"
                    style={{ maxWidth: "100px" }}
                    src={artwork.imageLinks.rightCol}
                    ref={rightColImgRef}
                  />
                </a>
              </div>
              {/* 
                In case we decide to do something with the other images,
                we leave this commented out for now 
              */}
              {/* <div className="screenshot_showcase_smallscreenshot showcase_slot">
                <a
                  className="screenshot_showcase_screenshot modalContentLink"
                  href="#"
                >
                  <img
                    width="100%"
                    style={{ maxWidth: "100px" }}
                    src="./img/3.jpg"
                  />
                </a>
              </div>
              <div className="screenshot_showcase_smallscreenshot showcase_slot">
                <a
                  className="screenshot_showcase_screenshot modalContentLink"
                  href="#"
                >
                  <img
                    width="100%"
                    style={{ maxWidth: "100px" }}
                    src="./img/4.jpg"
                  />
                </a>
              </div> */}
              <a
                className="screenshot_showcase_smallscreenshot screenshot_count"
                href="#"
              >
                <div className="screenshot_showcase_screenshot">+ 1</div>
              </a>
            </div>
            <div style={{ clear: "both" }}></div>
          </div>
        </div>
      </div>
    </>
  );
}
