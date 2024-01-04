import ArtworkPanel from "../panel/artwork/artwork-panel";

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
              <div className="profile_header_bg">
                <div className="profile_header_bg_texture">
                  <div className="profile_header">
                    <div className="profile_header_content">
                      <div className="profile_header_centered_persona">
                        <div
                          className="persona_name"
                          style={{ fontSize: "24px" }}
                        >
                          <span className="actual_persona_name">P1ayer</span>
                        </div>

                        <div className="header_real_name ellipsis">
                          <bdi>(ง'̀-'́)ง</bdi>
                          &nbsp;
                          <img className="profile_flag" src="./static/mk.gif" />
                          Macedonia, The Former Yugoslav Republic of
                        </div>
                      </div>

                      <div className="playerAvatar profile_header_size online">
                        <div className="playerAvatarAutoSizeInner">
                          <div className="profile_avatar_frame">
                            <img src="./static/c4de44e9433609dad43fef18d298f1ae58157a3d.png" />
                          </div>
                          <img src="./static/profile_img_full.jpg" />
                        </div>
                      </div>

                      <div className="profile_header_badgeinfo">
                        <div className="profile_header_badgeinfo_badge_area">
                          <a className="persona_level_btn" href="#">
                            <div className="persona_name persona_level">
                              Level{" "}
                              <div className="friendPlayerLevel lvl_100 lvl_plus_20">
                                <span className="friendPlayerLevelNum">
                                  120
                                </span>
                              </div>
                            </div>
                          </a>
                          <div className="profile_header_badge">
                            <a href="#" className="favorite_badge">
                              <div className="favorite_badge_icon">
                                <img
                                  src="./static/steamyears11_54.png"
                                  className="badge_icon small"
                                />
                              </div>
                              <div className="favorite_badge_description">
                                <div className="name ellipsis">
                                  Years of Service
                                </div>
                                <div className="xp">550 XP</div>
                              </div>
                            </a>
                          </div>
                        </div>
                        <div className="profile_header_actions">
                          <a className="btn_profile_action btn_medium" href="#">
                            <span>Edit Profile</span>
                          </a>
                        </div>
                      </div>

                      <div className="profile_header_summary">
                        <div
                          className="persona_name persona_name_spacer"
                          style={{ fontSize: "24px" }}
                        >
                          <span className="actual_persona_name">&nbsp;</span>
                        </div>
                        <div className="header_real_name_spacer">&nbsp;</div>
                        <div className="profile_summary noexpand">
                          <div className="bb_h3">
                            <b>
                              Trade Link:{" "}
                              <a
                                className="bb_link"
                                href="#"
                                target="_blank"
                                rel=""
                              >
                                Click here
                              </a>
                            </b>
                          </div>
                        </div>
                        <div
                          className="profile_summary_footer"
                          style={{ display: "none" }}
                        >
                          <span className="whiteLink">View more info</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="profile_content">
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
                          1 VAC ban on record
                          <span className="profile_ban_info">
                            |
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
                            <span className="count_link_label">Inventory</span>
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
                      <div className="profile_customization">
                        <div className="profile_customization_header">
                          Workshop Showcase
                        </div>
                        <div className="myworkshop_showcase_header">
                          <div className="playerAvatar online"></div>
                          <a href="#" className="myworkshop_playerName">
                            Your Workshop
                          </a>
                        </div>
                        <div className="profile_customization_block">
                          <div className="myworkshop_showcase">
                            <div className="workshop_showcase_mutiitem_ctn">
                              <div className="workshop_showcase_multiitem showcase_slot">
                                <a href="#" title="1" className="">
                                  <img
                                    className="workshop_showcase_item_image"
                                    src="./static/1633912160_1_squid.gif"
                                  />
                                </a>
                              </div>
                            </div>
                            <div className="workshop_showcase_mutiitem_ctn">
                              <div className="workshop_showcase_multiitem showcase_slot">
                                <a href="#" title="2" className="">
                                  <img
                                    className="workshop_showcase_item_image"
                                    src="./static/1633912160_2_squid.gif"
                                  />
                                </a>
                              </div>
                            </div>
                            <div className="workshop_showcase_mutiitem_ctn">
                              <div className="workshop_showcase_multiitem showcase_slot">
                                <a href="#" title="3" className="">
                                  <img
                                    className="workshop_showcase_item_image"
                                    src="./static/1633912161_3_squid.gif"
                                  />
                                </a>
                              </div>
                            </div>
                            <div className="workshop_showcase_mutiitem_ctn">
                              <div className="workshop_showcase_multiitem showcase_slot">
                                <a href="#" title="4" className="">
                                  <img
                                    className="workshop_showcase_item_image"
                                    src="./static/1633912161_4_squid.gif"
                                  />
                                </a>
                              </div>
                            </div>
                            <div className="workshop_showcase_mutiitem_ctn">
                              <div className="workshop_showcase_multiitem showcase_slot">
                                <a href="#" title="5" className="">
                                  <img
                                    className="workshop_showcase_item_image"
                                    src="./static/1633912163_5_squid.gif"
                                  />
                                </a>
                              </div>
                            </div>
                            <div style={{ clear: "left" }}></div>
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
                            </div>
                          </div>
                        </div>
                      </div>
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
                              <span className="commentthread_pagelink">2</span>
                              <span className="commentthread_pagelink">3</span>
                              <span className="commentthread_pagelink">4</span>
                              <span className="commentthread_pagelink">5</span>
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
    </>
  );
}
