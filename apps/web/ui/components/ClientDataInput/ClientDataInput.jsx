import styles from "./ClientDataInput.module.css";
import React, { useState } from "react";
import Input from "../InputField/Input";
import { useEffect } from "react";

function ClientDataInput({ setClient, clients, client }) {
  const [clientType, setClientType] = useState("new");
  const [selectedClient, setselectedClient] = useState(undefined);
  const [clientName, setClientName] = useState(undefined);
  const [clientEmail, setclientEmail] = useState(undefined);
  const [clientTelephone, setClientTelephone] = useState(undefined);
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
      setClientTelephone(
        selectedClient.clientTelephone ? selectedClient.clientTelephone : ""
      );
      setClient(selectedClient);
    }
  }, [selectedClient]);

  function onChangeValue(event) {
    setClientType(event.target.value);
    setClientName("");
    setclientEmail("");
    setClientTelephone("");
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
              });
              setClientName(e.target.value);
            }}
            value={clientName}
          />
        )}
        <Input
          placeholder="Email"
          onChange={(e) => {
            setClient({
              ...client,
              clientEmail: e.target.value,
            });
            setclientEmail(e.target.value);
          }}
          value={clientEmail}
        />
        <Input
          placeholder="Telefonnummer"
          onChange={(e) => {
            setClient({
              ...client,
              clientTelephone: e.target.value,
            });
            setClientTelephone(e.target.value);
          }}
          value={clientTelephone}
        />
      </div>
    </div>
  );
}

export default ClientDataInput;
