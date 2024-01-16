import "./profile-content-nav-buttons.css";
import { useGlobalContext } from "../../../context/global-context/GlobalContext";

export default function ProfileContentNavButtons() {
  const globalContext = useGlobalContext();
  const activeTab = globalContext?.activeTab;
  const status = globalContext?.status.value;

  return (
    <>
      <div className="profile_content_nav_button_wrapper">
        <div
          className={`profile_content_nav_button no-select ${
            activeTab?.value == "artwork"
              ? "profile_content_nav_button_active"
              : ""
          }`}
          onClick={() => activeTab?.set("artwork")}
        >
          <span>Artwork Showcase</span>
          <div className="profile_content_nav_clear"></div>
        </div>
        <div
          className={`profile_content_nav_button no-select ${
            activeTab?.value == "workshop"
              ? "profile_content_nav_button_active"
              : ""
          }`}
          onClick={() => activeTab?.set("workshop")}
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
