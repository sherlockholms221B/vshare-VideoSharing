import { client } from './client'

export const upload = async (
  selectedFile: any,
  setIsloading: any,
  setImageAsset: any,
  setWrongeFileType: any
) => {
  const fileTypes = [
    'image/png',
    'image/jpeg',
    'image/svg',
    'image/gif',
    'image/tiff',
  ]
  if (fileTypes.includes(selectedFile.type)) {
    setIsloading(true)
    client.assets
      .upload('image', selectedFile, {
        contentType: selectedFile.type,
        filename: selectedFile.name,
      })
      .then((data: any) => {
        setImageAsset(data)
        setIsloading(false)
      })
  } else {
    setIsloading(false)
    setWrongeFileType(true)
  }
}
