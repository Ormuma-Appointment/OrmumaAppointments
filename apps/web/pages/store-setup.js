import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../ui/page_styles/StoreSetup.module.css";
import CardContainer from "../ui/components/CardContainer/CardContainer";
import Input from "../ui/components/InputField/Input";
import CheckboxSelectElement from "../ui/components/CheckboxSelectElement/CheckboxSelectElement";
import TimeDefinitionSection from "../ui/components/TimeDefinitionSection/TimeDefinitionSection";
import Button from "../ui/components/Button/Button";
import Link from "next/link";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuthContext } from "../context/AuthContext";


const StoreSetup = () => {
  const email = "dummyaddress@test.de";
  let days_times = [
    {
      label: "Mo",
      day: 1,
      start: null,
      end: null,
      breakStart: null,
      breakEnd: null,
    },
    {
      label: "Di",
      day: 2,
      start: null,
      end: null,
      breakStart: null,
      breakEnd: null,
    },
    {
      label: "Mi",
      day: 3,
      start: null,
      end: null,
      breakStart: null,
      breakEnd: null,
    },
    {
      label: "Do",
      day: 4,
      start: null,
      end: null,
      breakStart: null,
      breakEnd: null,
    },
    {
      label: "Fr",
      day: 5,
      start: null,
      end: null,
      breakStart: null,
      breakEnd: null,
    },
    {
      label: "Sa",
      day: 6,
      start: null,
      end: null,
      breakStart: null,
      breakEnd: null,
    },
    {
      label: "So",
      day: 0,
      start: null,
      end: null,
      breakStart: null,
      breakEnd: null,
    },
  ];

  const [times, setTimes] = useState(days_times);
  const [formData, setFormData] = useState({});
  const router = useRouter();
  const handleSubmit = async (e, path) => {
    e.preventDefault();
    let storeObj = {
      name: e.target.name.value,
      photo: e.target.photo.value,
      contact: {
        email: email,
        telephone: e.target.telephone.value,
        website: e.target.website.value,
      },
      address: {
        street: e.target.street.value,
        number: e.target.number.value,
        postalCode: e.target.postalCode.value,
        city: e.target.city.value,
        country: "Deutschland", //prefilled
      },
      openingHours: times,
    };

<<<<<<< HEAD
    // setFormData(storeObj);
    console.log(storeObj);

    try {
      await setDoc(doc(db, "stores", "one"), storeObj);
    } catch (err) {
      console.error(err);
    }
=======
    // update firebase data if page was loaded with existing store data
    hasData && (await updateDoc(doc(db, "stores", "one"), storeObj));

>>>>>>> a48e1ff (add update data functionality to store page, open hours still missing)
    // console.log(storeObj);
    router.push(path);
  };
  const { currentUser } = useAuthContext();
  // load existing information, for editing purposes
  const [salonData, setSalonData] = useState([]);
  const [hasData, setHasData] = useState(false);

  async function getData() {
    if (currentUser) {
      const docRef = doc(db, "stores", "one");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        let data = docSnap.data();
        setSalonData(docSnap.data());
        setTimes(data.openingHours);
        setHasData(true);
      } else {
        console.log("No such document!");
      }
    }
  }
  useEffect(() => {
    setTimes((prev) => prev);
    getData();
  }, [currentUser]);

  return (
    <div>
      <div className={styles.breadcrumb}>
        <span className={styles.current_breadcrumb}>
          <Link href="/store-setup">Store Setup</Link>{" "}
        </span>{" "}
        <span className={styles.arrows}> &#9654;</span>{" "}
        <Link href="/service-setup">Services Konfgurieren </Link>{" "}
        <span className={styles.arrows}>&#9654;</span>{" "}
        <Link href="/team-setup">Team konfigurieren </Link>
        <span className={styles.arrows}>&#9654;</span>
      </div>
      <h1>Store Setup</h1>
      <CardContainer>
        <div className={styles.container}>
          <div className={styles.intro}>
            Geben Sie hier die Daten für Ihren Salon ein. Mit der Adresse können
            wir Ihre Position auf einer Karte anzeigen und die Öffnungszeiten
            Ihren Kunden auf ihrer Homepage anzeigen.
          </div>
          <form
            className={styles.setUpForm}
            onSubmit={(e) => handleSubmit(e, "/service-setup")}
          >
            <div className={styles.setUpInfos}>
              <div className={styles.row}>
                <div className={styles.col30}>
                  <label>Salon Name:*</label>
                </div>
                <div className={styles.col70}>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Salon Name"
                    defaultValue={salonData.name}
                    required
                  />
                </div>
              </div>
              <div className={`${styles.row} ${styles.adresse}`}>
                <div className={styles.col30}>
                  <label>Adresse:*</label>
                </div>
                <div className={styles.col70}>
                  <div className={`${styles.row} ${styles.city}`}>
                    <div className={styles.col70}>
                      <Input
                        type="text"
                        name="street"
                        id="street"
                        defaultValue={hasData ? salonData.address.street : ""}
                        placeholder="Straße"
                      />
                    </div>{" "}
                    <div className={styles.col30}>
                      <Input
                        type="number"
                        name="number"
                        id="number"
                        defaultValue={hasData ? salonData.address.number : ""}
                        placeholder="Nummer"
                      />
                    </div>{" "}
                  </div>
                  <div className={`${styles.row} ${styles.city}`}>
                    <div className={styles.col50}>
                      <Input
                        type="text"
                        name="postalCode"
                        id="postalCode"
                        defaultValue={
                          hasData ? salonData.address.postalCode : ""
                        }
                        placeholder="Postleitzahl"
                        required
                      />
                    </div>
                    <div className={styles.col50}>
                      <Input
                        type="text"
                        name="city"
                        id="city"
                        defaultValue={hasData ? salonData.address.city : ""}
                        placeholder="Stadt"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.col30}>
                  <label>Telefon:*</label>
                </div>
                <div className={styles.col70}>
                  <Input
                    type="tel"
                    name="telephone"
                    id="telephone"
                    defaultValue={hasData ? salonData.contact.telephone : ""}
                    placeholder="Telefonnummer"
                    required
                  />
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.col30}>
                  <label>Webseite:*</label>
                </div>
                <div className={styles.col70}>
                  <Input
                    type="text"
                    name="website"
                    id="website"
                    defaultValue={hasData ? salonData.contact.website : ""}
                    placeholder="Webseite"
                  />
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.col30}>
                  <label>Logo:*</label>
                </div>
                <div className={styles.col70}>
                  <Input type="file" name="photo" id="logo" />
                </div>
              </div>
            </div>
            {
              <div className={styles.setUpOpenings}>
                {/* <div className={`${styles.row} ${styles.opening}`}>
                <div className={styles.col30}>
                  <label>Arbeitstage:*</label>
                </div>
                <div className={styles.col70}>
                  <CheckboxSelectElement
                    labels={["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]}
                    setOpenDays={setOpenDays}
                    openDays={openDays}
                    hasData={hasData}
                  />
                </div>
              </div> */}
                <div className={`${styles.row} ${styles.opening}`}>
                  <div className={styles.col30}>
                    <label>Öffnungszeiten:*</label>
                  </div>
                  <div className={styles.col70}>
                    <TimeDefinitionSection
                      openDays={["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]}
                      setTimes={setTimes}
                      defaultValue={times}
                      hasData={hasData}
                    />
                  </div>
                </div>
              </div>
            }
            <div className={styles.buttonContainer}>
              <Button
                onSubmit={handleSubmit}
                icon=""
                size="medium"
                variant="primary"
              >
                speichern & weiter
              </Button>
            </div>
          </form>
        </div>
      </CardContainer>
    </div>
  );
};

export default StoreSetup;
