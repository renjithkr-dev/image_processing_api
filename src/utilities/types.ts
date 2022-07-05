/* eslint-disable no-unused-vars */
enum ImageFormat {
  jpeg = "jpeg",
  png = "png",
  webp = "webp",
  gif = "gif",
  svg = "svg",
}
enum ImageFit {
  cover = "cover",
  contain = "contain",
  fill = "fill",
  inside = "inside",
  outside = "outside",
}

type ImageOptions = {
  format: ImageFormat;
  quality: number;
  fit: ImageFit;
};

export { ImageFit, ImageFormat, ImageOptions };
