import React, { useEffect, useState } from "react";
import styles from "./ServiceAdd.module.css";
import Minus from "../assets/minus.svg";

function setTwoNumberDecimal(e) {
  e.target.value = parseFloat(e.target.value).toFixed(2);
}

function ServiceDetailInput({
  name,
  categories,
  servicesDetails,
  setIndexToRemove,
  index,
  setRemove,
}) {
  const [duration, setDuration] = useState(
    servicesDetails ? servicesDetails.duration : ""
  );
  const [category, setCategory] = useState(
    servicesDetails ? servicesDetails.category : categories[0]
  );
  const [waiting, setWaiting] = useState(
    servicesDetails ? servicesDetails.waiting : ""
  );
  const [price, setPrice] = useState(
    servicesDetails ? servicesDetails.price : ""
  );

  useEffect(() => {
    setCategory(servicesDetails ? servicesDetails.category : categories[0]);
    setDuration(servicesDetails ? servicesDetails.duration : "");
    setWaiting(servicesDetails ? servicesDetails.waiting : "");
    setPrice(servicesDetails ? servicesDetails.price : "");
  }, [servicesDetails]);

  return (
    <div className={styles.group}>
      <div>{name}</div>
      <select
        name={`category`}
        id="category"
        className={styles.select_category}
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {categories.map((elem, i) => {
          return (
            <option key={i} value={elem}>
              {elem}
            </option>
          );
        })}
      </select>
      <select
        name="duration"
        id="duration"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        className={styles.select_things}
      >
        {[15, 30, 45, 60, 75, 90, 105, 120].map((elem, i) => {
          return (
            <option key={i} value={elem}>
              {elem < 60 ? `${elem} mins` : `${elem / 60} h`}
            </option>
          );
        })}
      </select>
      <select
        name="waiting"
        id="waiting"
        value={waiting}
        onChange={(e) => setWaiting(e.target.value)}
        className={styles.select_things}
      >
        {[0, 15, 30, 45, 60, 75, 90, 105, 120].map((elem, i) => {
          return (
            <option key={i} value={elem}>
              {elem < 60 ? `${elem} mins` : `${elem / 60} h`}
            </option>
          );
        })}
      </select>
      <input
        name="price"
        value={price}
        type="number"
        step="0.01"
        onChange={(e) => {
          setPrice(e.target.value);
        }}
        onBlur={(e) => setTwoNumberDecimal(e)}
        className={styles.select_things}
      />
      <div className={styles.delete}>
        <Minus
          className={styles.icon}
          onClick={() => {
            setIndexToRemove(index);
            setRemove((prev) => !prev);
          }}
        />
      </div>
    </div>
  );
}

export default ServiceDetailInput;
