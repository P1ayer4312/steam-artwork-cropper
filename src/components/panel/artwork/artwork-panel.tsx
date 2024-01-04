export default function ArtworkPanel() {
  return (
    <>
      <div className="profile_customization myart">
        <a className="profile_customization_editlink" href="#">
          <span className="profile_customization_edit_icon"></span>
          <span className="profile_customization_editlink_text">
            Edit or Change Showcase
          </span>
        </a>
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
                  src="./static/1.jpg"
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
                    src="./static/2.jpg"
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
                    src="./static/3.jpg"
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
                    src="./static/4.jpg"
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
