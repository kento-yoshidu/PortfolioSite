import Styles from "../styles/footer.module.scss"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"

import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false

const Footer = () => (
  <footer className={Styles.footer}>

    <a
      href="https://github.com/kento-yoshidu/PortfolioSite"
      className={Styles.link}
    >
      <FontAwesomeIcon
        className={Styles.icon}
        icon={faGithub}
      />
    </a>

    <h2 className={Styles.footerTitle}>Developed by Next.js</h2>
  </footer>
)

export default Footer
