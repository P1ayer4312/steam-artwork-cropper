import { useEffect, useRef } from "react";
import { useArtworkShowcaseContext } from "../../../context/showcase-context/ArtworkShowcaseContext";

export default function ArtworkPanel() {
  const primaryImgRef = useRef<HTMLImageElement | null>(null);
  const rightColImgRef = useRef<HTMLImageElement | null>(null);
  const artworkContext = useArtworkShowcaseContext();

  useEffect(() => {
    console.log("artwork panel");
  });

  return (
    <>
      <div className="profile_customization myart">
        {/* <div className="profile_customization_header">Artwork Showcase</div> */}

        <div className="profile_customization_block">
          <div className="screenshot_showcase">
            <div className="screenshot_showcase_primary showcase_slot">
              <div className="screenshot_showcase_screenshot modalContentLink">
                <img width="100%" src="./img/1.jpg" ref={primaryImgRef} />
              </div>
              <div className="screenshot_showcase_itemname">random</div>
              <div className="screenshot_showcase_stats"></div>
            </div>
            <div className="screenshot_showcase_rightcol">
              <div className="screenshot_showcase_smallscreenshot showcase_slot">
                <a
                  className="screenshot_showcase_screenshot modalContentLink"
                  href="#"
                >
                  <img
                    width="100%"
                    style={{ maxWidth: "100px" }}
                    src="./img/2.jpg"
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
