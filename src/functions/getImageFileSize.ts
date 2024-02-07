export default function getImageFileSize(dataUrl: string): number {
  const base64str = dataUrl.split("base64,")[1];
  const decoded = atob(base64str);
  return Number((decoded.length / 1000).toFixed(1));
}
