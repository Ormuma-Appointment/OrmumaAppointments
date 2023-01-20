import React from "react";
import Times from "./Times";

const Time = (props) => {
  return <div>{props.showTime ? <Times date={props.date} /> : null}</div>;
};

export default Time;
