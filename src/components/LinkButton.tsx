import { Link, type LinkProps } from "@tanstack/react-router";

import Styles from "../styles/linkButton.module.css";

type Props = {
  to: LinkProps["to"];
  hash?: string;
  text: string;
};

const LinkButton = ({ to, hash, text }: Props) => {
  return (
    <div className={Styles.wrapper}>
      <Link to={to} hash={hash} className={Styles.button}>
        {text}
      </Link>
    </div>
  );
};

export default LinkButton;
