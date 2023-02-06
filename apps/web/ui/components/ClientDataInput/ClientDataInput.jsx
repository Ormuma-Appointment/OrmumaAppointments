import styles from "./ClientDataInput.module.css";
import React from "react";
import Input from "../InputField/Input";

function ClientDataInput({ setClient, clients, client }) {
  function handleClientSelect(e) {
    console.log(e.target.value);
  }

  return (
    <div className={styles.container}>
      <div
        className={styles.radioGroup}
        onChange={(e) => console.log(e.target.value)}
      >
        <label htmlFor="new">
          <input type="radio" id="new" name="newOrGuest" value="new" checked />{" "}
          Neukunde
        </label>

        <label htmlFor="guest">
          <input
            type="radio"
            id="guest"
            name="newOrGuest"
            value="guest"
            checked
          />{" "}
          Bestandskunde (Gast)
        </label>

        <label htmlFor="account">
          <input
            type="radio"
            id="account"
            name="newOrGuest"
            value="account"
            checked
          />{" "}
          Bestandskunde (Account)
        </label>
      </div>
      <div>
        {clients && (
          <select
            type="select"
            onChange={handleClientSelect}
            className={styles.select}
          >
            <option value="" selected>
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
