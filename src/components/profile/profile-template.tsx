// Main component for the Steam profile

import ArtworkPanel from "../panel/artwork/artwork-panel";
// import WorkshopPanel from "../panel/workshop/workshop-panel";
import ProfileContentNavButtons from "./profile-content-navbar/profile-content-nav-buttons";
import ProfileHeader from "./profile-header/profile-header";
import "./profile-templace.css";

export default function Profile() {
  return (
    <>
      <div className="responsive_page_frame with_header">
        <div className="responsive_page_menu_ctn localmenu">
          <div className="responsive_page_menu" id="responsive_page_local_menu">
            <div className="localmenu_content"></div>
          </div>
        </div>

        <div className="responsive_page_content">
          <div id="application_root">
            <div className="FullModalOverlay" style={{ display: "none" }}>
              <div className="ModalOverlayContent ModalOverlayBackground"></div>
            </div>
          </div>

          <div
            role="main"
            className="responsive_page_template_content"
            id="responsive_page_template_content"
          >
            <div className="no_header profile_page">
              <ProfileHeader />
              {/* Profile content */}
              <div className="profile_content">
                <ProfileContentNavButtons />
                <div className="profile_content_border">
                  <div className="profile_content_inner">
                    <div className="profile_rightcol">
                      <div className="responsive_status_info">
                        <div className="profile_in_game persona online">
                          <div className="profile_in_game_header">
                            Currently Online
                          </div>
                        </div>
                        <div className="profile_ban_status">
                          <div className="profile_ban">
                            1 VAC ban on record{" "}
                            <span className="profile_ban_info">
                              |{" "}
                              <a
                                className="whiteLink"
                                href="#"
                                target="_blank"
                                rel=""
                              >
                                Info
                              </a>
                            </span>
                          </div>
                          1023 day(s) since last ban
                          <div>
                            <a className="whiteLink" href="#">
                              View Ban History
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="responsive_count_link_area">
                        <div className="profile_item_links">
                          <div className="profile_count_link ellipsis">
                            <a href="#">
                              <span className="count_link_label">Games</span>
                              &nbsp;
                              <span className="profile_count_link_total">
                                {" "}
                                323{" "}
                              </span>
                            </a>
                          </div>
                          <div className="profile_count_link ellipsis">
                            <a href="#">
                              <span className="count_link_label">
                                Inventory
                              </span>
                              &nbsp;
                              <span className="profile_count_link_total">
                                &nbsp;
                              </span>
                            </a>
                          </div>
                          <div className="profile_count_link ellipsis">
                            <a href="#">
                              <span className="count_link_label">
                                Screenshots
                              </span>
                              &nbsp;
                              <span className="profile_count_link_total">
                                {" "}
                                138{" "}
                              </span>
                            </a>
                          </div>
                          <div className="profile_count_link ellipsis">
                            <a href="#">
                              <span className="count_link_label">Videos</span>
                              &nbsp;
                              <span className="profile_count_link_total">
                                &nbsp;
                              </span>
                            </a>
                          </div>
                          <div className="profile_count_link ellipsis">
                            <a href="#">
                              <span className="count_link_label">
                                Workshop Items
                              </span>
                              &nbsp;
                              <span className="profile_count_link_total">
                                {" "}
                                5{" "}
                              </span>
                            </a>
                          </div>
                          <div className="profile_count_link ellipsis">
                            <a href="#">
                              <span className="count_link_label">Reviews</span>
                              &nbsp;
                              <span className="profile_count_link_total">
                                {" "}
                                17{" "}
                              </span>
                            </a>
                          </div>
                          <div className="profile_count_link ellipsis">
                            <a href="#">
                              <span className="count_link_label">Guides</span>
                              &nbsp;
                              <span className="profile_count_link_total">
                                {" "}
                                1{" "}
                              </span>
                            </a>
                          </div>
                          <div className="profile_count_link ellipsis">
                            <a href="#">
                              <span className="count_link_label">Artwork</span>
                              &nbsp;
                              <span className="profile_count_link_total">
                                {" "}
                                5{" "}
                              </span>
                            </a>
                          </div>
                          <div style={{ clear: "left" }}></div>
                        </div>
                      </div>
                    </div>

                    <div className="profile_leftcol">
                      <div className="profile_customization_area">
                        {/* <WorkshopPanel /> */}
                        <ArtworkPanel />
                      </div>

                      <div>
                        <div className="recentgame_quicklinks">
                          View
                          <a className="whiteLink" href="#">
                            All Recently Played
                          </a>
                          <span className="link_separator">|</span>
                          <a className="whiteLink" href="#">
                            Wishlist
                          </a>
                          <span className="link_separator">|</span>
                          <a className="whiteLink" href="#">
                            Reviews
                          </a>
                        </div>
                        <div style={{ clear: "right" }}></div>
                      </div>

                      <div className="profile_comment_area">
                        <div
                          className="commentthread_area"
                          id="commentthread_Profile_76561198065287239_area"
                        >
                          <div className="commentthread_header">
                            <div
                              className="commentthread_paging has_view_all_link"
                              id="commentthread_Profile_76561198065287239_pagecontrols"
                            >
                              <a
                                className="commentthread_allcommentslink"
                                href="#"
                              >
                                View all
                                <span id="commentthread_Profile_76561198065287239_totalcount">
                                  27
                                </span>
                                comments
                              </a>
                              <a
                                id="commentthread_Profile_76561198065287239_pagebtn_prev"
                                href="#"
                                className="pagebtn disabled"
                              >
                                &lt;
                              </a>
                              <span
                                id="commentthread_Profile_76561198065287239_pagelinks"
                                className="commentthread_pagelinks"
                              >
                                <span className="commentthread_pagelink active">
                                  1
                                </span>
                                <span className="commentthread_pagelink">
                                  2
                                </span>
                                <span className="commentthread_pagelink">
                                  3
                                </span>
                                <span className="commentthread_pagelink">
                                  4
                                </span>
                                <span className="commentthread_pagelink">
                                  5
                                </span>
                              </span>
                              <span
                                id="commentthread_Profile_76561198065287239_pagedropdown"
                                className="commentthread_pagedropdown"
                              >
                                <select>
                                  <option value="0">1</option>
                                  <option value="1">2</option>
                                  <option value="2">3</option>
                                  <option value="3">4</option>
                                  <option value="4">5</option>
                                </select>
                              </span>
                              <a
                                id="commentthread_Profile_76561198065287239_pagebtn_next"
                                href="#"
                                className="pagebtn"
                              >
                                &gt;
                              </a>
                            </div>
                            <div className="commentthread_count">
                              <span className="ellipsis commentthread_count_label">
                                <span className="commentthread_header_label">
                                  Comments
                                </span>
                              </span>
                              <div
                                className="commentthread_subscribe_ctn checked"
                                id="commentthread_Profile_76561198065287239_subscribe_checkbox"
                              >
                                <span className="commentthread_subscribe_checkbox">
                                  <span className="commentthread_subscribe_check"></span>
                                </span>
                                <span className="commentthread_subscribe_desc">
                                  Subscribe to thread
                                </span>
                              </div>
                              <span className="commentthread_subscribe_hint">
                                (
                                <span className="commentthread_subscribe_hint_q">
                                  ?
                                </span>
                                )
                              </span>
                            </div>
                            <div style={{ clear: "both" }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={{ clear: "both" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
