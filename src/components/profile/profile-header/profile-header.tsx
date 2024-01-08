import ImageHolder from "../../../assets/ImageHolder";
import ProfileHeaderSummary from "./profile-header-summary/profile-header-summary";

export default function ProfileHeader() {
  return (
    <>
      <div className="profile_header_bg">
        <div className="profile_header_bg_texture">
          <div className="profile_header">
            <div className="profile_header_content">
              <div className="profile_header_centered_persona">
                <div className="persona_name" style={{ fontSize: "24px" }}>
                  <span className="actual_persona_name">P1ayer</span>
                </div>

                <div className="header_real_name ellipsis">
                  <bdi>(ง'̀-'́)ง</bdi>{" "}
                  <img
                    className="profile_flag"
                    src={ImageHolder.CountryFlag}
                    alt=""
                  />{" "}
                  Macedonia, The Former Yugoslav Republic of
                </div>
              </div>

              <div className="playerAvatar profile_header_size online">
                <div className="playerAvatarAutoSizeInner">
                  <div className="profile_avatar_frame">
                    <img alt="" src={ImageHolder.ProfileImageFrame} />
                  </div>
                  <img alt="" src={ImageHolder.ProfileImageFull} />
                </div>
              </div>

              <div className="profile_header_badgeinfo">
                <div className="profile_header_badgeinfo_badge_area">
                  <span className="persona_level_btn">
                    <div className="persona_name persona_level">
                      Level{" "}
                      <div className="friendPlayerLevel lvl_100 lvl_plus_20">
                        <span className="friendPlayerLevelNum">120</span>
                      </div>
                    </div>
                  </span>
                  <div className="profile_header_badge">
                    <a
                      target="_blank"
                      rel="noopener"
                      href="https://github.com/P1ayer4312/steam-artwork-cropper"
                      className="favorite_badge"
                    >
                      <div className="favorite_badge_icon">
                        <img
                          alt=""
                          src={ImageHolder.BadgeIcon}
                          className="badge_icon small"
                        />
                      </div>
                      <div className="favorite_badge_description">
                        <div className="name ellipsis">GitHub</div>
                        <div className="xp">500 XP</div>
                      </div>
                    </a>
                  </div>
                </div>
                {/* <div className="profile_header_actions">
                  <a className="btn_profile_action btn_medium" href="#">
                    <span>Edit Profile</span>
                  </a>
                </div> */}
              </div>

              <ProfileHeaderSummary />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
