import React from 'react'
import Header from './header'
import Main from './main'
import Footer from './footer'
import styles from './home.module.css'
export default function Home() {
  return (
    <div className={styles.main}>
        <Header/>
        <Main/>
        <Footer/>
    </div>
  )
}
