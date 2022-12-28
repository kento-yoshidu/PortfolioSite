import React, { useEffect } from "react"

import cardIntersectionObserver from "../../lib/cardIntersectionObserver"
import Styles from "../styles/card.module.scss"

type Props = {
  color: string
  num: number
  text: string
  completedTasks: string[]
  incompleteTasks: string[]
}

const Card = ({ color, num, text, completedTasks, incompleteTasks }: Props) => {
  useEffect(() => {
    cardIntersectionObserver()
  }, [])

  return (
    <div className={Styles.card}>
      <div className={Styles.percent} style={{ "--color": color, "--num": num } as React.CSSProperties}>

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

      <details className={Styles.details}>
        <summary>詳細</summary>

        <ul>
          {completedTasks!.map((task) => (
            <li key={`completed${task}`}>✅ {task}</li>
          ))}
          {incompleteTasks!.map((task) => (
            <li key={`incomplete${task}`}>⬜️ {task}</li>
          ))}
        </ul>
      </details>
    </div>
  )
}

export default Card

