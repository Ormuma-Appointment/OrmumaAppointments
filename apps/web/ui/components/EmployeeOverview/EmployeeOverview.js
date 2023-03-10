import React from "react";
import styles from "./EmployeeOverview.module.css";
import StylistCard from "../StylistCard/StylistCard";

function EmployeeOverview({ employees, setEmployeeIndex, isClickable }) {
  return (
    <div className={styles.employees}>
      {employees.map((el, index) => {
        return (
          <StylistCard
            key={index}
            index={index}
            name={el.name}
            description={el.description}
            setEmployeeIndex={setEmployeeIndex}
            id={employees[index].id}
            isClickable={isClickable}
          />
        );
      })}
    </div>
  );
}

export default EmployeeOverview;
