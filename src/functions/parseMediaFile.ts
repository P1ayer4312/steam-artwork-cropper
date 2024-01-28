type MediaFileData = {
  dataUrl: string;
  width: number;
  height: number;
};

export default async function parseMediaFile(
  file: File
): Promise<MediaFileData> {
  return await new Promise((resolve, reject) => {
    const tempImage = new Image();
    const imgObjectUrl = URL.createObjectURL(file);

    tempImage.onerror = reject;
    tempImage.onload = () => {
      resolve({
        dataUrl: imgObjectUrl,
        width: tempImage.width,
        height: tempImage.height,
      } as MediaFileData);
    };

    tempImage.src = imgObjectUrl;
  });
}
