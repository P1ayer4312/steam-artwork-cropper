import useGlobalStore from "../../../store/useGlobalStore";
import "./profile-content-nav-buttons.css";

export default function ProfileContentNavButtons() {
  const { activeTab, setActiveTab, status } = useGlobalStore();

  return (
    <>
      <div className="profile_content_nav_button_wrapper">
        <div
          className={`profile_content_nav_button no-select ${
            activeTab == "artwork" ? "profile_content_nav_button_active" : ""
          }`}
          onClick={() => setActiveTab("artwork")}
        >
          <span>Artwork Showcase</span>
          <div className="profile_content_nav_clear"></div>
        </div>
        <div
          className={`profile_content_nav_button no-select ${
            activeTab == "workshop" ? "profile_content_nav_button_active" : ""
          }`}
          onClick={() => setActiveTab("workshop")}
        >
          <span>Workshop Showcase</span>
          <div className="profile_content_nav_clear"></div>
        </div>

        <div
          className={`profile_content_nav_button profile_content_nav_status no-select`}
        >
          <span className="profile_content_nav_status_span">Status: </span>
          <span>{status}</span>
          <div className="profile_content_nav_clear"></div>
        </div>
      </div>
    </>
  );
}
