import ImageHolder from "../../../assets/ImageHolder";

export default function ArtworkPanel() {
  return (
    <>
      {/* className="profile_customization myart" */}
      <div className="profile_customization myart">
        <div className="profile_customization_header">Artwork Showcase</div>

        <div className="profile_customization_block">
          <div className="screenshot_showcase">
            <div className="screenshot_showcase_primary showcase_slot">
              <a
                className="screenshot_showcase_screenshot modalContentLink"
                href="#"
              >
                <img
                  width="100%"
                  style={{ maxWidth: "288px" }}
                  src={ImageHolder.ArtworkPrimary}
                />
              </a>
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
                    src={ImageHolder.ArtworkRightCol}
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
                    src={ImageHolder.ArtworkRightCol2}
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
                    src={ImageHolder.ArtworkRightCol3}
                  />
                </a>
              </div>
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
