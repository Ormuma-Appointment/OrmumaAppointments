import styles from "./ClientDataInput.module.css";
import React, { useState } from "react";
import Input from "../InputField/Input";
import { useEffect } from "react";

function ClientDataInput({ setClient, clients, client }) {
  const [selectedClient, setselectedClient] = useState(undefined);
  const [clientName, setClientName] = useState(undefined);
  const [clientEmail, setClientEmail] = useState(undefined);
  const [clientTelephone, setClientTelephone] = useState(undefined);
  const [filteredClients, setFilteredClients] = useState(undefined);
  function handleClientSelect(e) {
    setselectedClient(
      clients.filter((el) => el.clientName === e.target.value)[0]
    );
  }

  function handleNameChange(e) {
    if (e.target.value.length > 2) {
      setFilteredClients(
        clients.filter((el) =>
          el.clientName.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    } //else if (e.target.value.length === 0) {
    //   setClient({
    //     ...client,
    //     clientName: null,
    //     clientEmail: null,
    //     clientTelephone: null,
    //     clientId: null,
    //   });
    // }
    else {
      setFilteredClients([]);
      setClient({
        ...client,
        clientName: null,
        clientEmail: null,
        clientTelephone: null,
        clientId: null,
      });
    }

    setClientName(e.target.value);
  }

  function handleClientSelect(el) {
    setClientName(el.clientName);
    setClientTelephone(el.clientTelephone ? el.clientTelephone : "");
    setClientEmail(el.clientEmail ? el.clientEmail : "");
    setClient({
      ...client,
      clientName: el.clientName,
      clientEmail: el.clientEmail,
      clientTelephone: el.clientTelephone,
      clientId: el.clientId,
    });
  }
  useEffect(() => {
    if (selectedClient) {
      setClientName(selectedClient.clientName);
      setClientEmail(
        selectedClient.clientEmail ? selectedClient.clientEmail : ""
      );
      setClientTelephone(
        selectedClient.clientTelephone ? selectedClient.clientTelephone : ""
      );
      setClient(selectedClient);
    }
  }, [selectedClient]);

  console.log(client);
  return (
    <div className={styles.container}>
      <div>
        <Input
          placeholder="Name des Kunden"
          onChange={handleNameChange}
          value={clientName}
        />
        {filteredClients && (
          <ul className={styles.suggestions}>
            {filteredClients.map((el, index) => {
              return (
                <li key={index} onClick={() => handleClientSelect(el)}>
                  {el.clientName}
                </li>
              );
            })}
          </ul>
        )}
        <Input
          placeholder="Email"
          onChange={(e) => {
            setClient({
              ...client,
              clientEmail: e.target.value,
            });
            setClientEmail(e.target.value);
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
