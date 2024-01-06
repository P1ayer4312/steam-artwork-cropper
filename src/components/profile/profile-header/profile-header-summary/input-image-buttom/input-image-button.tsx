import React, { useRef, useState } from "react";
import "./input-image-button.css";

export default function InputImageButton() {
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const [displayFileName, setDisplayFileName] =
    useState<string>("No file chosen");

  function onOpenFileButtonClick() {
    inputFileRef.current?.click();
  }

  function onInputFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.currentTarget.files;
    if (files && files[0]) {
      const file = files[0];
      setDisplayFileName(file.name);
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
          <div className="input-image-name">{displayFileName}</div>
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
