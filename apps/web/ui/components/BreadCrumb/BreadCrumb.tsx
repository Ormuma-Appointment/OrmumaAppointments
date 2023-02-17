import React from "react";
import styles from "./BreadCrumb.module.css";

interface BreadCrumbProps {
  steps: string[];
  current: number;
}

const BreadCrumb: React.FC<BreadCrumbProps> = ({ steps, current }) => {
  return (
    <div className={styles.breadcrumb}>
      {steps.map((el, index) => {
        return (
          <React.Fragment key={index}>
            <div
              className={
                current === index
                  ? styles.current_breadcrumb
                  : styles.one_breadcrumb
              }
            >
              {el}
            </div>{" "}
            <span className={styles.arrows}> &#9654;</span>{" "}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default BreadCrumb;
