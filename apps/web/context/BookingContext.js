import React, { createContext, useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  where,
  query,
} from "firebase/firestore";

export const BookingContext = createContext();
export const BookingContextProvider = ({ children }) => {
  const [storeId, setStoreId] = useState(undefined);
  const [serviceList, setServiceList] = useState({});
  const [employeeData, setEmployeeData] = useState([]);
  const [selectedEmployee, setSelectedEmployeeData] = useState({});
  const [eventData, setEventData] = useState([]);
  const [chosenService, setChosenService] = useState(null);
  const [chosen, setChosen] = useState(null);
  const [chosenSlot, setChosenSlot] = useState(null);
  const [isLoading, SetIsLoading] = useState(true);

  async function getData() {
    if (storeId) {
      const docRef = doc(db, "stores", storeId, "services", "serviceList");
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
  }, [storeId]);

  const handleRead = async () => {
    if (storeId) {
      const docRef = collection(db, "stores", storeId, "employeeList");
      const docSnap = await getDocs(docRef);
      docSnap.forEach((doc) => {
        const el = { id: doc.id, ...doc.data() };
        // console.log(doc.id, " => ", doc.data());
        setEmployeeData((prev) => [...prev, el]);
        SetIsLoading(false);
      });
    }
  };
  useEffect(() => {
    handleRead();
  }, [storeId]);

  async function getEmployee() {
    if (chosen !== undefined && chosen !== null && storeId) {
      const docRef = doc(
        db,
        "stores",
        storeId,
        "employeeList",
        chosen && chosen.employeeId
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

  const getEvent = async () => {
    if (chosen !== undefined && chosen !== null && storeId) {
      const q = query(
        collection(db, "events"),
        where("storeId", "==", storeId)
      );
      const docSnap = await getDocs(q);
      let temp = [];
      docSnap.forEach((doc) => {
        const el = doc.data();
        // console.log("El", el.employeeId, chosen.employeeId);
        if (el.employee === chosen.employee) {
          // console.log("eventData", eventData);
          temp.push(el);
        }
        setEventData(temp);
        SetIsLoading(false);
      });
    }
  };

  useEffect(() => {
    getEmployee();
    getEvent();
  }, [chosen, storeId]);

  let slotToString = "";

  if (chosenSlot) {
    const dateString = chosenSlot.date.toLocaleString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    slotToString = dateString + " " + chosenSlot.start;
  }

  return (
    <BookingContext.Provider
      value={{
        serviceList,
        eventData,
        employeeData,
        chosenService,
        setChosenService,
        setChosen,
        chosen,
        chosenSlot,
        setChosenSlot,
        isLoading,
        selectedEmployee,
        setStoreId,
        storeId,
        slotToString,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
// };
