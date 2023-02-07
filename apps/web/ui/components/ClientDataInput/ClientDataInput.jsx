import styles from "./ClientDataInput.module.css";
import React, { useState } from "react";
import Input from "../InputField/Input";
import { useEffect } from "react";

function ClientDataInput({ setClient, clients, client }) {
  const [clientType, setClientType] = useState("new");
  const [selectedClient, setselectedClient] = useState(undefined);
  const [clientName, setClientName] = useState(undefined);
  const [clientEmail, setclientEmail] = useState(undefined);
  function handleClientSelect(e) {
    setselectedClient(
      clients.filter((el) => el.clientName === e.target.value)[0]
    );
  }
  useEffect(() => {
    if (selectedClient) {
      setClientName(selectedClient.clientName);
      setclientEmail(
        selectedClient.clientEmail ? selectedClient.clientEmail : ""
      );
      setClient(selectedClient);
    }
  }, [selectedClient]);

  function onChangeValue(event) {
    setClientType(event.target.value);
    setClientName("");
    setclientEmail("");
  }
  console.log(client);
  return (
    <div className={styles.container}>
      <div div className={styles.radioGroup} onChange={onChangeValue}>
        <label>
          <input
            type="radio"
            value="new"
            name="isNew"
            checked={clientType === "new"}
          />{" "}
          Neukunde
        </label>
        <label>
          <input
            type="radio"
            value="returning"
            name="isNew"
            checked={clientType === "returning"}
          />{" "}
          Bestandskunde
        </label>
      </div>
      <div>
        {clients && clientType === "returning" && (
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
        {clientType === "new" && (
          <Input
            placeholder="Name des Kunden"
            onChange={(e) => {
              setClient({
                ...client,
                clientName: e.target.value,
                clientId: null,
              });
              setClientName(e.target.value);
            }}
            value={clientName}
          />
        )}
        <Input
          placeholder="Email / Telefonnummer"
          onChange={(e) => {
            setClient({
              ...client,
              clientEmail: e.target.value,
              clientId: null,
            });
            setclientEmail(e.target.value);
          }}
          value={clientEmail}
        />
      </div>
    </div>
  );
}

export default ClientDataInput;
