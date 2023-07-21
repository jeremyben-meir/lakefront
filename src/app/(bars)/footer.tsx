import React from "react"
import styles from './bars.module.css'
import Image from 'next/image'

export default function Footer () {
  return (
    <div className={styles.footerStyle}>
      <div className={styles.footerSubstyleLeft}>
        <Image
          className={styles.imageStyle}
          width={20}
          height={20}
          src={"/footer/phone.png"}
          alt="phone"
        />
        +1 (518) 929-4623
      </div>
      <div className={styles.footerSubstyleRight}>
        <Image
          className={styles.imageStyle}
          width={25}
          height={25}
          src={"/footer/instagram.png"}
          alt="insta"
        />
        <Image
          className={styles.imageStyle}
          width={25}
          height={25}
          src={"/footer/email-white.png"}
          alt="email"
        />
      </div>
    </div>
  )
}
