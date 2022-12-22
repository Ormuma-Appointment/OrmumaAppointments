import React from "react";
import styles from "./Link.module.css";
import "../../../../apps/web/globals.css";
import * as PropTypes from "prop-types";

function Link(props) {
  const { size = "medium", children = "Click here", ...rest } = props;

  return (
    <a className={`${styles.link} ${styles[size]}`} {...rest}>
      {children}
    </a>
  );
}
Link.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
};

export default Link;
