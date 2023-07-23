'use server'
import { Amplify, Storage, Auth } from "aws-amplify"
import awsconfig from "../../aws-exports"

Amplify.configure(awsconfig)
Storage.configure(awsconfig)
Auth.configure(awsconfig)


export const main = async (imageName:string, setImageCallback:(res:string[])=>void) => {
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
