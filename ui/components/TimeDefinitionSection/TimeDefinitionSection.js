import React, { useEffect, useState } from "react";
import styles from "./TimeDefinitionSection.module.css";
import SelectElement from "../SelectElement/SelectElement";

function TimeDefinitionSection({ openDays, setTimes, times, hasData }) {
  const [localTimes, setLocalTimes] = useState(times);
  const [localHasData, setLocalHasData] = useState(hasData);

  useEffect(() => {
    setLocalTimes((prev) => times);
  }, [times]);

  useEffect(() => {
    setLocalHasData((prev) => hasData);
  }, [hasData]);

  let start = "start";
  let end = "end";
  let breakStart = "breakStart";
  let breakEnd = "breakEnd";

  function handleChange(e) {
    let target_name = e.target.name;
    let weekday = target_name.split("_")[0];
    let start_end = target_name.split("_")[1];

    // find day using index and correct timeslot to paste  selected input in
    setTimes((prev) =>
      prev.map((time) => {
        if (time.label !== weekday) {
          return time;
        } else if (start_end === "start") {
          return {
            ...time,
            start: e.target.value === "-" ? null : e.target.value,
          };
        } else if (start_end === "end") {
          return {
            ...time,
            end: e.target.value === "-" ? null : e.target.value,
          };
        } else if (start_end === "breakStart") {
          return {
            ...time,
            breakStart: e.target.value === "-" ? null : e.target.value,
          };
        } else if (start_end === "breakEnd") {
          return {
            ...time,
            breakEnd: e.target.value === "-" ? null : e.target.value,
          };
        }
      })
    );
  }

  return (
    <div className={styles.container}>
      {openDays.map((el, index) => {
        let rowToUpdate = times.findIndex((item) => item.label === el);
        return (
          <div key={index}>
            <div
              className={styles.input_group}
              onChange={(e) => handleChange(e, el)}
            >
              <p>{el}</p>
              <SelectElement
                time={start}
                day={el}
                hasData={hasData}
                value={localHasData ? localTimes[rowToUpdate].start : "-"}
                label="Start"
              />
              <SelectElement
                time={end}
                day={el}
                hasData={hasData}
                value={
                  localHasData
                    ? localTimes[times.findIndex((item) => item.label === el)]
                        .end
                    : "-"
                }
                label="Ende"
              />
              <p>Pause:</p>
              <SelectElement
                time={breakStart}
                day={el}
                hasData={hasData}
                value={
                  localHasData
                    ? localTimes[times.findIndex((item) => item.label === el)]
                        .breakStart
                    : "-"
                }
                label="P.Start"
              />
              <SelectElement
                time={breakEnd}
                day={el}
                hasData={hasData}
                value={
                  localHasData
                    ? localTimes[times.findIndex((item) => item.label === el)]
                        .breakEnd
                    : "-"
                }
                label="P.Ende"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TimeDefinitionSection;
