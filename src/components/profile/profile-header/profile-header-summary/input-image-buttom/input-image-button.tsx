export default function InputImageButton() {
  return (
    <>
      <div className="input-image-wrapper">
        <p>Select media file</p>
        <button>Open file</button>
        <input type="file" />
        <br />
        <p>File name: ----</p>
      </div>
    </>
  );
}
