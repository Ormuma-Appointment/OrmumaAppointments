import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CardContainer from "../../ui/components/CardContainer/CardContainer";
import Input from "../../ui/components/InputField/Input";
import Button from "../../ui/components/Button/Button";
import BreadCrumb from "../../ui/components/BreadCrumb/BreadCrumb";
import styles from "../../ui/page_styles/ServiceSetup.module.css";
import ServiceAdd from "../../ui/components/ServiceAdd/ServiceAdd";
import Minus from "../../ui/components/assets/minus.svg";
import { db } from "../../firebase/firebase";
import {
  doc,
  setDoc,
  collection,
  updateDoc,
  query,
  getDoc,
  getDocs,
} from "firebase/firestore";

import { useAuthContext } from "../../context/AuthContext";

function ServiceSetup() {
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [data, setData] = useState([]);
  const { currentUser, storeID } = useAuthContext();
  const [dbServices, setDbServices] = useState([]);
  const [servicesDetails, setServicesDetails] = useState([]);
  const [hasData, setHasData] = useState(false);

  async function getDBServices() {
    if (currentUser) {
      const docRef = doc(db, "stores", storeID, "services", "serviceList");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data().serviceObj);
        let fbData = docSnap.data().serviceObj;
        setCategories(() => fbData.map((el) => el.category));
        setServices(() => {
          let temp = [];
          fbData.forEach((el) =>
            el.services.forEach((elem) => (temp = [...temp, elem.service]))
          );
          return temp;
        });
        setServicesDetails(() => {
          let temp = [];
          fbData.forEach((el) =>
            el.services.forEach((elem) => {
              temp = [...temp, { ...elem, category: el.category }];
            })
          );
          return temp;
        });
        setDbServices(fbData);
        setHasData(true);
      }
    } else {
      console.log("No such document!");
    }
  }

  useEffect(() => {
    getDBServices();
  }, [currentUser]);

  function handleCatSubmit(e) {
    e.preventDefault();
    setCategories((prev) => [...prev, e.target.category.value]);
  }
  function handleRemoveCatClick(index) {
    setCategories((prev) => prev.filter((elem, i) => i !== index));
  }

  // handle continue and save button click
  const router = useRouter();
  async function handleContinueClick(e, path) {
    e.preventDefault();
    let serviceObj;
    if (data[0]) {
      serviceObj = data;
    } else {
      serviceObj = dbServices;
    }
    console.log(serviceObj);
    // here we need to add to push data either in a context or to firebase
    const q = query(collection(db, "stores"));
    const querySnapshot = await getDocs(q);
    const queryData = querySnapshot.docs.map((detail) => ({
      ...detail.data(),
      id: detail.id,
    }));

    if (hasData) {
      await updateDoc(
        doc(db, "stores", queryData[0].id, "services", "serviceList"),
        { serviceObj }
      );
    } else {
      const res = await setDoc(
        doc(db, "stores", queryData[0].id, "services", "serviceList"),
        {
          serviceObj,
        }
      );
    }
    router.push(path);
  }
  console.log("dbServices:", dbServices);
  // handle back button click
  function handleBackClick(e, path) {
    e.preventDefault();
    router.push(path);
  }
  return (
    <div>
      <BreadCrumb
        steps={["Store Setup", "Services Konfgurieren", "Team konfigurieren"]}
        current={1}
      />
      <h1>Services Konfigurieren</h1>
      <CardContainer>
        <div className={styles.container}>
          <div className={styles.intro}>
            Erstellen Sie Ihren Service Katalog in 2 einfachen Schritten:
            <ol>
              <li>
                Fügen Sie Kategorien hinzu (diese erleichtern es Ihren
                Kund*innen den richtigen Service zu finden)
              </li>
              <li>
                fügen Sie Services hinzu, wählen Sie die dazugehörigen Kateogrie
                und geben Sie Dauer, Wartezeit und Preis für jeden Service an.
              </li>
            </ol>
          </div>
          <div className={styles.service_cat}>
            <h3>1. Service Kategorien erstellen</h3>
            <form className={styles.input_group} onSubmit={handleCatSubmit}>
              <Input placeholder="Kategorie hinzufügen ..." name="category" />{" "}
              <Button icon="" size="medium" variant="secondary">
                + hinzufügen
              </Button>
            </form>
            <div className={styles.cat_box}>
              {categories.map((el, index) => {
                return (
                  <div key={index} className={styles.pill}>
                    {el}
                    <Minus
                      className={styles.icon}
                      onClick={() => handleRemoveCatClick(index)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <ServiceAdd
            setData={setData}
            services={services}
            setServices={setServices}
            categories={categories}
            servicesDetails={servicesDetails[0] ? servicesDetails : false}
            setServicesDetails={setServicesDetails}
          />
          <div className={styles.footer}>
            <Button
              size="medium"
              variant="danger"
              onClick={(e) => handleBackClick(e, "/store-setup/store")}
            >
              zurück
            </Button>
            <Button
              size="medium"
              variant="primary"
              onClick={(e) => handleContinueClick(e, "/store-setup/team")}
            >
              speichern & weiter
            </Button>
          </div>
        </div>
      </CardContainer>
    </div>
  );
}

export default ServiceSetup;
