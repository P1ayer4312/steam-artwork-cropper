import { useState } from "react";
import "./profile-content-nav-buttons.css";

export default function ProfileContentNavButtons() {
  // TODO: Remove this and implement it properly
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <>
      <div className="profile_content_nav_button_wrapper">
        <div
          className={`profile_content_nav_button ${
            activeIndex === 0 ? "profile_content_nav_button_active" : ""
          }`}
          onClick={() => setActiveIndex(0)}
        >
          <span>Artwork Showcase</span>
          <div className="profile_content_nav_clear"></div>
        </div>
        <div
          className={`profile_content_nav_button ${
            activeIndex === 1 ? "profile_content_nav_button_active" : ""
          }`}
          onClick={() => setActiveIndex(1)}
        >
          <span>Workshop Showcase</span>
          <div className="profile_content_nav_clear"></div>
        </div>

        <div>status ?</div>
      </div>
    </>
  );
}
