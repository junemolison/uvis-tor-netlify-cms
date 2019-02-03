const adjustSize = (multiplier) => ({ width, height }) => ({
  width: width * multiplier,
  height: height * multiplier
})

export const adjustSizeInGallery = (image) => {
  const adjustInGallery = adjustSize(200 / image.height)
  return adjustInGallery(image)
}
