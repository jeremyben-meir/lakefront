'use server'
import { Amplify, Storage, Auth } from "aws-amplify"
import awsconfig from "../../aws-exports"

Amplify.configure(awsconfig)
Storage.configure(awsconfig)
Auth.configure(awsconfig)

export const main = async (imageName:string) => {
  var img_list: any = await Storage.list(imageName, {
    level: "public",
    pageSize: 200
  })

  img_list = img_list.results.filter(function (img:any) {
    return img.key.includes(".png") || img.key.includes(".jp")
  })


  const image_url_list: string[] = await Promise.all(img_list.map(async (image:any) => {
    if (image.size > 0) {
      return Storage.get(image.key, { download: false })
    }
    return null
  }))
  return image_url_list

  // Promise.all(
  //   img_list.map(async (image:any) => {
  //     if (image.size > 0) {
  //       return Storage.get(image.key, { download: false })
  //     }
  //     return null
  //   })
  // ).then((value) => {
  //   setImageCallback(value)
  // })
}
