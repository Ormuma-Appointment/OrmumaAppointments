import React, { createContext, useEffect, useState, useContext } from "react";
import { db } from "../firebase/firebase";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export const BookingContext = createContext();
export const BookingContextProvider = ({ children }) => {
  const [storeID, setStoreID] = useState(undefined);
  const [serviceList, setServiceList] = useState({});
  const [employeeData, setEmployeeData] = useState([]);
  const [selectedEmployee, setSelectedEmployeeData] = useState({});
  const [chosenService, setChosenService] = useState(null);
  const [chosen, setChosen] = useState(null);
  const [chosenSlot, setChosenSlot] = useState(null);
  const [isLoading, SetIsLoading] = useState(true);

  async function getData() {
    if (storeID) {
      const docRef = doc(db, "stores", storeID, "services", "serviceList");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        setServiceList(docSnap.data());
        SetIsLoading(false);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }
  }
  useEffect(() => {
    getData();
  }, [storeID]);

  const handleRead = async () => {
    if (storeID) {
      const docRef = collection(db, "stores", storeID, "employeeList");

      const docSnap = await getDocs(docRef);
      docSnap.forEach((doc) => {
        const el = doc.data();
        // console.log(doc.id, " => ", doc.data());
        setEmployeeData((prev) => [...prev, el]);
        SetIsLoading(false);
        // empArray.push(el);
      });
    }
  };
  useEffect(() => {
    handleRead();
  }, [storeID]);
  console.log(chosen, "chosen");

  async function getEmployee() {
    if (chosen - 1 > 0) {
      const docRef = doc(
        db,
        "stores",
        storeID,
        "employeeList",
        chosen?.employee
      );
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        setSelectedEmployeeData(docSnap.data());
        SetIsLoading(false);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        setSelectedEmployeeData("Oriane is the best");
      }
    } else {
      console.log("Mully is the best");
    }
  }
  useEffect(() => {
    getEmployee();
  }, [chosen]);

  console.log("SELECTED EMPLOYEE", selectedEmployee);
  console.log("SELECTED SLOT", chosenSlot);

  return (
    <BookingContext.Provider
      value={{
        serviceList,
        employeeData,
        chosenService,
        setChosenService,
        setChosen,
        chosen,
        chosenSlot,
        setChosenSlot,
        isLoading,
        selectedEmployee,
        setStoreID,
        storeID,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
// };
