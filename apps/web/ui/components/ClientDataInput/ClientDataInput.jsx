import styles from "./ClientDataInput.module.css";
import React, { useState } from "react";
import Input from "../InputField/Input";
import { useEffect } from "react";

function ClientDataInput({ setClient, clients, client }) {
  const [selectedClient, setselectedClient] = useState(undefined);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientTelephone, setClientTelephone] = useState("");
  const [filteredClients, setFilteredClients] = useState(undefined);
  const [showSearchSuggest, setShowSearchSuggest] = useState(true);

  function handleClientSelect(e) {
    setselectedClient(
      clients.filter((el) => el.clientName === e.target.value)[0]
    );
  }

  function resetClient() {
    setFilteredClients([]);
    setClient({
      ...client,
      clientName: null,
      clientEmail: null,
      clientTelephone: null,
      clientId: null,
    });
    setClientTelephone("");
    setClientEmail("");
    setShowSearchSuggest(false);
  }

  function handleNameChange(e) {
    if (
      !clients.find((el) =>
        el.clientName?.toLowerCase().includes(e.target.value.toLowerCase())
      )
    ) {
      resetClient();
    }
    if (e.target.value.length > 2) {
      setFilteredClients(
        clients.filter((el) =>
          el.clientName?.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
      setShowSearchSuggest(true);
      setClient({
        ...client,
        clientName: e.target.value,
        clientEmail: null,
        clientTelephone: null,
        clientId: null,
      });
    } else {
      resetClient();
    }
    setClientName(e.target.value);
  }

  function handleClientSelect(el) {
    setClientName(el.clientName);
    setShowSearchSuggest(false);
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

  return (
    <div className={styles.container}>
      <div>
        <Input
          placeholder="Name des Kunden"
          onChange={handleNameChange}
          value={clientName}
        />
        {showSearchSuggest && filteredClients && filteredClients[0] && (
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
