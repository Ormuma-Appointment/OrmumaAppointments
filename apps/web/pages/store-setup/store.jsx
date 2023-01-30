import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { workingTimes } from "../data-sample";
import styles from "../../ui/page_styles/StoreSetup.module.css";
import CardContainer from "../../ui/components/CardContainer/CardContainer";
import BreadCrumb from "../../ui/components/BreadCrumb/BreadCrumb";
import Input from "../../ui/components/InputField/Input";
import TimeDefinitionSection from "../../ui/components/TimeDefinitionSection/TimeDefinitionSection";
import Button from "../../ui/components/Button/Button";
import {
  doc,
  addDoc,
  collection,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { db } from "../../firebase/firebase";
import { storage } from "../../firebase/firebase";
import { useAuthContext } from "../../context/AuthContext";

const StoreSetup = () => {
  const [imageUpload, setImageUpload] = useState(null);
  const [salonData, setSalonData] = useState([]);
  const [hasData, setHasData] = useState(false);
  const [loading, setLoading] = useState(true);
  const { currentUser, adminStoreID } = useAuthContext();
  const [times, setTimes] = useState(workingTimes);
  const router = useRouter();
  const [docRef, setDocRef] = useState(null);

  function uploadImage(docRef) {
    if (imageUpload === null) return;
    const imageRef = ref(storage, `images/stores/${docRef}`);
    uploadBytes(imageRef, imageUpload)
      .then(() => console.log("Image uploaded!"))
      .catch(() => console.log("Hello from err", err));
  }
  const handleSubmit = async (e, path) => {
    e.preventDefault();

    let storeObj = {
      name: e.target.name.value,
      slug: e.target.url?.value || salonData.slug,
      photo: e.target.photo.value,
      contact: {
        email: currentUser.email,
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
    if (hasData) {
      // update firebase data if page was loaded with existing store data
      hasData && (await updateDoc(doc(db, "stores", adminStoreID), storeObj));
      uploadImage(adminStoreID);
    } else {
      // setup data in firebase
      try {
        const docRef = await addDoc(collection(db, "stores"), storeObj);
        await setDoc(doc(db, "users", currentUser.uid, "stores", docRef.id), {
          storeID: docRef.id,
        });
        uploadImage(docRef.id);
      } catch (err) {
        console.error(err);
      }
    }
    router.push(path);
  };

  // load existing information, for editing purposes
  const [slug, setSlug] = useState(undefined);
  async function getData() {
    if ((currentUser, adminStoreID)) {
      const docRef = doc(db, "stores", adminStoreID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        let data = docSnap.data();
        setSalonData(docSnap.data());
        setTimes(data.openingHours);
        setHasData(true);
        setSlug(data.slug);
      } else {
        console.log("No such document!");
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, [currentUser, adminStoreID]);

  //create store slug
  function handleNameChange(e) {
    let value = e.target.value.toLowerCase().replaceAll(" ", "-");
    setSlug(value);
  }

  if (!loading) {
    return (
      <div>
        <BreadCrumb
          steps={["Store Setup", "Services Konfgurieren", "Team konfigurieren"]}
          current={0}
        />
        <h1>Store Setup</h1>
        <CardContainer>
          <div className={styles.container}>
            <div className={styles.intro}>
              Geben Sie hier die Daten für Ihren Salon ein. Mit der Adresse
              können wir Ihre Position auf einer Karte anzeigen und die
              Öffnungszeiten Ihren Kunden auf ihrer Homepage anzeigen.
            </div>
            <form
              className={styles.setUpForm}
              onSubmit={(e) => handleSubmit(e, "/store-setup/service")}
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
                      onChange={(e) => handleNameChange(e)}
                    />
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.col30}>
                    <label>Salon URL:*</label>
                  </div>
                  <div className={styles.col50}>
                    {salonData.slug ? (
                      <div>somedomain.de/{salonData.slug}</div>
                    ) : (
                      <Input
                        type="text"
                        name="url"
                        id="url"
                        placeholder="Salon URL"
                        value={slug}
                        required
                        onChange={(e) => handleNameChange(e)}
                      />
                    )}
                  </div>
                </div>
                <div className={styles.row_small}>
                  <div className={styles.col30}></div>
                  <div className={styles.col70}>
                    Achtung! Die URL kann nur einmalig konfiguriert werden!
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
                    <label>Salon-Foto:*</label>
                  </div>
                  <div className={styles.col70}>
                    <Input
                      type="file"
                      name="photo"
                      id="logo"
                      onChange={(e) => setImageUpload(e.target.files[0])}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.setUpOpenings}>
                <div className={`${styles.row} ${styles.opening}`}>
                  <div className={styles.col30}>
                    <label>Öffnungszeiten:*</label>
                  </div>
                  <div className={styles.col70}>
                    <TimeDefinitionSection
                      openDays={["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]}
                      setTimes={setTimes}
                      times={times}
                      hasData={hasData}
                    />
                  </div>
                </div>
              </div>
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
  }
};

export default StoreSetup;
