import Link from "next/link"

import Styles from "../styles/linkButton.module.css"

type Props = {
  path: string,
  text: string
} 

const LinkButton = ({ path, text }: Props) => {
  return (
    <div className={Styles.wrapper}>
      <Link href={path ?? ""} className={Styles.button}>
        {text}
      </Link>
    </div>
  )
}

export default LinkButton
