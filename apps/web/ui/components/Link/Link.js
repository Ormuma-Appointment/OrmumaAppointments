import React from "react";
import styles from "./Link.module.css";
import Link from "next/link";
function StyledLink({ href }) {
  const { children = "Click here", ...rest } = props;

  return (
    <Link href={href} className={styles.link} {...rest}>
      {children}
    </Link>
  );
}

export default Link;
