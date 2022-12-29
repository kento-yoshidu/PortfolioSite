import React, { useEffect } from "react"

import cardIntersectionObserver from "../../lib/cardIntersectionObserver"
import Styles from "../styles/card.module.scss"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons"

import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false

type Props = {
  color: string
  num: number
  text: string
  completedTasks?: string[]
  incompleteTasks?: string[]
  links?: string[][]
}

const Card = ({ color, num, text, completedTasks, incompleteTasks, links }: Props) => {
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

      {(completedTasks || incompleteTasks || links) && (
        <details className={Styles.details}>
          <summary>詳細</summary>

          <ul>
            {links ? links.map((link) => (
              <li
                className={Styles.linkListItem}
                key={`link${link[0]}`}
              >
                <a
                  href={link[1]}
                  target="_blank"
                  rel="noreferrer"
                >
                  {link[0]}
                </a>

                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                />
              </li>
            )) : (
              <>
                {completedTasks && completedTasks.map((task) => (
                  <li key={`completed${task}`}>✅ {task}</li>
                ))}
                {incompleteTasks && incompleteTasks.map((task) => (
                  <li key={`incomplete${task}`}>⬜️ {task}</li>
                ))}
              </>
            )}
          </ul>
        </details>
      )}
    </div>
  )
}

export default Card

