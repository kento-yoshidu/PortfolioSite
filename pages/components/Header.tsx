import React, { useState } from "react"
import Link from "next/link"

import styled from "styled-components"

import Styles from "../styles/header.module.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart, faRedo } from "@fortawesome/free-solid-svg-icons"

import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false

const gradientColors = [
  "124deg, rgba(21, 87, 153, 0.8), rgba(21, 153, 87, 0.7)",
  "202deg, rgba(18, 194, 233, 0.7), rgba(196, 113, 237, 0.9), rgba(246, 79, 89, 0.7)",
  "135deg, rgba(131, 58, 180, 0.7), rgba(253, 29, 29, 0.7), rgba(252, 176, 69, 0.7)",
  "45deg, rgba(247, 183, 51, 0.7), rgba(252, 74, 26, 0.77)",
  "35deg, rgba(36, 11, 54, 0.7), rgba(195, 20, 50, 0.7)",
  "320deg, rgba(241, 23, 18, 0.7), rgba(0, 153, 247, 0.77)",
  "rgba(185, 29, 115, 0.7), rgba(249, 83, 198, 0.7)",
  "15deg, rgba(5, 117, 230, 0.7), rgba(0, 242, 96, 0.7)",
  "180deg, rgba(41, 72, 255, 0.7), rgba(57, 106, 252, 0.7)"
]

const bgUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAABnSURBVHja7M5RDYAwDEXRDgmvEocnlrQS2SwUFST9uEfBGWs9c97nbGtDcquqiKhOImLs/UpuzVzWEi1atGjRokWLFi1atGjRokWLFi1atGjRokWLFi1af7Ukz8xWp8z8AAAA//8DAJ4LoEAAlL1nAAAAAElFTkSuQmCC";

interface CustomProps {
  theme: number
}

const HeaderWrapper = styled.header<CustomProps>`
    position: relative;
    background: url(${bgUrl}) repeat 0 0;
    color: #eee;
    font-weight: 100;
    animation: bgScrollingReverse 0.92s infinite;
    animation-timing-function: linear;

    &::before {
      position: absolute;
      content: "";
      height: 100%;
      width: 100%;
      background-image: linear-gradient(${({ theme }) => typeof theme === "object" ? `124deg, rgba(21, 87, 153, 0.8), rgba(21, 153, 87, 0.7)` : `${gradientColors[theme]}`});
      background-color: transparent;
    }

    @keyframes bgScrollingReverse {
      100% { background-position: 50px 50px; }
    }
  `

const Header = () => {
  const [theme, setTheme] = useState<number>(0)

  const handleClick = () => {
    (theme < gradientColors.length - 1) ? setTheme(theme + 1) : setTheme(0)
  }

  return (
    <HeaderWrapper theme={theme}>

      <button
        onClick={handleClick}
        className={Styles.button}
        aria-label="背景色を変更"
      >
        <FontAwesomeIcon
          icon={faRedo}
        />
      </button>

      <div className={Styles.wrapper}>
        <p className={Styles.name}>Kento Yoshizu</p>
        <h1 className={Styles.headerTitle}>Portfolio Website</h1>
        <p className={Styles.message}>I <FontAwesomeIcon icon={faHeart} /> HTML & CSS</p>
        <p className={Styles.update}>更新日 : <time className={Styles.date} dateTime="2023-03-14">2023年3月14日</time></p>

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
    </HeaderWrapper>
  )
}

export default Header
