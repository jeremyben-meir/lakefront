import React from "react"
import styles from './navbar.module.css'
import Image from 'next/image'

export default function Footer () {
  return (
    <div className={styles.footerStyle}>
      <div className={styles.footerSubstyleLeft}>
        <Image
          className={styles.imageStyle}
          width={20}
          height={20}
          src={"/footer/phone-call-white.png"}
          alt="phone"
        />
        +1 (518) 929-4623
      </div>
      <div className={styles.footerSubstyleRight}>
        <Image
          className={styles.imageStyle}
          width={20}
          height={20}
          src={"/footer/instagram-white.png"}
          alt="insta"
        />
        <Image
          className={styles.imageStyle}
          width={20}
          height={20}
          src={"/footer/email.png"}
          alt="insta"
        />
      </div>
    </div>
  )
}
