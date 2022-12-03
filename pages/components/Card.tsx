import React, { useEffect } from "react"

import cardIntersectionObserver from "../../lib/cardIntersectionObserver"
import Styles from "../styles/card.module.scss"

type Props = {
  color: string
  num: number
  text: string
}

const Card = ({ color, num, text }: Props) => {
  useEffect(() => {
    cardIntersectionObserver()
  }, [])

  return (
    <div className={Styles.card}>
      {/* @ts-ignore */}
      <div className={Styles.percent} style={{ "--color": color, "--num": num }}>

        <div className={Styles.dot}></div>
        <svg className={Styles.svg}>
          <circle cx="70" cy="70" r="70"></circle>
          <circle cx="70" cy="70" r="70"></circle>
        </svg>

        <div className={Styles.number}>
          <p>{num}<span>%</span></p>
        </div>
      </div>

      <h2 className={Styles.text}>{text}</h2>
    </div>
  )
}

export default Card

