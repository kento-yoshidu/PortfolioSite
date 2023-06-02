import { useRef } from "react"

import Styles from "../styles/appsAndSites.module.css"

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

const animeTiming = {
  duration: 800,
  easing: "ease"
}

const closingAnimeKeyframes = (content: HTMLDivElement) => [
  {
    height: content.offsetHeight + "px",
    opacity: 1
  },
  {
    height: 0,
    opacity: 0
  }
]

const openingAnimeKeyframes = (content: HTMLDivElement) => [
  {
    height: 0,
    opacity: 0
  },
  {
    height: content.offsetHeight + "px",
    opacity: 1
  }
]

const AppsAndSites = ({ url, title, text, technologies }: Props) => {
  const refContent = useRef<HTMLDivElement>(null)

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault()

    const detailsElement = refContent.current?.parentNode as HTMLDialogElement

    if (detailsElement.dataset.animeStatus === "running") {
      return
    }

    if (detailsElement.open) {
      detailsElement.dataset.animeStatus = "running"

      refContent.current!.animate(closingAnimeKeyframes(refContent.current!), animeTiming).onfinish = () => {
        detailsElement.removeAttribute("open")
        detailsElement.dataset.animeStatus = ""
      }
    } else {
      detailsElement.setAttribute("open", "true")

      const openAnimation = refContent.current?.animate(openingAnimeKeyframes(refContent.current), animeTiming)

      detailsElement.dataset.animeStatus = "running"

      openAnimation!.onfinish = () => {
        detailsElement.dataset.animeStatus = ""
      }
    }
  }

  return (
    <details className={Styles.details}>
      <summary
        className={Styles.summary}
        onClick={handleClick}
      >
        {title}
      </summary>

      <div ref={refContent}>
        <p className={Styles.text}>
          <a
            className={Styles.link}
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
        </p>

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
      </div>
    </details>
  )
}

export default AppsAndSites
