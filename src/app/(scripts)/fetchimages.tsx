import { StorageClass } from "aws-amplify"

export const main = async (Storage:StorageClass, imageName:string, setImageCallback:(res:string[])=>void) => {
  var img_list: any = await Storage.list(imageName, {
    level: "public",
  })

  img_list = img_list.filter(function (img:any) {
    return img.key.includes(".png") || img.key.includes(".jp")
  })

  Promise.all(
    img_list.map(async (image:any) => {
      if (image.size > 0) {
        return Storage.get(image.key, { download: false })
      }
      return null
    })
  ).then((value) => {
    setImageCallback(value)
  })
}
