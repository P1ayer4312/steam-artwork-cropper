import { PropsWithChildren, useEffect, useRef } from "react";
import "./small-window.dialog.css";

export default function SmallWindowDialog(props: PropsWithChildren) {
  const smallWindowDialogRef = useRef<HTMLDivElement | null>(null);
  function disableRightClick(event: Event) {
    event.preventDefault();
  }

  useEffect(() => {
    const element = smallWindowDialogRef.current!;
    element.addEventListener("contextmenu", disableRightClick);

    return () => {
      element.removeEventListener("contextmenu", disableRightClick);
    };
  });

  return (
    <>
      {props.children}
      <div className="small-window-dialog no-select" ref={smallWindowDialogRef}>
        <div className="small-window-dialog-window">
          <div className="small-window-dialog-window-title">
            <img src="./img/steam-logo-disconnect.jpg" alt="" />
            <span>Disconnected</span>
          </div>
          <div className="small-window-dialog-window-body">
            Window width size is too small. Make sure to maximize your browser
            window, this method relies on the Steam profile overlay (at least
            1000px or above).
          </div>
          <div className="small-window-dialog-disabled-btn">
            <button className="old-button" disabled>
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
