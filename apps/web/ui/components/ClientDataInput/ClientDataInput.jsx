import styles from "./ClientDataInput.module.css";
import React, { useState } from "react";
import Input from "../InputField/Input";

function ClientDataInput({ setClient, clients, client }) {
  const [isNewClient, setIsNewClient] = useState(true);
  const [selectedClient, setselectedClient] = useState();
  function handleClientSelect(e) {
    console.log(e.target.value);
    setselectedClient(
      clients.filter((el) => el.clientName === e.target.value)[0]
    );
  }
  console.log(selectedClient);

  function onChangeValue(event) {
    setIsNewClient(event.target.value);
    console.log(event.target.value);
  }

  return (
    <div className={styles.container}>
      <div onChange={onChangeValue}>
        <input
          type="radio"
          value="new"
          name="isNew"
          checked={isNewClient === "new"}
        />{" "}
        Neukunde
        <input
          type="radio"
          value="old"
          name="isNew"
          checked={isNewClient === "old"}
        />{" "}
        Bestandskunde
      </div>
      <div>
        {clients && (
          <select
            type="select"
            onChange={handleClientSelect}
            className={styles.select}
          >
            <option value="newCustomer" selected>
              Bestandskunden wählen?
            </option>
            {clients.map((el, index) => {
              return <option key={index}>{el.clientName}</option>;
            })}
          </select>
        )}
        <Input
          placeholder="Name des Kunden"
          onChange={(e) =>
            setClient({
              ...client,
              clientName: e.target.value,
              clientId: null,
            })
          }
        />
        <Input
          placeholder="Email / Telefonnummer"
          onChange={(e) =>
            setClient({
              ...client,
              clientContact: e.target.value,
              clientId: null,
            })
          }
        />
      </div>
    </div>
  );
}

export default ClientDataInput;
