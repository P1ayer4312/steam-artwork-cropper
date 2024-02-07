import { useRef } from "react";
import Checkbox from "../../old-checkbox/checkbox";
import OptionsTable from "../../options-table/options-table";
import "./artwork-stats.css";
import downloadArtwork from "../../panel/artwork/functions/downloadArtwork";
import useGlobalStore from "../../../store/useGlobalStore";

function formatResolution(value: { width: number; height: number }) {
  return `${value.width} x ${value.height}`;
}

export default function ArtworkStats() {
  const checkboxRef = useRef<HTMLInputElement>(null);
  const { artwork, file } = useGlobalStore();

  return (
    <div className="profile_rightcol">
      <div className="responsive_status_info">
        <OptionsTable
          tableHead={{ key: "PANEL DATA", value: "VALUE" }}
          tableBody={[
            {
              key: "Original Image",
              value: formatResolution(artwork.imageResolutions.original),
            },
            {
              key: "Big Image",
              value: formatResolution(artwork.imageResolutions.primary),
            },
            {
              key: "Small Image",
              value: formatResolution(artwork.imageResolutions.rightCol),
            },
            { key: "Left Offset", value: "887" },
            {
              key: "Big Image Size",
              value: `${artwork.imageSize.primary} kB`,
            },
            {
              key: "Small Image Size",
              value: `${artwork.imageSize.rightCol} kB`,
            },
          ]}
        />
        <Checkbox id="testing" ref={checkboxRef}>
          Bottom right space
        </Checkbox>

        <button
          className="old-button artwork-stats-dl-btn"
          onClick={() => {
            const fileName = file.name;
            downloadArtwork(fileName);
          }}
        >
          Download Images
        </button>

        {/* <div className="profile_in_game persona online">
          <div className="profile_in_game_header">Currently Online</div>
        </div>
        <div className="profile_ban_status">
          <div className="profile_ban">
            1 VAC ban on record{" "}
            <span className="profile_ban_info">
              |{" "}
              <a className="whiteLink" href="#" target="_blank" rel="">
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
        </div> */}
      </div>

      {/* <div className="responsive_count_link_area">
        <div className="profile_item_links">
          <div className="profile_count_link ellipsis">
            <a href="#">
              <span className="count_link_label">Games</span>
              &nbsp;
              <span className="profile_count_link_total"> 323 </span>
            </a>
          </div>
          <div className="profile_count_link ellipsis">
            <a href="#">
              <span className="count_link_label">Inventory</span>
              &nbsp;
              <span className="profile_count_link_total">&nbsp;</span>
            </a>
          </div>
          <div className="profile_count_link ellipsis">
            <a href="#">
              <span className="count_link_label">Screenshots</span>
              &nbsp;
              <span className="profile_count_link_total"> 138 </span>
            </a>
          </div>
          <div className="profile_count_link ellipsis">
            <a href="#">
              <span className="count_link_label">Videos</span>
              &nbsp;
              <span className="profile_count_link_total">&nbsp;</span>
            </a>
          </div>
          <div className="profile_count_link ellipsis">
            <a href="#">
              <span className="count_link_label">Workshop Items</span>
              &nbsp;
              <span className="profile_count_link_total"> 5 </span>
            </a>
          </div>
          <div className="profile_count_link ellipsis">
            <a href="#">
              <span className="count_link_label">Reviews</span>
              &nbsp;
              <span className="profile_count_link_total"> 17 </span>
            </a>
          </div>
          <div className="profile_count_link ellipsis">
            <a href="#">
              <span className="count_link_label">Guides</span>
              &nbsp;
              <span className="profile_count_link_total"> 1 </span>
            </a>
          </div>
          <div className="profile_count_link ellipsis">
            <a href="#">
              <span className="count_link_label">Artwork</span>
              &nbsp;
              <span className="profile_count_link_total"> 5 </span>
            </a>
          </div>
          <div style={{ clear: "left" }}></div>
        </div>
      </div> */}
    </div>
  );
}
