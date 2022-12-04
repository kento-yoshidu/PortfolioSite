import Link from "next/link"

import Styles from "../styles/pagelink.module.scss"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCode } from "@fortawesome/free-solid-svg-icons"

import "@fortawesome/fontawesome-svg-core/styles.css"
import {
  config,
} from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false

type Props = {
  url: string
  title: string
  text: string
}

const PageLink = ({ url, title, text}: Props) => (
  <a
    className={Styles.link}
    href={url}
  >
    <h3 className={Styles.title}>{title}</h3>

    <FontAwesomeIcon icon={faCode} className={Styles.icon}/>

    <p className={Styles.text}>{text}</p>
  </a>
)

export default PageLink
