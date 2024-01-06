import InputImageButton from "./input-image-buttom/input-image-button";

export default function ProfileHeaderSummary() {
  return (
    <>
      <div className="profile_header_summary">
        <div
          className="persona_name persona_name_spacer"
          style={{ fontSize: "24px" }}
        >
          <span className="actual_persona_name">&nbsp;</span>
        </div>
        <div className="header_real_name_spacer">&nbsp;</div>
        <div className="profile_summary noexpand">
          {/* <div className="bb_h3">
            <b>
              Trade Link:{" "}
              <a className="bb_link" href="#" target="_blank" rel="">
                Click here
              </a>
            </b>
          </div> */}
          <InputImageButton />
        </div>
        <div className="profile_summary_footer" style={{ display: "none" }}>
          <span className="whiteLink">View more info</span>
        </div>
      </div>
    </>
  );
}
