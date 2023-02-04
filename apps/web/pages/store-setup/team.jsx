import React, { useEffect, useState } from "react";
import { workingTimes } from "../data-sample";
import BreadCrumb from "../../ui/components/BreadCrumb/BreadCrumb";
import styles from "../../ui/page_styles/TeamSetup.module.css";
import CardContainer from "../../ui/components/CardContainer/CardContainer";
import TimeDefinitionSection from "../../ui/components/TimeDefinitionSection/TimeDefinitionSection";
import Button from "../../ui/components/Button/Button";
import { useRouter } from "next/router";
import EmployeeOverview from "../../ui/components/EmployeeOverview/EmployeeOverview";
import { db } from "../../firebase/firebase";
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  collection,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase/firebase";
import { useAuthContext } from "../../context/AuthContext";
import short from "short-uuid";
import EmployeePersonalDetailsForm from "../../ui/components/StoreSetupForms/EmployeePersonalDetailsForm";
import EmployeeServicesForm from "../../ui/components/StoreSetupForms/EmployeeServicesForm";
import { browserBack } from "../../ui/functions/browserBack";
function transformToCorrectFormat(arr) {
  let result = {};
  arr.forEach((item) => {
    let parts = item.split("  -  ");
    let category = parts[0];
    let service = parts[1];
    if (!result[category]) {
      result[category] = {
        category: category,
        services: [{ service: service }],
      };
    } else {
      result[category].services.push({ service: service });
    }
  });
  return Object.values(result);
}

// check if opening times are structured correctly
function checkWorkingHours(days) {
  let invalidDays = [];
  for (let day of days) {
    if (
      day.start === null &&
      day.end === null &&
      day.breakStart === null &&
      day.breakEnd === null
    ) {
      continue;
    }
    if (day.start === null || day.end === null) {
      invalidDays.push(day.label);
      continue;
    }
    if (day.breakStart || day.breakEnd) {
      if (
        day.breakStart === null ||
        day.breakEnd === null ||
        day.breakStart >= day.breakEnd ||
        day.breakStart <= day.start ||
        day.breakEnd >= day.end
      ) {
        invalidDays.push(day.label);
        continue;
      }
    }
    if (day.start >= day.end) {
      invalidDays.push(day.label);
    }
  }
  return invalidDays;
}

