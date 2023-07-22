import styles from './page.module.css'
import Footer from './(bars)/footer'
import Header from './(app_components)/header'
import Listing from './(app_components)/listing'
import houseJSON from "../assets/HouseInfo.json"

export default function Home(props:any) {

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
              houseDetail={house}
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
