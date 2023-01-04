import React, { useState } from "react";
import Registration from "../ui/components/Registration/Registration";

function register() {
  const [email, setEmail] = useState(null);
  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  return (
    <>
      <Registration />
    </>
  );
}

export default register;
