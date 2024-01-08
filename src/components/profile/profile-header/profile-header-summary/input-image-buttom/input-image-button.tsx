import React, { useRef } from "react";
import "./input-image-button.css";
import { useGlobalContext } from "../../../../../context/global-context/GlobalContext";

export default function InputImageButton() {
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const globalContext = useGlobalContext();

  function onOpenFileButtonClick() {
    inputFileRef.current?.click();
  }

  function onInputFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.currentTarget.files;
    if (files && files[0]) {
      const file = files[0];

      globalContext?.file.set({
        data: file,
        name: file.name,
      });

      globalContext?.status.set("Measuring, please wait...");
    }
  }

  return (
    <>
      <div className="input-image-wrapper">
        <p className="input-image-header">Select media file</p>
        <div className="input-image-box">
          <button className="old-button" onClick={onOpenFileButtonClick}>
            Open file
          </button>
          <div className="input-image-name">
            {globalContext?.file.value.name}
          </div>
          <input
            type="file"
            ref={inputFileRef}
            hidden
            style={{ display: "none" }}
            onChange={onInputFileChange}
          />
        </div>
      </div>
    </>
  );
}
