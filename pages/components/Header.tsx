import React, { useState } from "react"
import Link from "next/link"

import Styles from "../styles/header.module.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"

import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false

const Header = () => {
  return (
    <header className={Styles.header}>
      <div className={Styles.wrapper}>
        <p className={Styles.name}>Kento Yoshizu</p>
        <h1 className={Styles.headerTitle}>Portfolio Website</h1>
        <p className={Styles.message}>I <FontAwesomeIcon icon={faHeart} /> HTML & CSS</p>
        <p className={Styles.update}>更新日 : <time className={Styles.date} dateTime="2023-05-02">2023年5月2日</time></p>

        <Link
          className={Styles.arrowContainer}
          href="#sec1"
          aria-label="次のセクションへ移動"
        >
          <div className={Styles.arrow}></div>
          <div className={Styles.arrow}></div>
          <div className={Styles.arrow}></div>
        </Link>
      </div>
    </header>
  )
}

export default Header
