import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CardContainer from "../ui/components/CardContainer/CardContainer";
import Input from "../ui/components/InputField/Input";
import Button from "../ui/components/Button/Button";
import styles from "../ui/page_styles/ServiceSetup.module.css";
import ServiceAdd from "../ui/components/ServiceAdd/ServiceAdd";
import Minus from "../ui/components/assets/minus.svg";
import Link from "next/link";
<<<<<<< HEAD
// import { doc, setDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { doc, setDoc, collection, query, getDocs } from "firebase/firestore";
=======
import { db } from "../firebase/firebase";
import {
  doc,
  getDoc,
  getDocs,
  updateDoc,
  collection,
} from "firebase/firestore";
import { useAuthContext } from "../context/AuthContext";
>>>>>>> 11966fc (add firebase data for categories and service labels)

function ServiceSetup() {
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [data, setData] = useState([]);
  const { currentUser } = useAuthContext();

  const [dbServices, setDbServices] = useState([]);
  async function getDBServices() {
    if (currentUser) {
      const docRef = doc(db, "stores", "one", "services", "all");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data().serviceObj);
        let data = docSnap.data().serviceObj;
        setCategories(() => data.map((el) => el.category));
        setServices(
          () => data.map((el) => el.services.map((elem) => elem.service))[0]
        );
        setDbServices(data);
      }
    } else {
      console.log("No such document!");
    }
  }

  useEffect(() => {
    getDBServices();
  }, [currentUser]);
  useEffect(() => {
    console.log(services);
  }, [services]);

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
    let serviceObj = data;
    // here we need to add to push data either in a context or to firebase
    const q = query(collection(db, "stores"));
    const querySnapshot = await getDocs(q);
    const queryData = querySnapshot.docs.map((detail) => ({
      ...detail.data(),
      id: detail.id,
    }));
    console.log(queryData);
    // queryData.map(async (v) => {
    const res = await setDoc(
      doc(db, "stores", queryData[0].id, "services", "serviceList"),
      {
        serviceObj,
      }
    );
    console.log();
    // });
    router.push(path);
  }
  // handle back button click
  function handleBackClick(e, path) {
    e.preventDefault();
    router.push(path);
  }
  return (
    <div>
      <div className={styles.breadcrumb}>
        <Link href="/store-setup">Store Setup</Link>{" "}
        <span className={styles.arrows}> &#9654;</span>{" "}
        <span className={styles.current_breadcrumb}>
          <Link href="/service-setup">Services Konfgurieren </Link>{" "}
        </span>{" "}
        <span className={styles.arrows}>&#9654;</span>{" "}
        <Link href="/team-setup">Team konfigurieren </Link>
        <span className={styles.arrows}>&#9654;</span>
      </div>
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
          />
          <div className={styles.footer}>
            <Button
              size="medium"
              variant="danger"
              onClick={(e) => handleBackClick(e, "store-setup")}
            >
              zurück
            </Button>
            <Button
              size="medium"
              variant="primary"
              onClick={(e) => handleContinueClick(e, "/team-setup")}
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
