import React from "react";
import styles from "./EmployeeOverview.module.css";
import StylistCard from "../StylistCard/StylistCard";

function EmployeeOverview({ employees }) {
  return (
    <div className={styles.employees}>
      {employees.map((el, index) => {
        return (
          <StylistCard
            key={index}
            name={el.name}
            description={el.description}
          />
        );
      })}
    </div>
  );
}

export default EmployeeOverview;
