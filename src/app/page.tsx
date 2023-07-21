import styles from './page.module.css'
import Footer from './(bars)/footer'
import Header from './(app_components)/header'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.headerContainer} >
        <div style={{ minHeight:"75px", width:"100%"}} />
        <div className={styles.videoContainer} >
          <Header/>
        </div>
      </div>
      
      <Footer/>
    </main>
  )
}
