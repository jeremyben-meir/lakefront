import Image from 'next/image'
import styles from './page.module.css'
import Navbar from './navbar'
import Footer from './footer'

export default function Home() {
  return (
    <main className={styles.main}>
      <div style={{ width: "20px" }} />
      <Footer/>
    </main>
  )
}
