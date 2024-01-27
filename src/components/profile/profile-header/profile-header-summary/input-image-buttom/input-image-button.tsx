import React, { useRef } from "react";
import "./input-image-button.css";
import useGlobalStore from "../../../../../store/useGlobalStore";

export default function InputImageButton() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const { file, setFile } = useGlobalStore();

  function onOpenFileButtonClick() {
    inputFileRef.current?.click();
  }

  function onInputFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.currentTarget.files;
    if (files && files[0]) {
      const file = files[0];

      setFile({
        name: file.name,
        data: file,
      });
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
          <div className="input-image-name">{file.name}</div>
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
