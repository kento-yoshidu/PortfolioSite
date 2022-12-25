import Styles from "../styles/appsAndSites.module.scss"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons" 

import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false

type Props = {
  url: string
  title: string
  text: string
  technologies: string[]
}

const AppsAndSites = ({ url, title, text, technologies }: Props) => (
  <details className={Styles.details}>
    <summary className={Styles.summary}>
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
      >
        {title}

        <FontAwesomeIcon
          icon={faArrowUpRightFromSquare}
          className={Styles.icon}
        />
      </a>
    </summary>

    <p className={Styles.text}>{text}</p>

    <ul className={Styles.technologies}>
      {technologies?.map((tec) => (
        <li
          key={tec}
          className={Styles.listItem}
        >
          <span>⚙</span> {tec}
        </li>
      ))}
    </ul>
  </details>
)

export default AppsAndSites
