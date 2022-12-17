import React, { useState, useEffect, useRef } from "react"
import { ServerStyleSheet } from "styled-components"

import Styles from "../styles/loading.module.scss"

const Loading = () => {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setTimeout(() => {
      ref.current?.classList.add(Styles.hide)
    }, 1500)
  })

  return (
    <div
      className={Styles.wrapper}
      ref={ref}
    >
      <div className={Styles.container}>
        <div className={Styles.loader}><span></span></div>
        <div className={Styles.loader}><span></span></div>
        <div className={Styles.loader}><i></i></div>
        <div className={Styles.loader}><i></i></div>
      </div>
    </div>
  )
}

export default Loading
