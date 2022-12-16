import React, { useState, useEffect, useRef } from "react"

import Styles from "../styles/loading.module.scss"

const Loading = () => {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setTimeout(() => {
      ref.current?.classList.add(Styles.hide)
    }, 1000)
  })

  return (
    <div
      className={Styles.wrapper}
      ref={ref}
    >
      <h1>Loading</h1>
    </div>
  )
}

export default Loading
