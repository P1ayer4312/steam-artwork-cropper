import { useEffect } from "react";

export default function WorkshopPanel() {
  useEffect(() => {
    console.log("workshop panel");
  });

  return (
    <>
      <div className="profile_customization">
        {/* Left commented out in case it's needed in the future */}
        {/* <div className="profile_customization_header">Workshop Showcase</div>
        <div className="myworkshop_showcase_header">
          <div className="playerAvatar online"></div>
          <span className="myworkshop_playerName">Your Workshop</span>
        </div> */}
        <div className="profile_customization_block">
          <div className="myworkshop_showcase">
            <div className="workshop_showcase_mutiitem_ctn">
              <div className="workshop_showcase_multiitem showcase_slot">
                <a href="#" title="1" className="">
                  <img
                    className="workshop_showcase_item_image"
                    src="./img/1633912160_1_squid.gif"
                  />
                </a>
              </div>
            </div>
            <div className="workshop_showcase_mutiitem_ctn">
              <div className="workshop_showcase_multiitem showcase_slot">
                <a href="#" title="2" className="">
                  <img
                    className="workshop_showcase_item_image"
                    src="./img/1633912160_2_squid.gif"
                  />
                </a>
              </div>
            </div>
            <div className="workshop_showcase_mutiitem_ctn">
              <div className="workshop_showcase_multiitem showcase_slot">
                <a href="#" title="3" className="">
                  <img
                    className="workshop_showcase_item_image"
                    src="./img/1633912161_3_squid.gif"
                  />
                </a>
              </div>
            </div>
            <div className="workshop_showcase_mutiitem_ctn">
              <div className="workshop_showcase_multiitem showcase_slot">
                <a href="#" title="4" className="">
                  <img
                    className="workshop_showcase_item_image"
                    src="./img/1633912161_4_squid.gif"
                  />
                </a>
              </div>
            </div>
            <div className="workshop_showcase_mutiitem_ctn">
              <div className="workshop_showcase_multiitem showcase_slot">
                <a href="#" title="5" className="">
                  <img
                    className="workshop_showcase_item_image"
                    src="./img/1633912163_5_squid.gif"
                  />
                </a>
              </div>
            </div>
            {/* <div style={{ clear: "left" }}></div>
            <div className="showcase_stats_row showcase_content_bg">
              <a className="showcase_stat" href="#">
                <div className="value">5</div>
                <div className="label">Submissions</div>
              </a>
              <div className="showcase_stat">
                <div className="value">2</div>
                <div className="label">Followers</div>
              </div>
              <div style={{ clear: "left" }}></div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
