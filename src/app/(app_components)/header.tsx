import styles from './app_components.module.css'
import Image from 'next/image'
import mainImage from '../../../public/main.png'

export default function Header() {
  return (
    <div className={styles.video} >
      <Image
        src={mainImage}
        alt="House in the distance"
        // sizes="100vw"
        fill
        style={{
          objectFit: 'cover',
        }}
        quality={75}
      />
      <div className={styles.videoContent}>
        <h1 style={{}}>The perfect getaway</h1>
        <p style={{}}>Take a trip to the heart of Upstate New York</p>
        <div className={styles.actionContainer}>
          <div className={styles.actionButton}>
            <Image
              src="/down-arrow.png"
              alt=""
              height={25}
              width={25}
            />
            View listings
          </div>
          Explore the area
        </div>
      </div>
    </div>
  )
}
