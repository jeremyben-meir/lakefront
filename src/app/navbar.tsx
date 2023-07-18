'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './navbar.module.css'
import Image from 'next/image'

export default function Navbar() {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const scrollUp = () => {
    const scrollto = window.document.getElementById("homediv-scrollable")
    if (isHome && scrollto!==null)
      scrollto.scrollIntoView({ behavior: "smooth" })
  }
  return (
    <div className={styles.mainStyle}>
      <div className={styles.divStyle}>
        <Link href="/" className={styles.linkStyle}>
              HOME
        </Link>
      </div>
      <div
        className={styles.logoStyle}
      >
        <Link href="/" className={styles.linkStyle} onClick={scrollUp}>
          <Image
            src="/logo.png"
            alt="Lakefront Escapes NY logo"
            width={95}
            height={50}
          />
        </Link>
      </div>
      <div className={styles.divStyle}>
        <Link href="/explore" className={styles.linkStyle}>
              EXPLORE
        </Link>
      </div>
    </div>
  )
}