function TeamSetup() {
  const { currentUser, adminStoreId } = useAuthContext();
  const [imageUpload, setImageUpload] = useState(null);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [hasData, setHasData] = useState(false);
  const [dbServices, setDbServices] = useState([]);
  const [showServices, setShowServices] = useState(false);
  const [services, setServices] = useState(["no data"]);
  const [times, setTimes] = useState(workingTimes);
  const [salonEmployees, setSalonEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(undefined);
  const [employeeIndex, setEmployeeIndex] = useState(undefined);
  const [employeeFirebaseIds, setEmployeeFirebaseIds] = useState([]);
  const [noSelected, setNoSelected] = useState(false);

  // get services from Store Collection services
  async function getDBServices() {
    if ((currentUser, adminStoreId)) {
      const docRef = doc(db, "stores", adminStoreId, "services", "serviceList");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data().serviceObj);
        let data = docSnap.data().serviceObj;
        if (data[0]) {
          let temp = [];
          data.forEach((el) => {
            el.services.forEach((elem) =>
              temp.push(`${el.category}  -  ${elem.service}`)
            );
          });
          setServices(temp);
          setDbServices(temp);
        }
      } else {
        console.log("No such document!");
      }
    }
  }
  useEffect(() => {
    getDBServices();
  }, [adminStoreId]);
  // get all Employees from Firebase

  async function getEmployeeData() {
    if ((currentUser, adminStoreId)) {
      let employeesTemp = [];
      let idsTemp = [];
      const querySnapshot = await getDocs(
        collection(db, "stores", adminStoreId, "employeeList")
      );
      querySnapshot.forEach((doc) => {
        const el = { id: doc.id, ...doc.data() };
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        employeesTemp.push(el);
        idsTemp.push(doc.id);
      });
      setSalonEmployees(employeesTemp);
      setEmployeeFirebaseIds(idsTemp);
    }
    setLoading(false);
  }
  useEffect(() => {
    getEmployeeData();
  }, [adminStoreId]);

  useEffect(() => {
    if (employeeIndex || employeeIndex === 0) setHasData(true);
    setSelectedEmployee(salonEmployees[employeeIndex]);
    setShowServices(true);
    setNoSelected(true);
  }, [employeeIndex]);

  useEffect(() => {
    if (hasData) {
      setServices(reverseTransform(selectedEmployee.services));
      setTimes(selectedEmployee.workingTime);
    }
  }, [selectedEmployee]);
  function reverseTransform(obj) {
    let result = [];
    obj.forEach((item) => {
      item.services.forEach((service) => {
        result.push(`${item.category}  -  ${service.service}`);
      });
    });
    return result;
  }
  function uploadImage(docRef) {
    if (imageUpload === null) return;
    const imageRef = ref(storage, `images/team/${docRef}`);
    uploadBytes(imageRef, imageUpload)
      .then(() => {
        console.log("Image uploaded!");
        // reloads page and clears all fields
        router.reload(window.location.pathname);
      })
      .catch(() => console.log(err));
  }
  async function handleFormSubmit(e) {
    e.preventDefault();
    let employee = {
      name: e.target.name.value,
      adress: {
        street: e.target.street.value,
        number: e.target.number.value,
        postalCode: e.target.postalCode.value,
        city: e.target.city.value,
        country: "Deutschland", //prefilled
      },
      telephone: e.target.telephone.value,
      photo: e.target.photo.value,
      services: transformToCorrectFormat(services),
      description: e.target.description.value,
      workingTime: times,
    };
    if (checkWorkingHours(times)[0]) {
      alert(
        `Bitte überprüfen Sie die angegebenen Arbeitszeiten am ${corruptDays.map(
          (el) => el
        )}. Die Startzeit muss immer vor der Schließzeit liegen und die Pausenzeiten innerhalb der Start- und Schließzeiten.`
      );
      return;
    }

    if (hasData) {
      await updateDoc(
        doc(
          db,
          "stores",
          adminStoreId,
          "employeeList",
          employeeFirebaseIds[employeeIndex]
        ),
        employee
      );
      uploadImage(employeeFirebaseIds[employeeIndex]);
    } else {
      let uuid = short.generate();
      const res = await setDoc(
        doc(db, "stores", adminStoreId, "employeeList", uuid),
        employee
      );
      uploadImage(uuid, imageUpload);
    }

    if (imageUpload === null) {
      // reloads page and clears all fields
      router.reload(window.location.pathname);
    }
  }

  useEffect(() => {
    if (!showServices) {
      setServices(dbServices);
    }
  }, [showServices]);

  if (!loading) {
    return (
      <div>
        <BreadCrumb
          steps={["Store Setup", "Services Konfgurieren", "Team konfigurieren"]}
          current={2}
        />
        <h1 id="top">Team Konfigurieren</h1>
        <CardContainer>
          <div className={styles.container}>
            <form action="" onSubmit={handleFormSubmit}>
              <div>
                Um eine Person hinzuzufügen, füllen Sie bitte die unten
                stehenden Felder aus. Sobald Sie auf "Person speichern" klicken,
                wird diese unten auftauchen. Keine persönlichen Daten, werden
                für Kund*Innen sichtbar sein. <br />
                Klicken Sie auf "Person speichern", um alle Daten zu speichern.
              </div>
              <EmployeePersonalDetailsForm
                hasData={hasData}
                selectedEmployee={selectedEmployee}
                setImageUpload={setImageUpload}
              />
              <div className={styles.setUpOpenings}>
                <div className={`${styles.row} ${styles.opening}`}>
                  <div className={styles.col30}>
                    <label>Arbeitszeiten:*</label>
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
              <EmployeeServicesForm
                setShowServices={setShowServices}
                showServices={showServices}
                setNoSelected={setNoSelected}
                noSelected={noSelected}
                setServices={setServices}
                services={services}
                hasData={hasData}
                dbServices={dbServices}
                selectedEmployee={selectedEmployee}
                reverseTransform={reverseTransform}
              />
              <div className={styles.footer}>
                <Button
                  size="medium"
                  variant="danger"
                  onClick={(e) =>
                    browserBack(e, "/store-setup/service", router)
                  }
                >
                  zurück
                </Button>
                <Button icon="" size="medium" variant="primary">
                  Person speichern
                </Button>
              </div>
            </form>
            <div className={styles.employee_container}>
              <h2>Alle Mitarbeiter</h2>
              <EmployeeOverview
                employees={salonEmployees}
                setEmployeeIndex={setEmployeeIndex}
              />
            </div>
          </div>
        </CardContainer>
      </div>
    );
  }
}

export default TeamSetup;
