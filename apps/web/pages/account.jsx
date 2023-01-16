import React from "react";
import Button from "../ui/components/Button/Button";
import calendar from "../ui/components/assets/calendar.svg";

function account() {
  return (
    <div>
      <h1>Mein Account</h1>
      <Button icon={calendar} size="medium" variant="primary">
        Termin buchen
      </Button>
      <div>
        <h3>Meine Daten</h3>
      </div>
      <div>
        <div>
          <h3>Mein nächster Termin</h3>
        </div>
        <div>
          <h3>Mein vergangenen Termin(e)</h3>
        </div>
      </div>
    </div>
  );
}

export default account;
