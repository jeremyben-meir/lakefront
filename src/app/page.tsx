'use client'
import styles from './page.module.css'
import Footer from './(bars)/footer'
import Header from './(app_components)/header'
import Listing from './(app_components)/listing'
import houseJSON from "../assets/HouseInfo.json"
import { useWindowSize } from './(scripts)/sizing'

import { Amplify, Storage, Auth } from "aws-amplify"
import awsconfig from "../aws-exports"

Amplify.configure(awsconfig)
Storage.configure(awsconfig)
Auth.configure(awsconfig)

export default function Home(props:any) {
  // const narrow1k = props.windowSize.innerWidth < 1000
  // const gapSize = narrow1k ? "20px" : "40px"
  const windowSize = useWindowSize()

  const gapSize = "40px"
  return (
    <main className={styles.main}>
      <div className={styles.headerContainer} >
        <div style={{ minHeight:"75px", width:"100%"}} />
        <div className={styles.videoContainer} >
          <Header/>
        </div>
      </div>
      <div
        style={{
          width: "100%",
        }}
        id={"scrollable"}
      />
      <div style={ListingContainerStyle(gapSize)}>
        {houseJSON.map((house:any, index:number) => {
          return (
            <Listing
              key={"key" + index}
              Storage={Storage}
              houseDetail={house}
              windowSize={windowSize}
            />
          )
        })}
      </div>
      <Footer/>
    </main>
  )
}

const ListingContainerStyle:any = (gapSize:number) => ({
  display: "flex",
  padding: gapSize,
  flexDirection: "column",
  gap: gapSize,
})
