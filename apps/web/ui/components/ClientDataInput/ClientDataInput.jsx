import styles from "./ClientDataInput.module.css";
import React from "react";
import Input from "../InputField/Input";

function ClientDataInput({ setClient, clients, client }) {
  function handleClientSelect(e) {
    console.log(e.target.value);
  }

  return (
    <div className={styles.container}>
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
